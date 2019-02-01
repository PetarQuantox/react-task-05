import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../../context';

const ProtectedRoute = ({ component: Component, ...rest }) => (
	<Consumer>
		{({ isLogged }) => (
			<Route
				render={props =>
					isLogged ? <Component {...props} /> : <Redirect to="/" />
				}
				{...rest}
			/>
		)}
	</Consumer>
);
export default ProtectedRoute;
