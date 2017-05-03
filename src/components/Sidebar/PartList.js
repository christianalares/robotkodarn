import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FA from 'react-fontawesome' 

import styles from './sidebar.css'


class PartList extends React.Component {

    render() {
        return (
            <ul className={styles.partList}>
                <li className={styles.active}><FA name='file-code-o' /> <a href="#">Intro</a></li>
                <li><FA name='file-code-o' /> <a href="#">Motorer</a></li>
                <li><FA name='file-code-o' /> <a href="#">Sensorer</a></li>
                <li><FA name='file-code-o' /> <a href="#">LCD-display</a></li>
            </ul>
        );
    }
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(PartList)