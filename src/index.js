import React from 'react'
import ReactDOM from 'react-dom'
import View from './components/view'
import Canvas from './components/canvas';
import Statistic from './components/statistic';
import {browserHistory, IndexRedirect, Redirect, Route, Router} from 'react-router'
import tree from './common/state';
import {root} from 'baobab-react/higher-order'

const RootedApp = root(tree, View)

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/' component={RootedApp}>
			<IndexRedirect to="/canvas" />
			<Route path="canvas" component={Canvas} />
			<Route path="statistics" component={Statistic} />
			<Redirect from="*" to="/canvas" />
		</Route>
	</Router>,
	document.getElementById('app')
);