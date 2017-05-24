import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'

import styles from './actionbuttons.css'

import { compileCode } from '../../actions/actionButtons'

export class ActionButtons extends Component {
	constructor (props) {
		super(props)

		this.handleCompileButtonClick = this.handleCompileButtonClick.bind(this)
	}

	handleCompileButtonClick() {
		this.props.dispatch( compileCode(this.props.updatedCode) )
	}

	render () {

		return (
            <div className={styles.actionButtonWrapper}>
                <a className="button success" href="#"><FA className={styles.icons} name='cogs' />Testa min kod</a>
                <a onClick={this.handleCompileButtonClick} className="button success" href="#"><FA className={styles.icons} name='floppy-o' />Kompilera</a>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		updatedCode: state.editor.updatedCode
	}
}

export default connect(mapStateToProps)(ActionButtons)
