import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './console.css'

export class Console extends Component {
	render() {
		return (
			<div>
				<h4>Konsol</h4>
            	<pre className='console'></pre>
            </div>
		)
	}
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Console)