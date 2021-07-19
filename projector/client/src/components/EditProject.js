import React, { Component } from 'react'

export default class EditProject extends Component {
	render() {
		return (
			<div>
				<h1>Edit this project</h1>
				<form onSubmit={this.props.handleSubmit}>
					<label htmlFor="title">Title: </label>
					<input
						id="title"
						type="text"
						name="title"
						value={this.props.title}
						onChange={this.props.handleChange}
					/>
					<label htmlFor="description">Description: </label>
					<input
						id="description"
						type="text"
						name="description"
						value={this.props.description}
						onChange={this.props.handleChange}
					/>
					<button type="submit">Update this project</button>
				</form>
			</div>
		)
	}
}
