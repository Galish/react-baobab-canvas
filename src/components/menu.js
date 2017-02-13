import {branch} from 'react-baobab';
import {Link} from 'react-router';
import React from 'react'

@branch({
	menu: ['menu']
})
export default class extends React.Component {
	renderItem = ({link, title}) => {
		return (
			<Link activeClassName="active"
				className="item"
				key={link}
				to={link}>
				{title}
			</Link>
		)
	}
	render () {
		return (
			<div className="ui pointing menu">
				{this.props.menu.map(menuitem => this.renderItem(menuitem))}
			</div>
		)
	}
}