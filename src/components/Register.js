import React, { Component } from 'react';
import TextField from './helpers/TextField';

function validateEmail(elementValue) {
	let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	return emailPattern.test(elementValue);
}

class Register extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		rePassword: '',
		errors: {
			username: '',
			email: '',
			password: '',
			rePassword: ''
		}
	};

	validateForm = ({ errors, ...rest }) => {
		let valid = true;

		Object.values(errors).forEach(val => {
			val.length > 0 && (valid = false);
		});

		Object.values(rest).forEach(val => {
			val === '' && (valid = false);
		});

		return valid;
	};

	handleOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
		this.validateFormFields(e);
	};

	validateFormFields = field => {
		const { name, value } = field.target;
		let errors = { ...this.state.errors };

		switch (name) {
			case 'username':
				errors.username =
					(value.length > 0 && value.length < 8) ||
					value !== value.toLowerCase()
						? 'Username needs to have atleast 8 characters lowercased'
						: '';
				break;
			case 'email':
				errors.email = validateEmail(value) ? '' : 'Email is not valid';
				break;
			case 'password':
				errors.password =
					value.length > 0 && value.length <= 5 ? 'Password is not valid' : '';
				break;
			case 'rePassword':
				errors.rePassword =
					value !== this.state.password
						? 'Re-Password must be the same like password'
						: '';
				break;
			default:
				break;
		}
		this.setState({ errors, [name]: value });
	};

	handleOnSubmit = e => {
		e.preventDefault();

		if (this.validateForm(this.state)) {
			this.registerUser();
		} else {
			this.setState({
				errors: {
					username: 'Username is required',
					email: 'Email is required',
					password: 'Password is required',
					rePassword: 'Re Password is required'
				}
			});

			setTimeout(this.clearState, 2000);
		}
	};

	registerUser = () => {
		const { password, email, username } = this.state;
		const users = JSON.parse(localStorage.getItem('users'));
		const user = { email, password, username };

		if (users.length === 0) {
			users.push(user);
			localStorage.setItem('users', JSON.stringify(users));
			this.clearState();
			this.props.history.push('/login');
		} else {
			let existingUsr = users.find(usr => usr.email === user.email);
			if (existingUsr) {
				this.setState({
					errors: {
						email: 'Email already exists'
					}
				});
			} else {
				users.push(user);
				localStorage.setItem('users', JSON.stringify(users));
				this.clearState();
				this.props.history.push('/login');
			}
		}
	};

	clearState = () => {
		this.setState({
			username: '',
			email: '',
			password: '',
			rePassword: '',
			errors: {
				username: '',
				email: '',
				password: '',
				rePassword: ''
			}
		});
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="register-form">
				<h2>Register</h2>
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
					{errors.username !== '' && (
						<div className="error">{errors.username}</div>
					)}
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
					{errors.email !== '' && <div className="error">{errors.email}</div>}
					<br />
					<TextField
						class="form-input"
						title="password"
						value={this.state.password}
						type="password"
						onChange={this.handleOnChange}
						name="password"
						placeholder="Enter password.."
					/>
					{errors.password !== '' && (
						<div className="error">{errors.password}</div>
					)}
					<br />
					<TextField
						class="form-input"
						long="long"
						title="re-password"
						value={this.state.rePassword}
						type="password"
						onChange={this.handleOnChange}
						name="rePassword"
						placeholder="Re password.."
					/>
					{errors.rePassword !== '' && (
						<div className="error">{errors.rePassword}</div>
					)}
					<br />
					<button value="submit" className="btn">
						Register
					</button>
				</form>
			</div>
		);
	}
}

export default Register;
