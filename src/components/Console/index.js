import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './console.css'

export class Console extends Component {
	render() {

		let consoleClass = styles.consoleWrapper
		if(this.props.user === 'teacher') {
			consoleClass = styles.consoleWrapperTeacher
		}

		return (
			<div className={consoleClass}>
				<h4>Konsol</h4>
				<div className={styles.console}>
					
				</div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		
	}
}

export default connect(mapStateToProps)(Console)