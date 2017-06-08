import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { isLoggedIn } from '../../actions/isLoggedIn'
import { createWorkshop } from '../../actions/createWorkshop'
import { getWorkshopsByUserId } from '../../actions/workshops'

import styles from './adminpage.css'

export class AdminPage extends Component {

    constructor(props) {
        super(props)

        this.getWorkshops = this.getWorkshops.bind(this)

        this.state = {
            title: null,
            pincode: null,
            userId: null,
            parts: [],
            links: []
        }
    }

    componentWillMount () {
        this.props.dispatch(isLoggedIn())
        this.props.dispatch( getWorkshopsByUserId() )
    }

    getWorkshops() {
        const workshops = this.props.userWorkshops

        return (
            <select multiple>
                {workshops.map(index => <option>{index.title}</option>)}
            </select>
        )
    }

    handleCreateWorkshop(e) {
        e.preventDefault()

        var newRandomPin = Math.floor(1000 + Math.random() * 9000)
        console.log(newRandomPin)
        
        this.setState({pincode: newRandomPin}, () => {
            this.props.dispatch( createWorkshop(this.state) )
            setTimeout(this.props.dispatch( getWorkshopsByUserId() ), 50)
        })
    }

	render () {
		return (
            <div className={styles.login}>
                <div>
                    {this.getWorkshops()}
                </div>
                <div>
                    <h1>Skapa ny workshop</h1>
                    <form onSubmit={this.handleCreateWorkshop.bind(this)}>
                        <label htmlFor="name">Workshop name</label>
                        <input ref="name" onChange={e => this.setState({title: e.target.value})} id="name" type="text" />
                        <input type="submit" value="Skapa workshop" />
                    </form>
                </div>
            </div>
        )
	}
}

function mapStateToProps (state) {
	return {
		userWorkshops: state.adminpage.userWorkshops
	}
}

export default connect(mapStateToProps)(AdminPage)