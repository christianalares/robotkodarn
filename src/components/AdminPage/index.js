import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { isLoggedIn } from '../../actions/isLoggedIn'
import { createWorkshop } from '../../actions/createWorkshop'
import { getWorkshopsByUserId, setSelectedWorkshop, removeSelectedWorkshop, addPart } from '../../actions/workshops'

import styles from './adminpage.css'

export class AdminPage extends Component {

    constructor(props) {
        super(props)

        this.renderListWithWorkshops    =   this.renderListWithWorkshops.bind(this)
        this.handleRemoveWorkshop       =   this.handleRemoveWorkshop.bind(this)
        this.handleSelectWorkshop       =   this.handleSelectWorkshop.bind(this)
        this.handleCreateWorkshop       =   this.handleCreateWorkshop.bind(this)
        this.getSelectedTitle           =   this.getSelectedTitle.bind(this)

        this.state = {
            title: null,
            pincode: null,
            userId: null,
            parts: [],
            links: [],
            partTitle: null,
            code: null
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
            setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 150) // wait for workshop to be created then get workshops again
        })
    }

    handleSelectWorkshop() {
        const index = this.refs.select.selectedIndex
        const name = this.refs.select.value

        this.props.dispatch(setSelectedWorkshop(index))
    }

    handleRemoveWorkshop(e) {
        e.preventDefault()
        const index = this.props.selectedIndex
        const selectedWorkshop = this.props.userWorkshops[index]

        if (confirm('Vill du verkligen ta bort ' + this.getSelectedTitle() + '?')) {
            this.props.dispatch(removeSelectedWorkshop(selectedWorkshop))
            setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 150) // wait for workshop to be created then get workshops again
        }
    }

    renderListWithWorkshops() {
        const workshops = this.props.userWorkshops

        return (
            <select ref="select" onChange={this.handleSelectWorkshop} multiple>
                {workshops.map(index => <option>{index.title}</option>)}
            </select>
        )
    }

    handleAddPart(e) {
        e.preventDefault()

        var credentials = {
            title: this.state.partTitle,
            code: this.state.code
        }
        // this.state.value
        this.props.dispatch(addPart(credentials, this.props.userWorkshops[this.props.selectedIndex]._id))
        setTimeout(this.props.dispatch(getWorkshopsByUserId()), 150)
    }

    getSelectedTitle() {
        if(this.props.selectedIndex != null) {
            const index = this.props.selectedIndex
            const selectedWorkshop = this.props.userWorkshops[index]

            return selectedWorkshop.title // Returns title of selected workshop
        }
    }

	render() {
		return (
            <div className={styles.login}>
                <header><h5>Exempelmeddelande</h5></header>
                <div className={styles.list}>
                    <h3>Skapa ny workshop</h3>
                    <form onSubmit={this.handleCreateWorkshop.bind(this)}>
                        <label htmlFor="name">Namn på workshop</label>
                        <input ref="name" onChange={e => this.setState({title: e.target.value})} id="name" type="text" />
                        <input type="submit" value="Skapa workshop" />
                    </form>
                    <h3>Dina workshops</h3>
                    {this.renderListWithWorkshops()}
                </div>
                <div className={styles.input}>
                    <h3>Ändra workshop</h3>
                    {this.getSelectedTitle() != null ?
                        <div>
                            <form onSubmit={this.handleRemoveWorkshop}>
                                <input type="submit" value="Ta bort" />
                            </form>
                            <h3>Lägg till delmoment</h3>
                            <form onSubmit={this.handleAddPart.bind(this)}>
                                <label>Titel</label>
                                <input onChange={e => this.setState({partTitle: e.target.value})} type="text" />
                                <label>Kod</label>
                                <textarea onChange={e => this.setState({code: e.target.value})} ></textarea>
                                <input type="submit" value="Spara" />
                            </form>
                        </div> : <h5>Markera en workshop för att ändra</h5>}
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