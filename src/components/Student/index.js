import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Navbar from './../Navbar'
import Sidebar from './../Sidebar'
import Editor from './../Editor'
import Console from './../Console'
import ActionButtons from './../ActionButtons'
import Snippets from './../Snippets'

import styles from './student.css'

import { findWorkshopByPin } from '../../actions/student'
// import { findWorkshopByPin } from './../../actions/student'

export class Student extends Component {
	constructor (props) {
		super(props)

		this.getMainPaneClassName = this.getMainPaneClassName.bind(this)

		this.state = {
			workshop: null
		}
	}
	componentWillMount() {
		// console.log( getWorkshop )
		// console.log( 'currentWorkshop', this.props.currentWorkshop )
		this.props.dispatch( findWorkshopByPin(this.props.params.pin) )
	}

	componentWillReceiveProps(newProps) {
		this.setState( { workshop: JSON.parse(newProps.currentWorkshop) } )
	}

	getMainPaneClassName() {
		if(this.props.isSidebarOpen) {
			return styles.mainPane
		} else {
			return styles.mainPane + ' ' + styles.mainPaneExpanded
		}
	}

	renderWorkshop() {

		if(this.props.currentWorkshop) {
			console.log( this.state.workshop )

			return (
				<div>
					<Navbar pincode={this.state.workshop.pincode} />
					<Sidebar workshop={this.state.workshop} />
					<div className={this.getMainPaneClassName()}>
						<h2>{this.state.workshop.title}</h2>
						<ActionButtons />
						<Editor workshop={this.state.workshop} />
						<Snippets />
						<Console />
					</div>
				</div>
			)
		} else {
			return <h1>LADDAR</h1>
		}
	}

	render () {
		return this.renderWorkshop()
	}
}

function mapStateToProps (state) {
	return {
		isSidebarOpen: state.sidebar.open,
		currentWorkshop: state.login.currentWorkshop
	}
}

export default connect(mapStateToProps)(Student)