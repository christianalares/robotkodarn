import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Navbar from './../Navbar'
import Sidebar from './../Sidebar'
import Editor from './../Editor'
import Console from './../Console'
import ActionButtons from './../ActionButtons'
import Snippets from './../Snippets'

import { closeSidebar, openSidebar } from '../../actions/sidebar'

import styles from './student.css'

export class Student extends Component {
	constructor (props) {
		super(props)
	}

	render () {

		return (
            <div>
                <Navbar />
                <Sidebar />
				<div className={styles.mainPane}>
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
		isSidebarOpen: state.sidebar.open,
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Student)
