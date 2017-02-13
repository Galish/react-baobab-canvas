import React from 'react'

export default class extends React.Component {
	getPercentValue = (value, total) => {
		return `${(value/total*100).toFixed(2)}%`;
	}

	renderTable = () => {
		const {data} = this.props

		return (
			<table className="ui celled table">
				<thead>
					<tr>
						<th>Color</th>
						<th>Usage</th>
					</tr>
				</thead>
				<tbody>
					{data.map(item => this.renderTableItem(item.hex, item.value))}
				</tbody>
			</table>
		)
	}

	renderTableItem = (color, value) => {
		const {total} = this.props
		return (
			<tr key={color}>
				<td style={{'background': color}}>
					<span>{color}</span>
				</td>
				<td>
					{`${value} - ${this.getPercentValue(value, total)}`}
				</td>
			</tr>
		)
	}

	renderEmptyState = () => {
		return (
			<div className="ui positive message">
				No information
			</div>
		)
	}

	render () {
		const {data} = this.props
		const isEmpty = !data.length

		return (
			<div>
	 			{!isEmpty
					? this.renderTable()
					: this.renderEmptyState()}
			</div>
		)
	}
}