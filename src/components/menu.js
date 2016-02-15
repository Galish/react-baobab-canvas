import {React, branch} from '../vendor';
import { Link } from 'react-router';

@branch({
  cursors: {
    menu: ['menu']
  }
})

export default class extends React.Component{
	render () {
		return (
			<div className="ui pointing menu">
				{ this.props.menu.map( menuitem => <MenuItem title={menuitem.title} link={menuitem.link} key={menuitem.title} />) }
			</div>
		)
	}
}

class MenuItem extends React.Component {
	render () {
		return (
			<div>
				<Link to={ this.props.link } className="item" activeClassName="active">{ this.props.title }</Link>				
			</div>
		)
	}
}