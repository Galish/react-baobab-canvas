'use strict';
const util = require('util');
const config = require('../src/common/config');
const reHexColor = new RegExp(/^[0-9a-f]{6}$/i);

const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="%d" height="%d">
	<ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#%s"></ellipse>
</svg>`;


module.exports = require('express')()
	.get('/colors/:hex', (req, res, next) => {
		const hex = req.params.hex;

		// 404 if the param is not a correct color-code
		if (!reHexColor.test(hex)) return next();

		res.format({
			'image/svg+xml': () => {
				res.send(util.format(svgTemplate, config.TILE_WIDTH, config.TILE_HEIGHT, hex));
			},

			// 406 if the file-format is not supported
			default() {
				res.sendStatus(406);
			}
		});
	});