import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import 'brace/mode/c_cpp'
import 'brace/theme/monokai'

import { changeEditorTab, updateCode, uploadCode } from '../../actions/editor'

import styles from './editor.css'

const helloWorld = `// my first program in C++
#include <iostream>

int main()
{
	std::cout << 'Hello World!';
}`



export class Editor extends Component {
	constructor (props) {
		super(props)

		this.handleTabClick = this.handleTabClick.bind(this)
        this.onChange = this.onChange.bind(this)
	}

    componentWillReceiveProps(nextProps) {
        if(nextProps.compilerResponse !== this.props.compilerResponse && nextProps.compilerResponse.success) {
            this.props.dispatch( uploadCode(nextProps.compilerResponse.output) )
        }
    }
    componentWillMount() {
        // Set value in codeeditor?
        console.log( localStorage.getItem('code') )
    }


	handleTabClick(userOrOriginal) {
		this.props.dispatch( changeEditorTab(userOrOriginal) )
	}

    onChange(newValue) {
        this.props.dispatch( updateCode(newValue) )
        this.saveToLocalStorage()
    }

    saveToLocalStorage() {
        localStorage.setItem('code', this.props.updatedCode)
    }

	renderTab() {
        if (this.props.activeTab === 'user') {
            return (
                <AceEditor
                    setOptions={{
                        readOnly: false
                    }}
                    fontSize='16px'
                    mode='c_cpp'
                    theme='chrome'
                    onChange={this.onChange}
                    name='codeEditor'
                    width='auto'
                    height='90%'
                    editorProps={{$blockScrolling: true}}
                    value={this.props.updatedCode}
                    showPrintMargin={false}
                />
            )
        } else {
            return (
                <AceEditor
                    setOptions={{
                        readOnly: true
                    }}
                    fontSize='16px'
                    mode='c_cpp'
                    theme='chrome'
                    name='codeEditor'
                    width='auto'
                    height='90%'
                    editorProps={{$blockScrolling: true}}
                    value={helloWorld}
                    showPrintMargin={false}
                />
            )
        }
    }

	render () {
		return (
			<div className={styles.codeWrapper}>
				<ul>
					<li onClick={() => this.handleTabClick('user')} className={this.props.activeTab === 'user' && styles.active}><a href='#'>Din kod</a></li>
					<li onClick={() => this.handleTabClick('original')} className={this.props.activeTab === 'original' && styles.active}><a href='#'>Original</a></li>
				</ul>
                {this.renderTab()}
			</div>

		)
	}
}

function mapStateToProps (state) {
	return {
		activeTab: state.editor.activeTab,
        updatedCode: state.editor.updatedCode,
        compilerResponse: state.editor.compilerResponse
	}
}

export default connect(mapStateToProps)(Editor)
