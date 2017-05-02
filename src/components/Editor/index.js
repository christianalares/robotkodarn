import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import 'brace/mode/c_cpp'
import 'brace/theme/monokai'

import styles from './editor.css'

const helloWorld = `// my first program in C++
#include <iostream>

int main()
{
	std::cout << "Hello World!";
}`

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
				fontSize="16px"
				mode="c_cpp"
				theme="chrome"
				onChange={onChange}
				name="code-editor"
				width="auto"
				height="55%"
				editorProps={{$blockScrolling: true}}
				value={helloWorld}
				showPrintMargin={false}
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
