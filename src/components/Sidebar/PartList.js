import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome' 

import styles from './sidebar.css'


class PartList extends React.Component {

    clickHandler() {
        let addButton = this.refs.addPart
        let listItem = addButton.parentElement
        let newElement = document.createElement('input')
        newElement.className = 'addInput'
        
        listItem.removeChild(addButton)
        listItem.appendChild(newElement)
    }

    render() {
        return (
            <ul className={styles.partList}>
                <li className={styles.active}><FA name='file-code-o' /> <a href="#">Intro</a></li>
                <li><FA name='file-code-o' /> <a href="#">Motorer</a></li>
                <li><FA name='file-code-o' /> <a href="#">Sensorer</a></li>
                <li><FA name='file-code-o' /> <a href="#">LCD-display</a></li>
                { this.props.user === 'teacher' && (<li><FA name='plus' /> <a ref="addPart" href="#" onClick={this.clickHandler.bind(this)}>Lägg till...</a></li>) }
            </ul>
        );
    }
}

function mapStateToProps (state) {
	return {
		
	}
}

export default connect(mapStateToProps)(PartList)