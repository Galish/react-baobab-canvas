import Actions from '../../actions';
import {branch} from 'react-baobab';
import config from '../../common/config';
import cx from 'classnames'
import ProgressBar from '../progressbar';
import React from 'react';

@branch({
	elements:	['elements'],
	image:		['image'],
	scaled:		['scaled'],
	mosaic:		['mosaic'],
	svg:		['svg'],
	status:		['status'],
	progress:	['progress']
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
		if (prevProps.image.src !== this.props.image.src) {
			this.scaleToCanvas();
		}
		if (prevProps.status === 'ready' && this.props.status === 'render') {
			this.renderToCanvas();
		}
	}

	scaleToCanvas = () => {
		const {elements, image, scaled}= this.props
		const {src} = image

		if (src) {
			const canvas = document.getElementById(elements.canvas);
			const context = canvas.getContext('2d');
			const img = new Image();

			img.src = src;
			context.scale(scaled.scalex, scaled.scaley);
			context.drawImage(img, 0, 0);

			Actions.getScaledImageData(context);
		}
	}

	renderToCanvas = (imgX, imgY) => {
		const {elements, mosaic, scaled} = this.props
		let rgb = {},
			hex,
			x = imgX || 0,
			y = imgY || 0;

		// set canvas sizes and clear it
		if (x == 0 && y == 0) {
			const canvas = document.getElementById(elements.canvas);
			const context = canvas.getContext('2d');

			canvas.width = mosaic.width;
			canvas.height = mosaic.height;
			context.clearRect(0, 0, mosaic.width, mosaic.height);
		}

		if (y === scaled.height -1 && x === scaled.width) {
			Actions.setStatus('done');
			return;
		} else if(x === scaled.width) {
			x = 0;
			y++;
		}

		const start = x * 4 + y * scaled.width * 4;
		const end = start + 4;
		const [r, g, b] = scaled.data.slice(start, end);

		Actions.setProgress(x, y);
		hex = this.rgbToHex(r, g, b);

		Actions.setColorStat(hex);

		this.renderRow(hex, x * config.TILE_WIDTH, y * config.TILE_WIDTH)
			.then(() => {
				this.renderToCanvas(x + 1, y);
			});
	}

	renderRow = (hex, x, y) => {
		return new Promise ((resolve, reject) => {
			this.getHexSvg(hex)
				.then(rawSvg => {
						const {elements, mosaic} = this.props
						const svg = new Blob([rawSvg], {type:"image/svg+xml;charset=utf-8"});
						const domURL = self.URL || self.webkitURL || self;
						const url = domURL.createObjectURL(svg);
						const img = new Image();
						const buffer = document.getElementById(elements.buffer);
						const canvas = document.getElementById(elements.canvas);

						img.src = url;
						img.onload = () => {
							// render to buffer
							if (buffer) {
								const bufferctxt = buffer.getContext('2d');
								bufferctxt.drawImage(img, x, 0);
							} else {
								return;
							}

							if (x === (mosaic.width - config.TILE_WIDTH)) {
								// render to canvas
								if (canvas) {
									const context = canvas.getContext('2d');
									const bufferctxt = buffer.getContext('2d');
									const imgData = bufferctxt.getImageData(0, 0, mosaic.width, config.TILE_HEIGHT);

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

	renderToCanvasFromCashe = () => {
		const {mosaic, progress, status} = this.props;
		const canvas = document.getElementById(this.props.elements.canvas);
		const context = canvas.getContext('2d');
		let height;

		canvas.width = mosaic.width;
		canvas.height =mosaic.height;

		let imgData = new Uint8ClampedArray(mosaic.data);

		if (status == 'done') {
			height = mosaic.height;
		} else {
			height = progress.y * config.TILE_HEIGHT;
		}

		let imageData = new ImageData (imgData,  mosaic.width, height);

		context.putImageData(imageData, 0, 0);

		if (status == 'render') {
			Actions.setProgress(0, progress.y);
			this.renderToCanvas(0, progress.y);
		}
	}

	getHexSvg = (color) => {
		return new Promise ((resolve, reject) => {
			const svg = this.props.svg;
			const hex = color.slice(1);

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

	rgbToHex = (r, g, b) => {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	render () {
		const {mosaic, scaled, elements, status} = this.props;
		const isRendering = status == 'render';
		const isDone = status == 'done';

		return (
			<div className="canvas__container">
				<canvas className={cx({
					'show': isRendering || isDone
				})}	id={elements.canvas}
					height={scaled.height}
					width={scaled.width} />

				<canvas id={elements.buffer}
					height={config.TILE_HEIGHT}
					width={mosaic.width} />

				<ProgressBar />
			</div>
		)
	}
}