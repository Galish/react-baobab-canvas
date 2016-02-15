import request from 'superagent';
import tree from '../state';
import config from '../config';

export default {
	getColorSvg: ( hex ) => {
		return new Promise ((resolve, reject) => {
			const req = request
			.get('http://localhost:9000/colors/' + hex)
			//.withCredentials()
			.set('Accept', 'image/svg+xml')
			.end(function(err, res){
				if( res.status == '200' ) {
					tree.set(['svg', hex], res.text); //tree.select('svg').set(hex, res.text);				
					resolve(res.text);
				} else {
					reject('error');
				}
			});
		});
	},

	loadImage: (src) => {
		return new Promise ((resolve, reject) => {
			let img = new Image();
			img.src =  src;
			img.onload = () => {

				const {src, height, width} = img;
				tree.set('image', {src, height, width});

	            const scaleWidth = Math.ceil(img.width/config.TILE_WIDTH),
	            	  scalex = scaleWidth/img.width,
	            	  scaleHeight = Math.ceil(img.height/config.TILE_HEIGHT),
	            	  scaley = scaleHeight/img.height;

	            // scaled image sizes
	            tree.set('scaled', {
	            	height: scaleHeight,
	            	width: scaleWidth,
	            	scalex,
	            	scaley
	            });

				// mosaic size
				tree.set('mosaic', {
					height: (scaleHeight * config.TILE_HEIGHT),
					width: (scaleWidth * config.TILE_WIDTH),
					data: []
				});
				
				tree.set('status', 'loaded');				
				tree.set(["progress", "bar"], 0);

				resolve(img);
			};
		});
	},

	getScaledImageData: (context) => {
		return new Promise ((resolve, reject) => {
			let imageData =  Array.from(context.getImageData(0, 0, tree.select('scaled', 'width').get(), tree.select('scaled', 'height').get()).data);

			tree.set(['scaled', 'data'], imageData);			
			tree.set('status', 'ready');

			resolve(imageData);
		});
	},

	setStatus: (status) => {
		tree.set('status', status);
	},

	setColorStat: (hex) => {
		const statColors = tree.select('stat', 'colors'),
			  statTotal = tree.select('stat', 'total');

		if (!statColors.get(hex)) 
			statColors.set(hex, 1);
		else 
			statColors.set(hex, statColors.get(hex) + 1);

		if (!statTotal.get()) 
			statTotal.set(1);
		else 
			statTotal.set(statTotal.get() + 1);
	},

	saveDrawResults: (data) => {
		const arrData = Array.from(data),
			  mosaicData = tree.select('mosaic', 'data');

		if (mosaicData.get())
			mosaicData.set(mosaicData.get().concat(arrData));
		else
			mosaicData.set(arrData);
	},

	setProgress: (x, y) => {
		const cursorScaled = tree.select("scaled"),
			  total = cursorScaled.get('width') * cursorScaled.get('height'),
			  step = x + y * cursorScaled.get('width'),
			  bar =  Math.round(step / total *100);

		tree.set("progress", {bar, x, y});
	}

}