import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { isLoggedIn } from '../../actions/isLoggedIn'
import { createWorkshop } from '../../actions/createWorkshop'
import { getWorkshopsByUserId, setSelectedWorkshop, removeSelectedWorkshop } from '../../actions/workshops'

import styles from './adminpage.css'

export class AdminPage extends Component {

    constructor(props) {
        super(props)

        this.renderListWithWorkshops = this.renderListWithWorkshops.bind(this)
        this.handleRemoveWorkshop = this.handleRemoveWorkshop.bind(this)
        this.handleSelectWorkshop = this.handleSelectWorkshop.bind(this)

        this.state = {
            title: null,
            pincode: null,
            userId: null,
            parts: [],
            links: []
        }
    }

    componentWillMount() {
        this.props.dispatch(isLoggedIn()) // Check if user is logged in else return user to /admin
        this.props.dispatch(getWorkshopsByUserId()) // Get associated workshops
    }

    handleCreateWorkshop(e) {
        e.preventDefault()

        var newRandomPin = Math.floor(1000 + Math.random() * 9000) // Generate a 4-pin code example: 4576
        
        this.setState({pincode: newRandomPin}, () => {
            this.props.dispatch(createWorkshop(this.state))
            setTimeout(this.props.dispatch( getWorkshopsByUserId() ), 50) // wait for workshop to be created then get workshops again
        })
    }

    handleSelectWorkshop() {
        const index = this.refs.select.selectedIndex
        const name = this.refs.select.value

        this.props.dispatch(setSelectedWorkshop(index))
    }

    handleRemoveWorkshop() {
        const index = this.props.selectedIndex
        const selectedWorkshop = this.props.userWorkshops[index]
        console.log(selectedWorkshop._id)

        // this.props.dispatch(removeSelectedWorkshop(this.props.selectedIndex))
    }

    renderListWithWorkshops() {
        const workshops = this.props.userWorkshops

        return (
            <select ref="select" onChange={this.handleSelectWorkshop} multiple>
                {workshops.map(index => <option>{index.title}</option>)}
            </select>
        )
    }

	render() {
		return (
            <div className={styles.login}>
                <div>
                    {this.renderListWithWorkshops()}
                </div>
                <div>
                    <button onClick={this.handleRemoveWorkshop}>Ta bort</button>
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

function mapStateToProps(state) {
	return {
		userWorkshops: state.adminpage.userWorkshops,
        selectedIndex: state.adminpage.selectedIndex
	}
}

export default connect(mapStateToProps)(AdminPage)