import React, { Component } from 'react'
import axios from 'axios';
import ProjectList from './ProjectList';
import AddProject from './AddProject';

export default class Projects extends Component {

	state = {
		projects: []
	}

	getData = () => {
		axios.get('http://localhost:5005/api/projects')
			.then(response => {
				console.log(response);
				this.setState({
					projects: response.data
				})
			})
			.catch(err => console.log(err))
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		return (
			<div>
				<AddProject getData={this.getData} />
				<ProjectList projects={this.state.projects} />
			</div>
		)
	}
}
