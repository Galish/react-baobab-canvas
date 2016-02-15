import {React, branch} from '../vendor';
import ProgressBar from './progressbar.js';
import Actions from '../actions/actions';
import config from '../config';

@branch({
  cursors: {
  	elements: ['elements'],
    image:  ['image'],
    scaled: ['scaled'],
    mosaic: ['mosaic'],
    svg:    ['svg'],
    status: ['status'],
    progress: ['progress']
  }
})

export default class extends React.Component {
	constructor(props) {
    	super(props);
    	return
  	}

	componentDidMount () {
		const status = this.props.status;

		if (status == 'render' || status == 'done') {
			this.renderToCanvasFromCashe();
		}
	}

	componentDidUpdate (prevProps) {
		if (prevProps.image.src != this.props.image.src) {
			this.scaleToCanvas();
		}
		if (prevProps.status == 'ready' && this.props.status == 'render') {
			this.renderToCanvas();
		}
	}

	scaleToCanvas () {
		const src = this.props.image.src,
			  scaled = this.props.scaled;
		
		if (src) {		
			const canvas = document.getElementById(this.props.elements.canvas),
				  context = canvas.getContext('2d'),
				  img = new Image();
				  img.src = src;

			context.scale(scaled.scalex, scaled.scaley);
	        context.drawImage(img, 0, 0);

	        Actions.getScaledImageData(context);
	    }
	}

	renderToCanvas (imgX, imgY) {
		let rgb = {},
			hex,
			x = imgX || 0,
			y = imgY || 0;
			
		const scaled = this.props.scaled;

		// set canvas sizes and clear it
		if (x == 0 && y == 0) {
			const canvas = document.getElementById(this.props.elements.canvas),
				  context = canvas.getContext('2d'),
				  mosaic = this.props.mosaic;

			canvas.width = mosaic.width;
			canvas.height = mosaic.height;
			context.clearRect(0, 0, mosaic.width, mosaic.height);
		}

		if (y == scaled.height -1 && x == scaled.width) {
			Actions.setStatus('done');
			return;
		}
		else if( x == scaled.width ) {
			x = 0;
			y++;
		}
		
		let start = x * 4 + y *scaled.width * 4,
			end = start + 4,
			[r, g, b] = scaled.data.slice(start, end);

		Actions.setProgress(x, y);
		hex = this.rgbToHex(r, g, b);

		Actions.setColorStat(hex);

		this.renderRow(hex, x * config.TILE_WIDTH, y * config.TILE_WIDTH)
			.then(
				() => {
					this.renderToCanvas(x + 1, y);
				}
			);
	}

	renderRow( hex, x, y ) {
		return new Promise ((resolve, reject) => {
			this.getHexSvg(hex)
				.then(
					rawSvg => {					
						const svg = new Blob([rawSvg], {type:"image/svg+xml;charset=utf-8"}),
							  domURL = self.URL || self.webkitURL || self,
							  url = domURL.createObjectURL(svg),
							  img = new Image(),
							  buffer = document.getElementById(this.props.elements.buffer),
			       			  canvas = document.getElementById(this.props.elements.canvas),
			       			  mosaic = this.props.mosaic;
				        
				        img.src = url;
				       	img.onload = () => {				       		
			       			// render to buffer
			       			if (buffer) {
			       				const bufferctxt = buffer.getContext('2d');
			       				bufferctxt.drawImage(img, x, 0);
			       			} else 
			       				return;

				       		if (x == (mosaic.width - config.TILE_WIDTH)) {
				       			// render to canvas
				       			if (canvas) {
				       				const context = canvas.getContext('2d'),
				       					  bufferctxt = buffer.getContext('2d'),
				       					  imgData = bufferctxt.getImageData(0, 0, mosaic.width, config.TILE_HEIGHT);

				       				Actions.saveDrawResults(imgData.data);
				       				context.putImageData(imgData, 0, y);

				       				// clear buffer canvas
				       				bufferctxt.clearRect(0, 0, mosaic.width, config.TILE_HEIGHT);

				       				resolve('done');
				       			}
				       		} else {
								resolve('done');
				       		}
				        };
					}
				);

		});
	}

	renderToCanvasFromCashe () {
		const canvas = document.getElementById(this.props.elements.canvas),
			  context = canvas.getContext('2d'),
			  {mosaic, progress, status} = this.props;

		let height;

		canvas.width = mosaic.width;
		canvas.height =mosaic.height;

		let imgData = new Uint8ClampedArray(mosaic.data);
		
		if (status == 'done' )
			height = mosaic.height;
		else
			height = progress.y * config.TILE_HEIGHT;		

		let imageData = new ImageData (imgData,  mosaic.width, height);

		context.putImageData(imageData, 0, 0);

		if (status == 'render') {
			Actions.setProgress(0, progress.y);
			this.renderToCanvas(0, progress.y);
		}
	}

	getHexSvg(color){
		return new Promise ((resolve, reject) => {
			const svg = this.props.svg,
				  hex = color.slice(1);

			if (svg[hex] !== undefined) {
				resolve(svg[hex]);
			} else {
				Actions.getColorSvg(hex)
					.then(
						svg => {
							resolve(svg);
						}
					);
			}			
		});
	}

	rgbToHex(r, g, b) {
	    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	render () {
		const {mosaic, scaled, elements, status} = this.props,
			  isRendering = status == 'render',
			  isDone = status == 'done';

		return (
			<div className="canvas__container">
				<canvas className={ (isRendering || isDone) && 'show' } id={elements.canvas} height={scaled.height} width={scaled.width}></canvas>
				<canvas id={elements.buffer} height={config.TILE_HEIGHT} width={mosaic.width}></canvas>
				<ProgressBar />
			</div>
		)
	}
}