import Form from './form';
import Mosaic from './mosaic';
import React from 'react';

export default class extends React.Component {
	render () {
		return (
			<div>
				<h1>Canvas</h1>
				<Form />
				<Mosaic />
			</div>
		)
	}
};