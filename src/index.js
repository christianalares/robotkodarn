import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistory } from 'redux-simple-router'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

import App from './components/App'
import List from './components/List'
import Create from './components/Create'
import Authenticate from './components/Authenticate'
import Editor from './components/Editor'
import Student from './components/Student'
import Teacher from './components/Teacher'
import Login from './components/Login'
import Admin from './components/Admin'

import './index.css'

// import './font-awesome.min.css'
// import '../node_modules/react-fontawesome/lib/'

const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware)(createStore)
const store = createStoreWithMiddleware(reducers)


render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRedirect to='/login'/>
				<Route path="/editor" component={Editor}/>
				<Route path="/student/8907" component={Student}/>
				<Route path="/teacher" component={Teacher}/>
				<Route path="/login" component={Login}/>
				<Route path="/admin" component={Admin}/>
			</Route>
		</Router>
	</Provider>
), document.getElementById('root'))
