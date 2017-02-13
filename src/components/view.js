import Menu from './menu';
import React from 'react'

export default class extends React.Component {
	static propTypes = {
		location: React.PropTypes.object.isRequired,
	}

	render() {
		const {location} = this.props
		const {pathname} = location

		return (
			<div>
				<Menu />
				{this.props.children}
			</div>
		)
	}
}