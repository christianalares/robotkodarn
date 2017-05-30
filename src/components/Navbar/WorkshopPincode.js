import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './navbar.css'

class WorkshopPincode extends React.Component {

    render() {
        return (
            <p className={styles.workshopPinCode}>
                {this.props.pincode}
            </p>
        );
    }
}

function mapStateToProps (state) {
	return {
		
	}
}

export default connect(mapStateToProps)(WorkshopPincode)