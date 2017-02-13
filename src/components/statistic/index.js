import {branch} from 'react-baobab';
import React from 'react';
import Table from './table'

@branch({
	stat: ['stat']
})
export default class extends React.Component {
	sortStats = () => {
		const {stat} = this.props
		const colors = stat.colors || {}
		const arr = []

		Object.keys(colors).forEach((hex) => {
			arr.push({
				hex: hex,
				value: colors[hex]
			});
		})

		arr.sort(function(a, b) {
			return b.value - a.value;
		});
		return arr;
	}

	render () {
		const {total} = this.props.stat
		const data = this.sortStats()

		return (
			<div>
				<h1>Statistic</h1>
				<Table data={data}
					total={total} />
			</div>
		)
	}
}