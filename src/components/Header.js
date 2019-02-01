import React from 'react';
import { Consumer } from '../context';
import { NavLink } from 'react-router-dom';
export default function Header() {
	return (
		<Consumer>
			{({ isLogged, logout, user, isAdmin }) => (
				<header className="header">
					<div className="wrapper">
						<div className="logo">React task 05</div>
						{isLogged ? (
							<ul className="navbar">
								<li>Logged as: {user.email}</li>

								<li>
									<a href="#0" onClick={logout}>
										Logout{' '}
									</a>
								</li>
								{isAdmin ? null : (
									<li>
										{' '}
										<NavLink to="profile">My profile</NavLink>
									</li>
								)}
							</ul>
						) : (
							<ul className="navbar">
								<li>
									<NavLink to="/register"> Register</NavLink>
								</li>
								<li>
									<NavLink to="/login">Login</NavLink>
								</li>
							</ul>
						)}
					</div>
				</header>
			)}
		</Consumer>
	);
}
