import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './login.css'

export class Login extends Component {
	constructor (props) {
		super(props)
	}

	render () {

		return (
            <div className="screen">
                <div className={styles.wrapper}>
                    <h1 className={styles.logo}>Robotkodarn</h1>
                    <div className={styles.loginField}>
                        <input type="text" placeholder="Workshop PIN" />
                        <button className="button primary">Logga in</button>
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