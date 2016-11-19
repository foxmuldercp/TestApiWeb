import React, {Component} from 'react'

import {Router, hashHistory} from 'react-router'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 
//import {createDevTools} from 'redux-devtools'
//import DockMonitor from 'redux-devtools-dock-monitor'
//import LogMonitor from 'redux-devtools-log-monitor'
//import Inspector from 'redux-devtools-inspector'

import routes from './routes'
import Reducers from './Reducers'

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
            <MuiThemeProvider>
                <Router history={history}>
                    {routes}
                </Router>
            </MuiThemeProvider>
        </Provider>
    }
}