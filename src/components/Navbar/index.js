import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import WorkshopPincode from './WorkshopPincode'

import styles from './navbar.css'

class Navbar extends React.Component {

    render() {
        return (
            <nav className={styles.mainNavbar}>
                <div className={styles.logoRobot}></div>
                <h3 className={styles.logo}>Robotkodarn</h3>
                <WorkshopPincode />
            </nav>
        );
    }
}

function mapStateToProps (state) {
	return {

	}
}

export default connect(mapStateToProps)(Navbar)
