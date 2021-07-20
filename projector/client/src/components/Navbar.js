import React from 'react'
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import { logout } from '../services/auth';

export default function Navbar(props) {

	const handleLogout = () => {
		// this logs the user out on the server
		logout().then(() => {
			// we need to also remove the user from the state in App.js	
			props.setUser(null);
		})
	}

	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{props.user ? (
					<>
						<li>
							<Link to='/projects'>Projects</Link>
						</li>
						<li>
							<Link to='/' onClick={() => handleLogout()}>Logout</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to='/signup'>Signup</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}
