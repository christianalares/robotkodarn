import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome'
import PartList from './PartList'
import ReferenceList from './ReferenceList'
import { closeSidebar, openSidebar } from '../../actions/sidebar'

import styles from './sidebar.css'

class Sidebar extends React.Component {

	constructor () {
		super()
		this.handleSidebarClick = this.handleSidebarClick.bind(this);
		this.getSidebarClassName = this.getSidebarClassName.bind(this);
	}

	handleSidebarClick () {
		if(this.props.isSidebarOpen) {
			this.props.dispatch(closeSidebar())
		} else {
			this.props.dispatch(openSidebar())
		}
	}


	getSidebarClassName() {
		if (this.props.isSidebarOpen) {
			return styles.mainSidebar
		} else {
			return styles.mainSidebar + ' ' + styles.mainSidebarClosed
		}
	}

	getCloseBtnClassName() {
		if (!this.props.isSidebarOpen) {
			return styles.rotated
		}
	}

	render () {
		return (
			<div className={this.getSidebarClassName()}>
				<div className="content">
					<h2>Workshop 1</h2>
					<PartList user={this.props.user} />
					<hr />
					<h2>Referenslänkar</h2>
					<ReferenceList user={this.props.user} />
				</div>
				<a className={styles.closeBtn} href="#" onClick={this.handleSidebarClick}><FA className={this.getCloseBtnClassName()} name='angle-double-left'/></a>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		isSidebarOpen: state.sidebar.open,
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Sidebar)