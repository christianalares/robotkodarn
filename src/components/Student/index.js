import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Navbar from './../Navbar'
import Sidebar from './../Sidebar'
import Editor from './../Editor'
import Console from './../Console'
import ActionButtons from './../ActionButtons'
import Snippets from './../Snippets'

import styles from './student.css'

export class Student extends Component {
	constructor (props) {
		super(props)

		this.getMainPaneClassName = this.getMainPaneClassName.bind(this)
	}

	getMainPaneClassName() {
		if(this.props.isSidebarOpen) {
			return styles.mainPane
		} else {
			return styles.mainPane + ' ' + styles.mainPaneExpanded
		}
	}

	render () {

		console.log(this.props)

		return (
            <div>
                <Navbar />
                <Sidebar />
				<div className={this.getMainPaneClassName()}>
					<h2>Intro</h2>
					<ActionButtons />
					<Editor />
					<Snippets />
					<Console />
				</div>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		isSidebarOpen: state.sidebar.open
	}
}

export default connect(mapStateToProps)(Student)
