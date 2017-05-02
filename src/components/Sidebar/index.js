import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'
import PartList from './PartList'
import ReferenceList from './ReferenceList'

import './sidebar.css'


class Sidebar extends React.Component {

    render() {
        // console.log( FontAwesome )

        return (
            <div className="main-sidebar">
                <a className='hamburger' href="#"><FA name='times' /></a>
                <h2>Workshop 1</h2>
                <PartList />
                <hr />
                <h2>Referenslänkar</h2>
                <ReferenceList />
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