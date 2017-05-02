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

	// handleTabClick() {
	// 	console.log( 'handleTabClick' )
	// }

	render () {
		return (
			<div className="code-wrapper">
				<ul>
					<li className="active"><a href="#">Din kod</a></li>
					<li><a href="#">Original</a></li>
				</ul>

				<AceEditor
					fontSize="16px"
					mode="c_cpp"
					theme="chrome"
					onChange={onChange}
					name="code-editor"
					width="auto"
					height="90%"
					editorProps={{$blockScrolling: true}}
					value={helloWorld}
					showPrintMargin={false}
				/>
			</div>

		)
	}
}

function mapStateToProps (state) {
	return {
		items: state.items.list
	}
}

export default connect(mapStateToProps)(Editor)
