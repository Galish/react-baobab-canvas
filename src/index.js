import {React, render, ReactRouter, Root} from './vendor';
import Canvas from './components/canvas';
import Statistic from './components/statistic';
import createHistory from 'history/lib/createHashHistory';
import tree from './state';
const {Router, Route, Redirect, BrowserHistory} = ReactRouter;

render(
	<Root tree={tree}>
		<Router history={ createHistory({ queryKey: false }) }>
			<Redirect from="/" to="canvas/" />
			<Route path="canvas" component={Canvas} />
			<Route path="statistics" component={Statistic} />
		</Router>
	</Root>,	
	app //document.querySelector('#app')
);