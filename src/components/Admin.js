import React, { Component } from 'react';

class Admin extends Component {
	state = {
		users: []
	};
	componentDidMount() {
		const users = JSON.parse(localStorage.getItem('users'));

		this.setState({ users });
	}
	deleteUser = email => {
		this.setState(
			{
				users: this.state.users.filter(user => !(email === user.email))
			},
			() => localStorage.setItem('users', JSON.stringify(this.state.users))
		);
	};
	render() {
		return (
			<div className="admin-container">
				{this.state.users.length > 0 ? (
					this.state.users.map((user, index) => (
						<div key={index + 1} className="registred-user">
							<span> {user.email}</span>
							<a href="#0" onClick={e => this.deleteUser(user.email)}>
								<i class="fa fa-times" />
							</a>
						</div>
					))
				) : (
					<h1>No registred users</h1>
				)}
			</div>
		);
	}
}

export default Admin;
