import React, {Component} from 'react'

import {Router, hashHistory} from 'react-router'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
//import {createDevTools} from 'redux-devtools'
//import DockMonitor from 'redux-devtools-dock-monitor'
//import LogMonitor from 'redux-devtools-log-monitor'
//import Inspector from 'redux-devtools-inspector'

import routes from './routes'
import Reducers from './Reducers'

// createDevTools takes a monitor and produces a DevTools component
/*const DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    // Note: DockMonitor is visible by default.
    <DockMonitor 
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
        defaultIsVisible={true}
    >
        <LogMonitor />
    </DockMonitor>
);*/

const middleware = compose(
    applyMiddleware(
        thunk,
        routerMiddleware(hashHistory)
    ),
    //DevTools.instrument()
)

const store = createStore(
    combineReducers({
        ...Reducers,
        routing: routerReducer
    }),
    middleware
)

const history = syncHistoryWithStore(hashHistory, store)

export default class App extends Component {
    render() {
        return <Provider store={store}>
            <div>
                <Router history={history}>
                    {routes}
                </Router>
            </div>
        </Provider>
    }
}