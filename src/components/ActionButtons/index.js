import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'

import './actionbuttons.css'

export class ActionButtons extends Component {
	constructor (props) {
		super(props)
	}

	render () {

		return (
            <div className="action-button-wrapper">
                <a className="button success" href="#"><FA name='cogs' />Testa min kod</a>
                <a className="button success" href="#"><FA name='floppy-o' />Spara fil</a>
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
