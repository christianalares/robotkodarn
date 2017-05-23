import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

import styles from './login.css'

export class Login extends Component {
	constructor (props) {
		super(props)
	}

	handleSubmit() {
		this.props.dispatch(routeActions.push('/student/8907'))
	}

	render () {

		return (
            <div className="screen">
                <div className={styles.wrapper}>
                    <h1 className={styles.logo}>Robotkodarn</h1>
                    <div className={styles.loginField}>
                        <input type="text" placeholder="Workshop PIN" />
                        <button onClick={ this.handleSubmit.bind(this) } className="button primary">Logga in</button>
                    </div>
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

export default connect(mapStateToProps)(Login)