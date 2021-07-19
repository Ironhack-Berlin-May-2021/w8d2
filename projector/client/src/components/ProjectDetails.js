import React, { Component } from 'react'
import axios from 'axios';
import EditProject from './EditProject';

export default class ProjectDetails extends Component {

	state = {
		project: null,
		title: '',
		description: '',
		error: null,
		editForm: false
	}

	getData = () => {
		const id = this.props.match.params.id;
		axios.get(`/api/projects/${id}`)
			.then(response => {
				// console.log(response.data)
				this.setState({
					project: response.data,
					title: response.data.title,
					description: response.data.description,
				})
			})
			.catch(err => {
				console.log(err);
				if (err.response.status === 404) {
					this.setState({
						error: 'Not Found 🤷‍♀️ 🤷‍♂️'
					})
				}
			})
	}

	deleteProject = () => {
		// delete the project in the database
		axios.delete(`/api/projects/${this.state.project._id}`)
			.then(() => {
				// redirect to the projects list
				// redirect using react router
				this.props.history.push('/projects');
			})
			.catch(err => console.log(err))
	}

	componentDidMount() {
		this.getData();
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	toggleEditForm = () => {
		this.setState(state => ({
			editForm: !state.editForm
		}))
	}

	handleSubmit = e => {
		e.preventDefault();
		const { title, description } = this.state;
		axios.put(`/api/projects/${this.state.project._id}`, {
			title,
			description
		})
			.then(response => {
				this.setState({
					project: response.data,
					title: response.data.title,
					description: response.data.description,
					editForm: false
				})
			})
			.catch(err => console.log(err))
	}

	render() {
		if (this.state.error) return <h2>{this.state.error}</h2>
		if (!this.state.project) return <></>
		return (
			<>
				<h1>Title: {this.state.project.title}</h1>
				<p>Description: {this.state.project.description}</p>
				<button onClick={this.deleteProject}>Delete this project 🗑</button>
				<button onClick={this.toggleEditForm}>Show Edit form</button>
				{this.state.editForm && (
					<EditProject
						// title={this.state.title}
						// description={this.state.description}
						{...this.state}
						handleSubmit={this.handleSubmit}
						handleChange={this.handleChange}
					/>
				)}
			</>
		)
	}
}
