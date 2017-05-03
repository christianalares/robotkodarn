import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import WorkshopPincode from './WorkshopPincode'

import styles from './navbar.css'

class Navbar extends React.Component {

    render() {
        return (
            <nav className={styles.mainNavbar}>
                <div className={styles.logoRobot}></div>
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