import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from '../context';

import ProtectedRoute from '../components/helpers/ProtectedRoute';
import RestrictedRoute from '../components/helpers/RestrictedRoute';

// import components
import Login from './Login';
import Register from './Register';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Header from './Header';
import Admin from './Admin';
import UserProfile from './UserProfile';
import EditProfile from './Edit';

class App extends Component {
	state = {
		isLogged: false,
		isAdmin: false,
		user: {
			username: '',
			email: '',
			password: ''
		}
	};

	componentDidMount() {
		const admin = JSON.parse(localStorage.getItem('admin'));
		const users = JSON.parse(localStorage.getItem('users'));

		if (admin && users) {
			return true;
		} else {
			localStorage.setItem(
				'admin',
				JSON.stringify({
					email: 'admin@admin.com',
					password: 'admin',
					username: 'admin'
				})
			);
			localStorage.setItem('users', JSON.stringify([]));
		}
	}

	logout = () => {
		this.setState({
			isAdmin: false,
			isLogged: false,
			user: {}
		});
	};

	login = user => {
		this.setState({
			isLogged: true,
			user
		});
	};

	setAdmin = () => {
		this.setState({ isAdmin: true });
	};

	checkIfAdmin = user => {
		const admin = JSON.parse(localStorage.getItem('admin'));

		if (user.email === admin.email && user.password === admin.password) {
			return true;
		}

		return false;
	};

	updateUser = editedUser => {
		const users = JSON.parse(localStorage.getItem('users'));

		let index = users.findIndex(el => el.email === this.state.user.email);

		users.splice(index, 1, editedUser);

		localStorage.setItem('users', JSON.stringify(users));

		this.setState({
			user: editedUser
		});
	};

	getContext = () => ({
		...this.state,
		logout: this.logout,
		login: this.login,
		checkIfAdmin: this.checkIfAdmin,
		setAdmin: this.setAdmin,
		updateUser: this.updateUser
	});

	render() {
		return (
			<Provider value={this.getContext()}>
				<Router>
					<>
						<Header />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />
								<RestrictedRoute exact path="/login" component={Login} />
								<RestrictedRoute exact path="/register" component={Register} />
								<ProtectedRoute exact path="/admin" component={Admin} />
								<ProtectedRoute exact path="/profile" component={UserProfile} />
								<ProtectedRoute exact path="/edit" component={EditProfile} />
								<Route component={PageNotFound} />
							</Switch>
						</div>
					</>
				</Router>
			</Provider>
		);
	}
}

export default App;
