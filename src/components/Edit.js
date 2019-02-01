import React, { Component } from 'react';
import { Consumer } from '../context';

import { withContext } from '../context';

import TextField from './helpers/TextField';

class EditProfile extends Component {
	state = {
		username: '',
		email: '',
		oldPassword: '',
		password: '',
		rePassword: '',
		errors: ''
	};

	componentDidMount = () => {
		this.setState({
			username: this.props.user.username,
			email: this.props.user.email
		});
	};

	componentWillUnmount = () => {
		this.setState({
			username: '',
			email: '',
			oldPassword: '',
			password: '',
			rePassword: '',
			errors: ''
		});
	};

	handleOnSubmit = e => {
		e.preventDefault();

		const newUser = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		};

		if (this.validateForm()) {
			this.props.updateUser(newUser);
			this.props.history.push('/profile');
		} else {
			this.props.history.push('/edit');
		}
	};

	handleOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	validateForm = () => {
		const { username, password, rePassword, email } = this.state;
		let valid = true;

		if (
			username === '' ||
			password === '' ||
			rePassword === '' ||
			email === ''
		) {
			this.setState({
				errors: "Fileds can't be empty"
			});
			valid = false;
			setTimeout(() => this.setState({ errors: '' }), 2000);
		}

		if (password !== rePassword) {
			this.setState({
				errors: 'Passwords do not match'
			});
			valid = false;
			setTimeout(() => this.setState({ errors: '' }), 2000);
		}

		return valid;
	};

	render() {
		return (
			<Consumer>
				{({ user }) => (
					<div>
						<h1 style={{ textAlign: 'center', color: 'red' }}>
							{this.state.errors}
						</h1>
						<form onSubmit={this.handleOnSubmit}>
							<TextField
								class="form-input"
								title="username"
								value={this.state.username}
								type="text"
								onChange={this.handleOnChange}
								name="username"
								placeholder="Enter username.."
								noValidate
							/>
							<br />
							<TextField
								class="form-input"
								title="email"
								value={this.state.email}
								type="email"
								onChange={this.handleOnChange}
								name="email"
								placeholder="Enter Email.."
								noValidate
							/>
							<br />
							<TextField
								class="form-input"
								long="long"
								title="Old password"
								value={this.state.oldPassword}
								type="password"
								onChange={this.handleOnChange}
								name="oldPassword"
								placeholder="Enter password.."
							/>
							<br />
							{this.state.oldPassword === user.password ? (
								<>
									<TextField
										class="form-input"
										title="New password"
										long="long"
										value={this.state.password}
										type="password"
										onChange={this.handleOnChange}
										name="password"
										placeholder="Re password.."
									/>
									<TextField
										class="form-input"
										long="long"
										title="Re password"
										value={this.state.rePassword}
										type="password"
										onChange={this.handleOnChange}
										name="rePassword"
										placeholder="Re password.."
									/>
								</>
							) : null}
							<br />
							<button value="submit" className="btn">
								Update
							</button>
						</form>
					</div>
				)}
			</Consumer>
		);
	}
}

export default withContext(EditProfile);
