import React, {Component} from 'react'

import {Router, hashHistory} from 'react-router'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './css.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import routes from './routes'
import Reducers from './Reducers'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const middleware = compose(
  applyMiddleware(
    thunk,
    routerMiddleware(hashHistory)
  ),
)

function getStoreInitialState() {
  return {viewer: {email: localStorage.getItem('email'), token: localStorage.getItem('token') }}
}

const store = createStore(
  combineReducers({
    ...Reducers,
    routing: routerReducer
  }),
  getStoreInitialState(),
  middleware
)

const history = syncHistoryWithStore(hashHistory, store)

export default class App extends Component {

  render() {
    return <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          {routes}
        </Router>
      </MuiThemeProvider>
    </Provider>
  }
}
