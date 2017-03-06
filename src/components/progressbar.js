import {branch} from 'react-baobab';
import cx from 'classnames'
import React from 'react';

@branch({
	status: ['status'],
	progress: ['progress']
})
export default class extends React.Component {
	render () {
		const {progress, status} = this.props

		return (
			<div className={cx('progressbar', {
				'show': status === 'render'
			})}><span>
					<div className="loader">
						<i className="loader__icon" />
					</div>
					{progress.bar
						? `${progress.bar}%`
						: '0%'}
				</span>
			</div>
		)
	}
}