import request from 'superagent';
import tree from '../common/state';
import config from '../common/config';
const SERVER_URI = 'https://glacial-depths-22749.herokuapp.com'; //http://localhost:9000

export default {
	getColorSvg: (hex) => {
		return new Promise ((resolve, reject) => {
			request.get(`${SERVER_URI}/colors/${hex}`)
				.set('Accept', 'image/svg+xml')
				.end(function(err, res){
					if (res.status === 200) {
						tree.set(['svg', hex], res.text);
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

				const scaleWidth = Math.ceil(img.width/config.TILE_WIDTH);
				const scalex = scaleWidth/img.width;
				const scaleHeight = Math.ceil(img.height/config.TILE_HEIGHT);
				const scaley = scaleHeight/img.height;

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
			const cursorScaled = tree.select('scaled');
			const {height, width} = cursorScaled.get()
			const imageData =  Array.from(context.getImageData(0, 0, width, height).data);

			cursorScaled.set('data', imageData);
			tree.set('status', 'ready');

			resolve(imageData);
		});
	},

	setStatus: (status) => {
		tree.set('status', status);
	},

	setColorStat: (hex) => {
		const statColors = tree.select('stat', 'colors');
		const statTotal = tree.select('stat', 'total');

		if (!statColors.get(hex)) {
			statColors.set(hex, 1);
		} else {
			statColors.set(hex, statColors.get(hex) + 1);
		}

		if (!statTotal.get()) {
			statTotal.set(1);
		} else {
			statTotal.set(statTotal.get() + 1);
		}
	},

	saveDrawResults: (data) => {
		const arrData = Array.from(data);
		const mosaicData = tree.select('mosaic', 'data');

		if (mosaicData.get()) {
			mosaicData.set(mosaicData.get().concat(arrData));
		} else {
			mosaicData.set(arrData);
		}
	},

	setProgress: (x, y) => {
		const cursorScaled = tree.select("scaled");
		const total = cursorScaled.get('width') * cursorScaled.get('height');
		const step = x + y * cursorScaled.get('width');
		const bar =  Math.round(step / total *100);

		tree.set("progress", {bar, x, y});
	}
}