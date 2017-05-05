import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import 'brace/mode/c_cpp'
import 'brace/theme/monokai'

import { changeEditorTab } from '../../actions/editor'

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

		this.handleTabClick = this.handleTabClick.bind(this)

	}


	handleTabClick(userOrOriginal) {
		this.props.dispatch( changeEditorTab(userOrOriginal) )
	}

	renderTab() {
        if (this.props.activeTab === 'original') {
            return (
                <AceEditor
                    fontSize="16px"
                    mode="c_cpp"
                    theme="chrome"
                    onChange={onChange}
                    name="codeEditor"
                    width="auto"
                    height="90%"
                    editorProps={{$blockScrolling: true}}
                    value={helloWorld}
                    showPrintMargin={false}
                />
            )
        } else {
            return (
                <AceEditor
                    fontSize="16px"
                    mode="c_cpp"
                    theme="chrome"
                    onChange={onChange}
                    name="codeEditor"
                    width="auto"
                    height="90%"
                    editorProps={{$blockScrolling: true}}
                    value={'helloWorld'}
                    showPrintMargin={false}
                />
            )
        }
    }

	render () {
		return (
			<div className={styles.codeWrapper}>
				<ul>
					<li onClick={() => this.handleTabClick('user')} className={this.props.activeTab === 'user' && styles.active}><a href="#">Din kod</a></li>
					<li onClick={() => this.handleTabClick('original')} className={this.props.activeTab === 'original' && styles.active}><a href="#">Original</a></li>
				</ul>
                {this.renderTab()}
			</div>

		)
	}
}

function mapStateToProps (state) {
	return {
		activeTab: state.editor.activeTab
	}
}

export default connect(mapStateToProps)(Editor)
