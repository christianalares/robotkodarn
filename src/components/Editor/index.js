import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
// import styles from './style.css'

import 'brace/mode/c_cpp'
import 'brace/theme/twilight'
import sample from 'json!../../data/sample.json'

function onChange(newValue) {
	console.log('change', newValue);
}

export class Editor extends Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<AceEditor
			    mode="c_cpp"
			    theme="twilight"
			    onChange={onChange}
			    name="UNIQUE_ID_OF_DIV"
			    editorProps={{$blockScrolling: true}}
			    value="sample"
			/>
		)
	}
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Editor)