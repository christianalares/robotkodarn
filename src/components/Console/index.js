import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { setConsoleOutput } from '../../actions/editor'

import styles from './console.css'

export class Console extends Component {
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.compilerResponse !== this.props.compilerResponse) {
			let msg

			if(nextProps.compilerResponse.success) {
				msg = {
					key: +new Date(),
					timestamp: new Date(),
					type: 'success',
					heading: 'Kompilering klar',
					message: 'Laddar upp till robot...'
				}
			} else if(nextProps.compilerResponse.debug) {
				msg = {
					key: +new Date(),
					timestamp: new Date(),
					type: 'error',
					heading: 'Något gick fel',
					message: nextProps.compilerResponse.debug
				}
			}
			this.props.dispatch( setConsoleOutput(msg) )
		}
	}

	render() {
		return (
			<div className={styles.consoleWrapper}>
				<h4>Konsol</h4>
				<div className={styles.console}>
					<pre>
						{this.props.consoleOutput.map( message => {
							let h = (message.timestamp.getHours() < 10) ? '0' + message.timestamp.getHours() : message.timestamp.getHours(),
								m = (message.timestamp.getMinutes() < 10) ? '0' + message.timestamp.getMinutes() : message.timestamp.getMinutes(),
								s = (message.timestamp.getSeconds() < 10) ? '0' + message.timestamp.getSeconds() : message.timestamp.getSeconds(),
								timestamp = `${h}:${m}:${s}`

							return (
								<div key={message.key}><span className={styles.timestamp}>[{timestamp}]</span> <span className={styles[message.type]}>{message.heading}:</span><br/>{message.message}</div>
							)
						} )}
					</pre>
				</div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		compilerResponse: state.editor.compilerResponse || '',
		consoleOutput: state.editor.consoleOutput
	}
}

export default connect(mapStateToProps)(Console)