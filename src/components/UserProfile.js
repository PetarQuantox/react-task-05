import React from 'react';
import { Consumer } from '../context';
import { Link } from 'react-router-dom';
export default function UserProfile() {
	return (
		<Consumer>
			{({ user }) => (
				<div className="user-details">
					<h1>Profile details:</h1>
					<p>
						<strong>Username :</strong> {user.username}{' '}
					</p>
					<p>
						<strong>Email :</strong> {user.email}{' '}
					</p>
					<Link to="/edit">
						<span className="edit-link">
							Edit profile <i class="fa fa-pencil" />
						</span>
					</Link>
				</div>
			)}
		</Consumer>
	);
}
