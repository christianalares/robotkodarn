import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

import { findWorkshopByPin } from './../../actions/login'

import styles from './login.css'
import animate from './../../animate.css'

export class Login extends Component {
	constructor (props) {
		super(props)

		this.state = {
			pin: null,
			workshopNotFound: false,
			inputClassName: ''
		}

		this.updatePin = this.updatePin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillReceiveProps(newProps) {
		// Input has changed and new response came
		// TODO: Check every time you press?
		if(newProps.loginAttemptTimestamp !== this.props.loginAttemptTimestamp) {
			if(newProps.currentWorkshop === 'notfound' || this.props.currentWorkshop === 'notfound') {
				this.setState({
					workshopNotFound: true,
					inputClassName: 'animated shake'
				})
			} else {
				this.setState({ workshopNotFound: false })
				
				const parsedWorkshop = JSON.parse(newProps.currentWorkshop)
				this.props.dispatch( routeActions.push('/id/' + parsedWorkshop.pincode) )
			}

		}
	}

	updatePin(e) {
		this.setState({
			pin: e.target.value
		})
	}
	handleSubmit() {
		this.setState({ inputClassName: '' })
		this.props.dispatch( findWorkshopByPin(this.state.pin) )
	}

	render () {
		return (
            <div className="screen">
                <div className={styles.wrapper}>
                    <h1 className={styles.logo}>Robotkodarn</h1>
                    <div className={styles.loginField}>
                        <input className={this.state.inputClassName} required onChange={(e) => this.updatePin(e)} type="text" placeholder="Workshop PIN" />
                        <button onClick={this.handleSubmit} className="button primary">Logga in</button>
                    </div>
                </div>
				{ this.state.workshopNotFound && <p className={styles.workshopNotFound}>Kunde inte hitta någon workshop med denna PIN-kod</p> }
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		currentWorkshop: state.login.currentWorkshop,
		loginAttemptTimestamp: state.login.loginAttemptTimestamp
	}
}

export default connect(mapStateToProps)(Login)