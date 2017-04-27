import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import styles from './editor.css'

import 'brace/mode/c_cpp'
import 'brace/theme/monokai'

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
				fontSize="18px"
				mode="c_cpp"
				theme="monokai"
				onChange={onChange}
				name="UNIQUE_ID_OF_DIV"
				editorProps={{$blockScrolling: true}}
				value={helloWorld}
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
