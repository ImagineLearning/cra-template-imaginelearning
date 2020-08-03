import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import Home from './Home';
import store from '../../redux/configureStore';

test('renders learn react link', () => {
	const { getByText } = render(
		<Provider store={store}>
			<Home />
		</Provider>
	);

	expect(getByText(/learn/i)).toBeInTheDocument();
});
