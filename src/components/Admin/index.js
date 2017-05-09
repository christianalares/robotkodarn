import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './admin.css'

export class Admin extends Component {
	constructor (props) {
		super(props)
        this.handleSubmit = this.handleSubmit.bind()
	}


    handleSubmit(e) {
        console.log(e)
        e.preventDefault()
        this.props.dispatch(signIn())
    }

	render () {

		return (
            <div>
                <form>
                    <label htmlFor="userName">Användarnamn</label>
                    <input id="userName" type="text" />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="text" />
                    <input type="submit" onClick={this.handleSubmit}/>
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
