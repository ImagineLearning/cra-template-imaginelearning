import React from 'react';
import Counter from '../../components/Counter/Counter';
import './Home.scss';
import logo from './logo.svg';

function Home() {
	return (
		<div className="Home">
			<header>
				<img src={logo} className="Home-logo" alt="logo" />
			</header>
			<div>
				<Counter />
				<p>
					Edit <code>src/containers/Home/Home.tsx</code> and save to reload.
				</p>
				<p>
					Learn{' '}
					<a
						className="Home-link"
						href="https://reactjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React
					</a>
					,{' '}
					<a
						className="Home-link"
						href="https://reactrouter.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React Router
					</a>
					,{' '}
					<a
						className="Home-link"
						href="https://redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux
					</a>
					,{' '}
					<a
						className="Home-link"
						href="https://redux-toolkit.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux Toolkit
					</a>
					,{' '}
					<a
						className="Home-link"
						href="https://react-redux.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						React Redux
					</a>
					, and{' '}
					<a
						className="Home-link"
						href="https://redux-observable.js.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Redux Observable
					</a>
				</p>
			</div>
		</div>
	);
}

export default Home;
