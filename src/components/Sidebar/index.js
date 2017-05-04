import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'
import PartList from './PartList'
import ReferenceList from './ReferenceList'
import { closeSidebar } from '../../actions/sidebar'

import styles from './sidebar.css'

class Sidebar extends React.Component {

	constructor () {
		super()
		this.handleOnClick = this.handleOnClick.bind(this);
		this.getSidebarClassName = this.getSidebarClassName.bind(this);
	}

	handleOnClick () {
		this.props.dispatch(closeSidebar())
	}


	getSidebarClassName() {
		console.log('getSidebarClassName')
		if (this.props.isSidebarOpen) {
			console.log('OPEN')
			return styles.mainSidebar
		} else {
			console.log('CLOSE')
			return styles.mainSidebarClosed
		}
	}

	render () {
		// console.log( FontAwesome )
		//console.log(11111, this.props.isSidebarOpen, this.getSidebarClassName)
		return (
			<div className={this.getSidebarClassName()}>
				<div className="content">
					<h2>Workshop 1</h2>
					<PartList user={this.props.user}/>
					<hr />
					<h2>Referenslänkar</h2>
					<ReferenceList user={this.props.user}/>
				</div>
				<a className={styles.hamburger} href="#" onClick={this.handleOnClick} ref="button"><FA
					name='angle-double-left'/></a>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		isSidebarOpen: state.sidebar.open,
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Sidebar)