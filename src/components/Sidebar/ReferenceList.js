import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome' 

import './sidebar.css'


class ReferenceList extends React.Component {

    render() {
        return (
            <ul className="referencelist">
                <li><FA name='external-link' /> <a href="#">http://...</a></li>
                <li><FA name='external-link' /> <a href="#">http://...</a></li>
                <li><FA name='external-link' /> <a href="#">http://...</a></li>
                <li><FA name='external-link' /> <a href="#">http://...</a></li>
            </ul>
        );
    }
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(ReferenceList)