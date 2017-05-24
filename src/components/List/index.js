import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { receiveItems, deleteItem, updateItem } from '../../actions/items'
import { signOut } from '../../actions/auth'
import { Update } from '../Update'

export class List extends Component {
	constructor (props) {
		super(props)

		this.state = {
			updateItem: null
		}
	}

	componentWillMount () {
		this.props.dispatch(receiveItems())
	}

	handleItemDelete (event) {
		this.props.dispatch(deleteItem(event.target.dataset.id))
	}

	handleItemUpdate (event) {
		this.setState({
			updateItem: event.target.dataset.id
		})
	}

	handleUpdateSubmit (data) {
		this.props.dispatch(updateItem(data))
	}

	handleSignOut (event) {
		this.props.dispatch(signOut('/authenticate'))
	}

	handleInfo () {
		// alert(this.props.items)
	}

	render () {
		const updateItem = this.props.items.find(i => i._id === this.state.updateItem)
		return (
			<div>
				<h1>List</h1>
				<nav>
					<Link to="/create">Create</Link>
					<button onClick={this.handleSignOut.bind(this)}>Sign out</button>
				</nav>
				<button onClick={this.handleInfo.bind(this)}>Sign out</button>
				<ul>
					{this.props.items.map(item =>
						<li key={item._id}>
							<span>{item.title}</span>
							{item.parts.map(part =>
							<ul>{part.code}</ul>
						)}
							<button
								onClick={this.handleItemUpdate.bind(this)}
								data-id={item._id}>
									Update
								</button>
							<button
								onClick={this.handleItemDelete.bind(this)}
								data-id={item._id}>
									X
								</button>
						</li>

					)}

				</ul>
				{this.props.items.map(item => item.parts).map(part =>
					<li key={part._id}>
						<span>{part.code}</span>
					</li>

				)}
				{(() => {
						if (this.state.updateItem) {
							return <Update
											item={updateItem}
											handleSubmit={this.handleUpdateSubmit.bind(this)} />
						}
					})()}
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(List)
