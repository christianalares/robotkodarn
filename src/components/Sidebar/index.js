import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './sidebar.css'


class Sidebar extends React.Component {

    render() {
        return (
            <div className="main-sidebar">
                <h2>Sidebar</h2>
            </div>
        );
    }
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Sidebar)