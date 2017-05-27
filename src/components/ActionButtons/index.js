import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'

import styles from './actionbuttons.css'

import { compileCode, pingForUSBConnection, setConsoleOutput } from '../../actions/editor'

export class ActionButtons extends Component {
	constructor (props) {
		super(props)

		this.state = {
			connectedArduino: null
		}

		this.handleCompileButtonClick = this.handleCompileButtonClick.bind(this)
		this.renderUploadButtonClassNames = this.renderUploadButtonClassNames.bind(this)
	}
	componentDidMount() {
		this.pingForUSBConnection(2000)
	}

	handleCompileButtonClick() {
		if(this.props.connectedArduino) {
			this.props.dispatch( compileCode(this.props.updatedCode) )
		} else {
			this.props.dispatch( setConsoleOutput({
				type: 'error',
				heading: 'Fel',
				message: 'Hittade ingen inkopplad robot'
			}) )
		}
	}

	pingForUSBConnection(howOften) {
		setInterval(() => {
			this.props.dispatch( pingForUSBConnection() )
			this.setState({
				connectedArduino: this.props.connectedArduino
			})
		}, howOften)
	}
	renderUploadButtonClassNames() {
		return (this.state.connectedArduino)
			? 'button success'
			: 'button success disabled'
	}
	render () {

		return (
            <div className={styles.actionButtonWrapper}>
                <a className="button success" href="#"><FA className={styles.icons} name='cogs' />Testa min kod</a>
                <a onClick={this.handleCompileButtonClick} className={this.renderUploadButtonClassNames()} href="#"><FA className={styles.icons} name='usb' />Ladda över kod</a>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		updatedCode: state.editor.updatedCode,
		connectedArduino: state.editor.connectedArduino
	}
}

export default connect(mapStateToProps)(ActionButtons)
