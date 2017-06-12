import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { isLoggedIn } from '../../actions/isLoggedIn'
import { createWorkshop, 
         getWorkshopsByUserId, 
         setSelectedWorkshop,
         setSelectedPart,
         setSelectedLink, 
         removeSelectedWorkshop,
         removeSelectedPart, 
         removeSelectedLink,
         addPart, 
         addLink,
         changeTitle } from '../../actions/workshops'
import { signOut } from '../../actions/auth'

import styles from './adminpage.css'

export class AdminPage extends Component {

    constructor(props) {
        super(props)

        this.renderListWithWorkshops    =   this.renderListWithWorkshops.bind(this)
        this.renderListWithParts        =   this.renderListWithParts.bind(this)
        this.handleRemoveWorkshop       =   this.handleRemoveWorkshop.bind(this)
        this.handleSelectWorkshop       =   this.handleSelectWorkshop.bind(this)
        this.handleCreateWorkshop       =   this.handleCreateWorkshop.bind(this)
        this.getSelectedTitle           =   this.getSelectedTitle.bind(this)
        this.getSelectedPincode         =   this.getSelectedPincode.bind(this)
        this.handleCreateLink           =   this.handleCreateLink.bind(this)
        this.logOut                     =   this.logOut.bind(this)
        this.handleChangeWorkshopTitle  =   this.handleChangeWorkshopTitle.bind(this)
        this.renderListWithLinks        =   this.renderListWithLinks.bind(this)
        this.handleSelectWorkshopPart   =   this.handleSelectWorkshopPart.bind(this)
        this.handleSelectWorkshopLink   =   this.handleSelectWorkshopLink.bind(this)
        this.handleRemovePart           =   this.handleRemovePart.bind(this)
        this.handleRemoveLink           =   this.handleRemoveLink.bind(this)

        this.state = {
            title: null,
            pincode: null,
            userId: null,
            parts: [],
            links: [],
            partTitle: null,
            code: null,
            linkTitle: null,
            url: null,
            newTitle: null,
            addWorkshop: false,
            addPart: false,
            addLink: false
        }
    }

    componentWillMount() {
        this.props.dispatch(isLoggedIn('/adminpage')) // Check if user is logged in else return user to login
        this.props.dispatch(getWorkshopsByUserId()) // Get associated workshops
    }

    handleSelectWorkshop(e) {
        const index = e.target.selectedIndex
        this.props.dispatch(setSelectedWorkshop(index)) // Set selectedWorkshopIndex state
    }

    handleSelectWorkshopPart(e) {
        const index = e.target.selectedIndex
        this.props.dispatch(setSelectedPart(index)) // Set selectedPartIndex state
    }

    handleSelectWorkshopLink(e) {
        const index = e.target.selectedIndex
        this.props.dispatch(setSelectedLink(index)) // Set selectedLinkIndex state
    }

    handleCreateWorkshop(e) {
        e.preventDefault()
        var newRandomPin = Math.floor(1000 + Math.random() * 9000) // Generate a 4-pin code example: 4576
        
        this.setState({
            pincode: newRandomPin,
            addWorkshop: false
        }, () => {
            this.props.dispatch(createWorkshop(this.state))
            setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 300) // wait for workshop to be created then get workshops again
        })
    }

    handleRemoveWorkshop(e) {
        e.preventDefault()

        const index = this.props.selectedWorkshopIndex
        const selectedWorkshop = this.props.userWorkshops[index]

        if (confirm(`Vill du verkligen ta bort ${this.getSelectedTitle()}?`)) {
            this.props.dispatch(removeSelectedWorkshop(selectedWorkshop))
            setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 300) // wait for workshop to be created then get workshops again
        }
    }

    handleAddPart(e) {
        e.preventDefault()

        let credentials = {
            title: this.state.partTitle,
            code: this.state.code
        }

        const index = this.props.selectedWorkshopIndex
        const selectedWorkshop = this.props.userWorkshops[index]

        this.props.dispatch(addPart(credentials, selectedWorkshop))
        setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 300)
        this.setState({addPart: false})
    }

    handleRemovePart() {

        const index = this.props.selectedWorkshopIndex
        const partIndex = this.props.selectedPartIndex
        const selectedWorkshop = this.props.userWorkshops[index]
        const part = selectedWorkshop.parts[partIndex]

        if (confirm(`Vill du verkligen ta bort ${part.title}?`)) {
            this.props.dispatch(removeSelectedPart(part, selectedWorkshop))
            setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 300)
        }
    }

    handleRemoveLink() {

        const index = this.props.selectedWorkshopIndex
        const linkIndex = this.props.selectedLinkIndex
        const selectedWorkshop = this.props.userWorkshops[index]
        const link = selectedWorkshop.links[linkIndex]

        if (confirm(`Vill du verkligen ta bort ${link.title}?`)) {
            this.props.dispatch(removeSelectedLink(link, selectedWorkshop))
            setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 300)
        }
    }

    handleCreateLink(e) {
        e.preventDefault()

        const index = this.props.selectedWorkshopIndex
        const selectedWorkshop = this.props.userWorkshops[index]

        let credentials = {
            title: this.state.linkTitle,
            url: this.state.url
        }

        this.props.dispatch(addLink(credentials, selectedWorkshop))
        setTimeout(() => this.props.dispatch(getWorkshopsByUserId()), 300)
        this.setState({addLink: false})
    }

    getSelectedTitle() {
        if(this.props.selectedWorkshopIndex != null) {
            const index = this.props.selectedWorkshopIndex
            const selectedWorkshop = this.props.userWorkshops[index]

            return selectedWorkshop.title // Returns title of selected workshop
        }
    }

    getSelectedPincode() {
        if(this.props.selectedWorkshopIndex != null) {
            const index = this.props.selectedWorkshopIndex
            const selectedWorkshop = this.props.userWorkshops[index]

            return selectedWorkshop.pincode // Returns title of selected workshop
        }
    }

    logOut() {
        this.props.dispatch(signOut('/admin'))
    }

    handleChangeWorkshopTitle(e) {
        e.preventDefault()

        const index = this.props.selectedWorkshopIndex
        const selectedWorkshop = this.props.userWorkshops[index]
        const credentials = { title: this.state.newTitle }

        this.props.dispatch(changeTitle(credentials, selectedWorkshop))
        setTimeout(this.props.dispatch(getWorkshopsByUserId()), 300)
    }

    renderListWithWorkshops() {
        const workshops = this.props.userWorkshops

        return (
            <div>
                <h3>Dina workshops</h3>
                <select onChange={this.handleSelectWorkshop} multiple size="6">
                    {workshops.map(i => <option key={i._id}>{i.title}</option>)}
                </select>
                {this.state.addWorkshop == true ? 
                <div>
                    <h3>Skapa ny workshop</h3>
                    <form onSubmit={this.handleCreateWorkshop.bind(this)}>
                        <label htmlFor="name">Namn på workshop</label>
                        <input ref="name" onChange={e => this.setState({title: e.target.value})} id="name" type="text" />
                        <input type="submit" value="Skapa workshop" />
                    </form>
                </div> : <input type="button" onClick={() => {this.state.addWorkshop == false ? this.setState({addWorkshop: true}) : null}} value="Lägg till" />}
            </div>
        )
    }

    renderListWithParts() {
        if(this.props.selectedWorkshopIndex != null) {

            const index = this.props.selectedWorkshopIndex
            const selectedWorkshop = this.props.userWorkshops[index]

            return (
                <div>
                    <h3>Delmoment till {this.props.userWorkshops[index].title}</h3>
                    <select onChange={this.handleSelectWorkshopPart} multiple size="6">
                        {selectedWorkshop.parts.map(i => <option key={i._id}>{i.title}</option>)}
                    </select>
                    {this.state.addPart == true ? 
                    <div>
                        <h3>Lägg till delmoment</h3>
                        <form onSubmit={this.handleAddPart.bind(this)}>
                            <label>Titel</label>
                            <input onChange={e => this.setState({partTitle: e.target.value})} type="text" />
                            <label>Kod</label>
                            <textarea onChange={e => this.setState({code: e.target.value})} ></textarea>
                            <input type="submit" value="Spara" />
                        </form> 
                    </div> :
                    <div>
                        <input type="button" onClick={() => {this.state.addLink == false ? this.setState({addPart: true}) : null}} value="Lägg till" />
                        <input type="button" onClick={() => this.handleRemovePart()} value="Ta bort" />
                    </div>}
                </div>
            )
        }
    }

    renderListWithLinks() {
        if(this.props.selectedWorkshopIndex != null) {

            const index = this.props.selectedWorkshopIndex
            const selectedWorkshop = this.props.userWorkshops[index]

            return (
                <div>
                    <h3>Länkar till {this.props.userWorkshops[index].title}</h3>
                    <select onChange={this.handleSelectWorkshopLink} multiple size="6">
                        {selectedWorkshop.links.map(i => <option key={i._id}>{i.title}</option>)}
                    </select>
                    {this.state.addLink == true ? 
                        <div>
                        <h3>Lägg till referenslänk</h3>
                            <form onSubmit={this.handleCreateLink.bind(this)}>
                                <label>Titel</label>
                                <input onChange={e => this.setState({linkTitle: e.target.value})} type="text" />
                                <label>URL</label>
                                <input type="url" onChange={e => this.setState({url: e.target.value})} />
                                <input type="submit" value="Spara" />
                            </form>
                        </div> : 
                        <div>
                            <input type="button" onClick={() => this.state.addLink == false ? this.setState({addLink: true}) : this.setState({addLink: false})} value="Lägg till" />
                            <input type="button" onClick={() => this.handleRemoveLink()} value="Ta bort" />
                        </div>}
                </div>
            )
        }
    }

	render() {
		return (
            <div className={styles.login}>
                <header className={styles.header}><h5>{this.props.message}</h5><button onClick={this.logOut}>Logga ut</button></header>
                <div className={styles.list}>
                    {this.renderListWithWorkshops()}
                    {this.props.selectedWorkshopIndex != null ? <input type="submit" value="Ta bort" /> : ''}
                    {this.renderListWithParts()}
                    {this.renderListWithLinks()}
                </div>
                <div className={styles.input}>
                    <h3>Ändra {this.getSelectedTitle()}</h3>
                    {this.getSelectedTitle() != null ?
                        <div>
                            <form onSubmit={this.handleChangeWorkshopTitle}>
                                <a href={`/id/${this.getSelectedPincode()}`}>Gå till workshop</a>
                                <label>Pinkod</label>
                                <input type="text" value={this.getSelectedPincode()} disabled />
                                <label>Titel</label>
                                <input type="text" placeholder={this.getSelectedTitle()} onChange={e => this.setState({newTitle: e.target.value})} />
                                <input type="submit" value="Uppdatera" />
                            </form>
                        </div> : <h5>Välj en workshop för att ändra</h5>}
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
		userWorkshops: state.adminpage.userWorkshops,
        selectedWorkshopIndex: state.adminpage.selectedWorkshopIndex,
        selectedPartIndex: state.adminpage.selectedPartIndex,
        selectedLinkIndex: state.adminpage.selectedLinkIndex,
        message: state.adminpage.message
	}
}

export default connect(mapStateToProps)(AdminPage)