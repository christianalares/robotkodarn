import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'
import PartList from './PartList'
import ReferenceList from './ReferenceList'

import styles from './sidebar.css'


class Sidebar extends React.Component {

    constructor() {
        super()
    }

    onclick() {
        let sidebar = this.refs.button.parentElement
        sidebar.style.marginLeft = '-316px'

        let mainPane = sidebar.nextElementSibling
        mainPane.style.width = "calc(100% - 34px)"
    }

    render() {
        // console.log( FontAwesome )

        return (
            <div className={styles.mainSidebar}>
                <div className="content">
                    <h2>Workshop 1</h2>
                    <PartList />
                    <hr />
                    <h2>Referenslänkar</h2>
                    <ReferenceList />
                </div>
                <a className={styles.hamburger} href="#" onClick={this.onclick.bind(this)} ref="button"><FA name='angle-double-left' /></a>
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