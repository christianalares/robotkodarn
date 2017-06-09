import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { isLoggedIn } from '../../actions/isLoggedIn'
import { createWorkshop } from '../../actions/createWorkshop'
import { getWorkshopsByUserId, addPart } from '../../actions/workshops'

import styles from './adminpage.css'

export class AdminPage extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.getWorkshops = this.getWorkshops.bind(this)

        this.state = {
            title: null,
            pincode: null,
            userId: null,
            parts: [],
            links: [],
            partTitle: null,
            part: null,
            value: "",
            wsName: ""
        }
    }

    componentWillMount () {
        this.props.dispatch(isLoggedIn())
        this.props.dispatch( getWorkshopsByUserId() )
    }

    getWorkshops() {
        const workshops = this.props.userWorkshops

        return (
            <select multiple value={this.state.value} onChange={this.handleChange}>
                {workshops.map(index => <option value={index._id}>{index.title}</option>)}
            </select>
        )
    }

    handleChange(event) {
      const workshops = this.props.userWorkshops
      var wsName = workshops.find(item => item._id == event.target.value)
      console.log(wsName.title)
      this.setState({value: event.target.value, wsName: wsName.title});
    }

    handleCreateWorkshop(e) {
        e.preventDefault()

        var newRandomPin = Math.floor(1000 + Math.random() * 9000)
        console.log(newRandomPin)

        this.setState({pincode: newRandomPin}, () => {
            var credentials = {
                title: this.state.title,
                pincode: this.state.pincode,
                userId: this.state.userId,
                parts: this.state.parts,
                links: this.state.links
            }
            this.props.dispatch( createWorkshop(credentials) )
            setTimeout(this.props.dispatch( getWorkshopsByUserId() ), 50)
        })
    }

    handleAddPart(e) {
        e.preventDefault()

            var credentials = {
                title: this.state.partTitle,
                code: this.state.part
            }
            this.props.dispatch( addPart(credentials, this.state.value) )
            setTimeout(this.props.dispatch( getWorkshopsByUserId() ), 50)
    }

	render () {
		return (
            <div className={styles.login}>
                <div>
                    {this.getWorkshops()}
                </div>
                <h4>{this.state.wsName}</h4>
                <div>
                    <h1>Skapa ny workshop</h1>
                    <form onSubmit={this.handleCreateWorkshop.bind(this)}>
                        <label htmlFor="name">Workshop name</label>
                        <input ref="name" onChange={e => this.setState({title: e.target.value})} id="name" type="text" />
                        <input type="submit" value="Skapa workshop" />
                    </form>
                </div>
                <div>
                  <h2>Lägg till delmoment</h2>
                  <form onSubmit={this.handleAddPart.bind(this)}>
                    <label>Titel</label>
                    <input onChange={e => this.setState({partTitle: e.target.value})} type="text" />
                    <label>Kod</label>
                    <textarea onChange={e => this.setState({part: e.target.value})} ></textarea>
                    <input type="submit" value="Lägg till kod" />
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
