import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Navbar from './../Navbar'
import Sidebar from './../Sidebar'
import Editor from './../Editor'
import Console from './../Console'

import './student.css'

export class Student extends Component {
	constructor (props) {
		super(props)
	}

	render () {

		return (
            <div>
                <Navbar />
                <Sidebar />
				<div className="main-pane">
					<h2>Intro</h2>
					<ActionButtons />
					<Editor />
					<Console />
				</div>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Student)
