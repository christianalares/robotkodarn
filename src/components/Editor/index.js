import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import FA from 'react-fontawesome'

import 'brace/mode/c_cpp'
import 'brace/theme/monokai'

import { changeEditorTab, updateCode, uploadCode, setConsoleOutput } from '../../actions/editor'

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

        this.state = {
            workshop: null,
            userCode: null
        }
	}

    componentWillReceiveProps(nextProps) {
        let msg;

        if(nextProps.compilerResponse !== this.props.compilerResponse) {
            if(nextProps.compilerResponse.success && nextProps.willUpload) {

                msg = {
					type: 'success',
					heading: 'Kompilering klar',
					message: 'Laddar upp till robot...'
				}
                this.props.dispatch( setConsoleOutput(msg) )

                this.props.dispatch( uploadCode(nextProps.compilerResponse.output) )
            } else if(nextProps.compilerResponse.success && !nextProps.willUpload) {
                // "Testa min kod" --> success
                msg = {
					type: 'success',
					heading: 'Kompilering klar',
					message: 'Din kod ser bra ut!'
				}
                this.props.dispatch( setConsoleOutput(msg) )
            }            
        }

        if(nextProps.activePartIndex !== this.props.activePartIndex) {
            this.setState({
                userCode: this.props.workshop.parts[nextProps.activePartIndex].code
            })
        }
    }
    componentWillMount() {
        this.setState({
            workshop: this.props.workshop
        })
    }

    componentDidMount() {
        this.setState({
            userCode: this.props.workshop.parts[this.props.activePartIndex].code
        })
    }


	handleTabClick(userOrOriginal) {
		this.props.dispatch( changeEditorTab(userOrOriginal) )
	}

    onChange(newValue) {
        this.props.dispatch( updateCode(newValue) )
        this.setState({
            userCode: newValue
        })
        this.saveToLocalStorage()
    }

    saveToLocalStorage() {
        localStorage.setItem('code', this.props.updatedCode)
    }

	renderTab() {
        if (this.props.activeTab === 'user') {
            return (
                <AceEditor
                    ref="editor"
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
                    value={this.state.userCode || 'Laddar...'}
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

    renderControlPanelIfUser() {
        if(this.props.activeTab === 'user') {
            return (
                <div>
                    <button className={styles.undo} onClick={()=> {this.refs.editor.editor.undo()}}><FA name='undo' /></button>
                    <button className={styles.redo} onClick={()=> {this.refs.editor.editor.redo()}}><FA name='repeat' /></button>
                </div>
            )
        }
    }

	render () {
        return (
            <div className={styles.codeWrapper}>
                {this.renderControlPanelIfUser()}

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
        compilerResponse: state.editor.compilerResponse,
        willUpload: state.editor.willUpload,
        activePartIndex: state.editor.activePartIndex
	}
}

export default connect(mapStateToProps)(Editor)
