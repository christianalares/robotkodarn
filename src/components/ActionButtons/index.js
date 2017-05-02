import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './actionbuttons.css'

export class ActionButtons extends Component {
	constructor (props) {
		super(props)
	}

	render () {

		return (
            <div>
                
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(ActionButtons)
