import React, { Component } from 'react'
import axios from 'axios';

export default class AddProject extends Component {

	state = {
		title: '',
		description: ''
	}

	handleSubmit = event => {
		event.preventDefault();
		// make a post request to the server
		axios.post('/api/projects', {
			title: this.state.title,
			description: this.state.description
		})
			.then(() => {
				this.setState({
					title: '',
					description: ''
				})
				// trigger getData() in Projects.js to retrieve the current list
				// of projects from the server
				this.props.getData();
			})
			.catch(err => console.log(err))
	}
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="title">Title: </label>
				<input
					type="text"
					id="title"
					name="title"
					value={this.state.title}
					onChange={this.handleChange}
				/>
				<label htmlFor="description">Description: </label>
				<input
					type="text"
					id="description"
					name="description"
					value={this.state.description}
					onChange={this.handleChange}
				/>
				<button type="submit">Add this project</button>
			</form>
		)
	}
}
