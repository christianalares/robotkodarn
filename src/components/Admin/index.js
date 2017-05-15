import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { signIn } from '../../actions/auth.js'
import { toggleUserRegister } from '../../actions/admin'
import { registerUser } from '../../actions/admin'
import { getSalt } from '../../actions/admin'

import bcrypt from 'bcryptjs'

import styles from './admin.css'

export class Admin extends Component {
	constructor (props) {
		super(props)

        this.state = {
            email: null,
            password: null,
            nameRegister: null,
            emailRegister: null,
            passwordRegister: null,
            fetchedUser: null,
        }
	}

    componentWillReceiveProps(nextProps) {
        if(nextProps.user !== this.props.user) {
            this.checkPassword(nextProps.user[0])
        }
    }

    checkPassword(user) {
        bcrypt.hash(this.state.password, user.salt, (err, hash) => {
            console.log('this.state.password: ', this.state.password)
            console.log('user.salt....: ', user.salt)
            console.log('user.password: ', user.password)
            console.log('hash.........: ', hash)

            bcrypt.compare(this.state.password, hash, (err, result) => {
                console.log(result)
            })
        })

    }
    
    handleSubmit(e) {
        e.preventDefault()

        var credentials = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(getSalt({email: credentials.email}))
    }

    handleRegisterSubmit(e) {
        e.preventDefault()

        bcrypt.genSalt(10, (error, result) => {

            bcrypt.hash(this.state.password, result, (err, hash) => {

                console.log(result, hash)

                var credentials = {
                    name: this.state.registerName,
                    password: hash,
                    salt: result,
                    email: this.state.registerEmail,
                }

                console.log( credentials )
                // this.props.dispatch( registerUser(credentials) )
            })

        })
        

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
                        <label htmlFor="email">Email</label>
                        <input ref="email" onChange={e => this.setState({email: e.target.value})} id="email" type="email" />
                        <label htmlFor="password">Lösenord</label>
                        <input ref="password" onChange={e => this.setState({password: e.target.value})} id="password" type="text" />
                        <input type="submit" value="Logga in" />
                    </form>
                    <a href="#" onClick={() => this.handleClick('register')}>Registrera ny användare...</a>
                </div>
            )
        } else {
            return (
                <div className={styles.login}>
                    <h1>Registrera ny användare</h1>
                    <form onSubmit={this.handleRegisterSubmit.bind(this)}>
                        <label htmlFor="name">För och efternamn</label>
                        <input ref="name" onChange={e => this.setState({registerName: e.target.value})} id="name" type="text" />

                        <label htmlFor="email">Email</label>
                        <input ref="email" onChange={e => this.setState({registerEmail: e.target.value})} id="email" type="text" />
                        
                        <label htmlFor="password">Lösenord</label>
                        <input ref="password" onChange={e => this.setState({registerPassword: e.target.value})} id="password" type="text" />
                        <input type="submit" value="Registrera" />
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
		loginOrRegister: state.admin.loginOrRegister,
		user: state.admin.user,
	}
}

export default connect(mapStateToProps)(Admin)