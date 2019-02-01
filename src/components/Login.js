import React, { Component } from 'react';

import { withContext } from '../context';

// import components
import TextField from './helpers/TextField';

class Login extends Component {
	state = {
		email: '',
		password: '',
		error: ''
	};

	handleOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		const { checkIfAdmin, setAdmin, login, history } = this.props;

		const users = JSON.parse(localStorage.getItem('users'));
		const user = users.find(
			usr => email === usr.email && password === usr.password
		);

		if (checkIfAdmin({ email, password })) {
			setAdmin();
			login({ email, password });
			history.push('/admin');
		} else if (user) {
			login(user);
			history.push('/');
		} else {
			this.setState({ email: '', password: '', error: 'Invalid credentials' });

			setTimeout(() => this.setState({ error: '' }), 2000);
		}
	};

	render() {
		const { email, password } = this.state;
		return (
			<>
				<div className="login-form">
					<form onSubmit={this.handleFormSubmit}>
						<div className="error">{this.state.error}</div>
						<h2>Login</h2>
						<TextField
							className="form-input"
							value={email}
							type="email"
							onChange={this.handleOnChange}
							name="email"
							title="email"
							placeholder="Enter email.."
						/>
						<TextField
							className="form-input"
							long="long"
							value={password}
							type="password"
							onChange={this.handleOnChange}
							name="password"
							title="password"
							placeholder="Enter password.."
						/>
						<button type="submit" className="btn">
							Submit
						</button>
					</form>
				</div>
			</>
		);
	}
}

export default withContext(Login);
