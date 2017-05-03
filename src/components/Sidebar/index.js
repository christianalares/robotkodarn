import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'
import PartList from './PartList'
import ReferenceList from './ReferenceList'

import styles from './sidebar.css'

class Sidebar extends React.Component {

    constructor() {
        super()
        this.onclick = this.onclick.bind(this);
    }

    onclick() {
    	let arrow = this.refs.button.children[0]
        let sidebar = this.refs.button.parentElement
        let mainPane = sidebar.nextElementSibling

        if (!sidebar.classList.contains('collapse')) {
        	arrow.style.animation = 'spinRight 1s 1 alternate'
        	arrow.style.animationFillMode = 'forwards'

        	sidebar.classList.add('collapse')
        	sidebar.style.marginLeft = '-316px'

        	mainPane.style.width = 'calc(100% - 34px)'
        } else {
        	arrow.style.animation = 'spinLeft 1s 1 alternate'

        	sidebar.classList.remove('collapse')
        	sidebar.style.marginLeft = '0'

        	mainPane.style.width = 'calc(100% - 350px)'
        }
    }

    render() {
        // console.log( FontAwesome )

        return (
            <div className={styles.mainSidebar}>
                <div className="content">
                    <h2>Workshop 1</h2>
                    <PartList user={this.props.user}/>
                    <hr />
                    <h2>Referenslänkar</h2>
                    <ReferenceList user={this.props.user} />
                </div>
                <a className={styles.hamburger} href="#" onClick={this.onclick} ref="button"><FA name='angle-double-left' /></a>
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