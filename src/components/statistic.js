import {React, branch} from '../vendor';
import Menu from './menu';
import tree from '../state';

@branch({
  cursors: {
    stat: ['stat']
  }
})

export default class extends React.Component {

	sortStats (obj) {
		var arr = [];
		var prop;
		for (prop in obj) {
		    if (obj.hasOwnProperty(prop)) {
		        arr.push({
		            'hex': prop,
		            'value': obj[prop]
		        });
		    }
		}
		arr.sort(function(a, b) {
		    return b.value - a.value;
		});
		return arr;
	}

	render () {
		return (
			<div>
				<Menu />
				<h1>Statistic</h1>
				<StatisticTable data={ this.sortStats(this.props.stat.colors) } total={this.props.stat.total} />
			</div>
		)
	}
}

class StatisticTable extends React.Component {
	render () {
		return (
			<div>
 			{
 				this.props.data.length ?
					<table className="ui celled table">
					<StatisticCaption />
					<tbody>{ this.props.data.map( item => <StatisticItem color={item.hex} value={item.value} total={this.props.total} key={item.hex} /> ) }</tbody>
					</table>
				:
					<StaticsEmpty />
			}
			</div>
		)
	}
}

class StatisticCaption extends React.Component {
	render () {
		return (
			<thead>
				<tr>
					<th>Color</th>
					<th>usage</th>
				</tr>
			</thead>
		)
	}
}

class StatisticItem extends React.Component {

	getPercentValue (value, total) {
		return (value/total*100).toFixed(2) + "%";
	}

	render () {
		return (
			<tr>
				<td style={{ 'background': this.props.color }}>
					<span>{this.props.color}</span>
				</td>
				<td>
					{this.props.value}
					{ " - " }
					{ this.getPercentValue(this.props.value, this.props.total) }
				</td>
			</tr>
		)
	}
}

class StaticsEmpty extends React.Component {
	render () {
		return (
			<div className="ui positive message">
				No information
			</div>
		)
	}
}