import {React, branch} from '../vendor';

@branch({
  cursors: {
  	status: ['status'],
    progress: ['progress']
  }
})

export default class extends React.Component {
	render () {
		let className = "progressbar";
		if( this.props.status == 'render' ) className += " show";
		return (
			<div className={className}><span>{ this.props.progress.bar ? this.props.progress.bar + "%" : "" }</span></div>
		)
	}
}