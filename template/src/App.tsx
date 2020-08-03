import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';

// Split code with `React.lazy` to lazy-load your container components
const Home = React.lazy(() => import('./containers/Home/Home'));

function App() {
	return (
		<div className="App">
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route component={Home} exact path="/" />
					<Redirect to="/" />
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;
