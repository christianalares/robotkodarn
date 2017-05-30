import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

import { findWorkshopByPin } from './../../actions/login'

import styles from './login.css'

export class Login extends Component {
	constructor (props) {
		super(props)

		this.state = {
			pin: null
		}

		this.updatePin = this.updatePin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentWillReceiveProps(newProps) {
		// Input has changed and new response came
		// TODO: Check every time you press?
		if(newProps.currentWorkshop !== this.props.currentWorkshop) {
			const parsedWorkshop = JSON.parse(newProps.currentWorkshop)

			if(parsedWorkshop.pincode) {
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
		// this.props.dispatch(routeActions.push('/student/8907'))
		this.props.dispatch( findWorkshopByPin(this.state.pin) )
	}

	render () {
		return (
            <div className="screen">
                <div className={styles.wrapper}>
                    <h1 className={styles.logo}>Robotkodarn</h1>
                    <div className={styles.loginField}>
                        <input onChange={(e) => this.updatePin(e)} type="text" placeholder="Workshop PIN" />
                        <button onClick={this.handleSubmit} className="button primary">Logga in</button>
                    </div>
                </div>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		currentWorkshop: state.login.currentWorkshop
	}
}

export default connect(mapStateToProps)(Login)