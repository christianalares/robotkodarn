import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'

import styles from './actionbuttons.css'

export class ActionButtons extends Component {
	constructor (props) {
		super(props)

		this.compileCode = this.compileCode.bind(this)
	}

	compileCode() {
		this.props.dispatch()
	}

	render () {

		return (
            <div className={styles.actionButtonWrapper}>
                <a className="button success" href="#"><FA className={styles.icons} name='cogs' />Testa min kod</a>
                <a onClick={this.compileCode} className="button success" href="#"><FA className={styles.icons} name='floppy-o' />Kompilera</a>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		
	}
}

export default connect(mapStateToProps)(ActionButtons)
