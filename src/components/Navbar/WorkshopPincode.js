import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class WorkshopPincode extends React.Component {

    render() {
        return (
            <p className="workshop-pin-code">
                8907
            </p>
        );
    }
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(WorkshopPincode)