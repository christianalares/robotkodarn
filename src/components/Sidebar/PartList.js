import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome' 

import { setActivePartIndex } from '../../actions/editor'

import styles from './sidebar.css'


class PartList extends React.Component {

    changePart(index) {
        this.props.dispatch( setActivePartIndex(index) )
    }

    renderParts() {
        return this.props.parts.map( (part, index) => {
            return (<li key={part._id}><FA name='file-code-o' /><a onClick={() => this.changePart(index)} href="#">{part.title}</a></li>)
        } )
    }

    render() {
        return (
            <ul className={styles.partList}>
                {this.renderParts()}
                {/*{ this.props.user === 'teacher' && (<li><FA name='plus' /> <a ref="addPart" href="#" onClick={}>Lägg till...</a></li>) }*/}
            </ul>
        );
    }
}

function mapStateToProps (state) {
	return {
		
	}
}

export default connect(mapStateToProps)(PartList)