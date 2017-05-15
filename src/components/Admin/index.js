import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { signIn } from '../../actions/auth.js'
import { toggleUserRegister } from '../../actions/admin'

import styles from './admin.css'

export class Admin extends Component {
	constructor (props) {
		super(props)

        this.state = {
            username: null,
            password: null,
            usernameRegister: null,
            passwordRegister: null,
            emailRegister: null
        }
	}

    handleSubmit(e) {
        e.preventDefault()

        this.props.dispatch(signIn(this.state, '/teacher'))
    }

    handleRegisterSubmit(e) {
        e.preventDefault()
    }

    handleClick(loginOrRegister) {
        this.props.dispatch( toggleUserRegister(loginOrRegister) )
    }

    renderContent() {
        if (this.props.loginOrRegister === 'login') {
            return (
                <div className={styles.login}>
                    <h1>Logga in</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label htmlFor="userName">Användarnamn</label>
                        <input ref="username" onChange={e => this.setState({username: e.target.value})} id="userName" type="text" />
                        <label htmlFor="password">Lösenord</label>
                        <input ref="password" onChange={e => this.setState({password: e.target.value})} id="password" type="text" />
                        <input type="submit" />
                    </form>
                    <a href="#" onClick={() => this.handleClick('register')}>Registrera ny användare...</a>
                </div>
            )
        } else {
            return (
                <div className={styles.login}>
                    <h1>Registrera ny användare</h1>
                    <form onSubmit={this.handleRegisterSubmit.bind(this)}>
                        <label htmlFor="userName">Användarnamn</label>
                        <input ref="username" onChange={e => this.setState({usernameRegister: e.target.value})} id="userName" type="text" />
                        <label htmlFor="password">Lösenord</label>
                        <input ref="password" onChange={e => this.setState({passwordRegister: e.target.value})} id="password" type="text" />
                        <label htmlFor="email">E-mail</label>
                        <input ref="email" onChange={e => this.setState({emailRegister: e.target.value})} id="email" type="text" />
                        <input type="submit" />
                    </form>
                    <a href="#" onClick={() => this.handleClick('login')}>Tillbaka till inloggning...</a>
                </div>
            )
        }
    }

	render () {

		return (
            <div>
                {this.renderContent()}
            </div>
        )
	}
}

function mapStateToProps (state) {
	return {
		loginOrRegister: state.admin.loginOrRegister
	}
}

export default connect(mapStateToProps)(Admin)
