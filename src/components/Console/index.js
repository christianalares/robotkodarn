import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './console.css'

export class Console extends Component {
	render() {
		return (
			<div className={styles.consoleWrapper}>
				<h4>Konsol</h4>
				<div className={styles.console}>
					
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

export default connect(mapStateToProps)(Console)