'use strict';
const express = require('express');
const app = express();
const env = app.get('env');
const port = process.env.PORT || 9000;


app
	.use(require('cors')({
		credentials: true,
		origin: new RegExp('.*')
	}))
	.use(require('./render-svg'))
	.get('*', (req, res) => {

		// 404 if was not handled by previous middleware layers
		res.sendStatus(404);
	})
	.listen(port, () => {
		console.info(`${env} server started at port ${port}`);
	});