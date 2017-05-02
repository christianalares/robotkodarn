import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import WorkshopPincode from './WorkshopPincode'

import './navbar.css'

class Navbar extends React.Component {

    render() {
        return (
            <nav className="main-navbar">
                {/*<a className="logo" href="#">🤖</a>*/}
                <div className="logo-robot"></div>
                <WorkshopPincode />
            </nav>
        );
    }
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Navbar)