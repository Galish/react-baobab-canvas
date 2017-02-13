import Actions from '../../actions';
import {branch} from 'react-baobab';
import cx from 'classnames'
import React from 'react';

@branch({
	elements:	['elements'],
	status:		['status']
})
export default class extends React.Component {
	onSelected  = (e) => {
		let src = URL.createObjectURL(e.target.files[0]);
		Actions.loadImage(src);
	}

	onRender = () => {
		Actions.setStatus('render');
	}

	onSave = () => {
		const {elements} = this.props
		const canvas = document.getElementById(elements.canvas);
		const link = document.getElementById(elements.link);

		if (canvas && link) {
			link.href = canvas.toDataURL();
			link.download = 'mosaic.png';
		}
	}

	render () {
		const {elements, status} = this.props
		const {link} = elements;
		const isRendeing = status === 'render';
		const isReady = status === 'ready';
		const isDone = status === 'done';

		return  (
			<div>
				<div className="form">
					<button className="ui button button-file">
						<i className="upload icon" />
						Select image
						<input onChange={this.onSelected}
							type="file" />
					</button>
					<button className={cx('ui button', {
						'show': isReady,
						'hide': !isReady
					})}	onClick={this.onRender}>
						<i className="cube icon" />
						Render
					</button>
					<a id={link} className={cx('ui button', {
						'show': isDone,
						'hide': !isDone
					})}	onClick={this.onSave}>
						<i className="save icon" />
						Save image
					</a>
					{isRendeing &&
						<div className="layer" />
					}
				</div>
				{isReady && (
					<div className="ui positive message">
						Image loaded. Click <b>Render</b> or <b>Select another image</b>
					</div>
				)}
			</div>
		)
	}
}