import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../actions/authenticate.js'

import styles from './admin.css'

export class Admin extends Component {
	constructor (props) {
		super(props)

        this.state = {
            username: null,
            password: null
        }
	}

    handleSubmit(e) {
        e.preventDefault()

        this.props.dispatch(signIn(this.state, '/teacher'))
    }

	render () {

		return (
            <div className={styles.login}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="userName">Användarnamn</label>
                    <input ref="username" onChange={e => this.setState({username: e.target.value})} id="userName" type="text" />
                    <label htmlFor="password">Password</label>
                    <input ref="password" onChange={e => this.setState({password: e.target.value})} id="password" type="text" />
                    <input type="submit" />
                </form>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		// items: state.items.list
	}
}

export default connect(mapStateToProps)(Admin)
