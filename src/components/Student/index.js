import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Navbar from './../Navbar'
import Sidebar from './../Sidebar'

export class Student extends Component {
	constructor (props) {
		super(props)
	}

	render () {

		return (
            <div>
                <Navbar />
                <Sidebar />
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
