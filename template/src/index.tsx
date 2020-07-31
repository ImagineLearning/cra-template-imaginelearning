import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { ENV } from './constants/env';
import './index.scss';
import store from './redux/configureStore';
import { initEnvironment } from './redux/modules/environment';
import * as serviceWorker from './serviceWorker';

// Initialize environment configuration in the store
store.dispatch(initEnvironment(ENV));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
