import {React, branch} from '../vendor';
import Actions from '../actions/actions';

@branch({
  cursors: {
  	elements: ['elements'],
    status: ['status']
  }
})

export default class extends React.Component {
	
	constructor(props) {
    	super(props);
    	return
  	}

	handlerSelected (e) {
		let src = URL.createObjectURL(e.target.files[0]);
		Actions.loadImage(src);
	}

	handlerRender () {
		Actions.setStatus('render');
	}

	handlerSave () {
		let canvas = document.getElementById(this.props.elements.canvas),
			link = document.getElementById(this.props.elements.link);

		if (canvas && link) {
			link.href = canvas.toDataURL();
			link.download = 'mosaic.png';
		}
	}

	render () {
		const status = this.props.status,
			  link = this.props.elements.link,
			  isRendeing = status == 'render',
			  isReady = status == 'ready',
			  isDone = status == 'done';

		return  (
			<div>
				<div className="form">
					<button className="ui button button-file">
						<i className="upload icon"></i>
						Select image
						<input type="file" onChange={ this.handlerSelected } />
					</button>
					<button className={ isReady ? "ui button show" : "ui button  hide" } onClick={ this.handlerRender }>
						<i className="cube icon"></i>
						Render
					</button>
					<a id={link} className={ isDone ? "ui button show" : "ui button hide" } onClick={ this.handlerSave.bind(this) }>
						<i className="save icon"></i>
						Save image
					</a>
					{ isRendeing &&
							<div className="layer"></div>
					}
				</div>
				{ isReady &&
						<div className="ui positive message">Image loaded. Click <b>Render</b> or <b>Select another image</b></div>
				}
			</div>
		)		
	}
}