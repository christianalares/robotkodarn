import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'

import styles from './actionbuttons.css'

export class ActionButtons extends Component {
	constructor (props) {
		super(props)
	}

	render () {

		return (
            <div className={styles.actionButtonWrapper}>
                <a className="button success" href="#"><FA className={styles.icons} name='cogs' />Testa min kod</a>
                <a className="button success" href="#"><FA className={styles.icons} name='floppy-o' />Spara fil</a>
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
