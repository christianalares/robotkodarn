import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome' 

import styles from './sidebar.css'


class ReferenceList extends React.Component {

    renderLinks() {
        return this.props.links.map(link => {
            return (<li key={link._id}><FA name='external-link' /> <a href={link.url}>{link.title}</a></li>)
        })
    }

    render() {
        return (
            <ul className={styles.referenceList}>
                { this.renderLinks() }
                {/*{ this.props.user === 'teacher' && (<li><FA name='plus' /> <a href="#">Lägg till...</a></li>) }*/}
            </ul>
        );
    }
}

function mapStateToProps (state) {
	return {
		
	}
}

export default connect(mapStateToProps)(ReferenceList)