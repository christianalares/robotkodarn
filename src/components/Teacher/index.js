import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { isLoggedIn } from '../../actions/teacher'

import Navbar from './../Navbar'
import Sidebar from './../Sidebar'
import Editor from './../Editor'
import Console from './../Console'
import ActionButtons from './../ActionButtons'
import Snippets from './../Snippets'

import styles from './teacher.css'

export class Teacher extends Component {
	constructor (props) {
		super(props)

		this.getMainPaneClassName = this.getMainPaneClassName.bind(this)
	}

	componentWillMount() {
		this.props.dispatch(isLoggedIn())
	}

	getMainPaneClassName() {
		if(this.props.isSidebarOpen) {
			return styles.mainPane
		} else {
			return styles.mainPane + ' ' + styles.mainPaneExpanded
		}
	}

	render () {

		return (
            <div>
                <Navbar />
                <Sidebar user='teacher' />
				<div className={this.getMainPaneClassName()}>
					<h2>Intro</h2>
					<ActionButtons />
					<Editor />
					<Snippets />
					<Console user="teacher" />
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

export default connect(mapStateToProps)(Teacher)
