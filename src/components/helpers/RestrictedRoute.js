import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../../context';

const RestrictedRoute = ({ component: Component, ...rest }) => (
	<Consumer>
		{({ isLogged }) => (
			<Route
				render={props =>
					isLogged ? <Redirect to="/" /> : <Component {...props} />
				}
				{...rest}
			/>
		)}
	</Consumer>
);
export default RestrictedRoute;
