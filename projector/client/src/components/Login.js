import React, { Component } from 'react'
import { login } from '../services/auth';

export default class Login extends Component {

	state = {
		username: '',
		password: '',
		message: ''
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		const { username, password } = this.state;
		login(username, password)
			.then(response => {
				if (response.message) {
					this.setState({
						message: response.message,
						username: '',
						password: ''
					})
				} else {
					// user is correctly signed up in the backend
					// -> we want to add the user also in the state of App.js
					this.props.setUser(response);
					// redirect to /projects
					this.props.history.push('/projects');
				}
			})
	}

	render() {
		return (
			<>
				<h2>Login</h2>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<button type="submit">Login</button>
					{this.state.message && (
						<h3>{this.state.message}</h3>
					)}
				</form>
			</>
		)

	}
}
