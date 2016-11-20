import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import AppBar from 'material-ui/AppBar'
//import MenuItem from 'material-ui/MenuItem'
//import DropDownMenu from 'material-ui/DropDownMenu'
//import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';
//import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

class HostPage extends Component {
    render() {
        const {children, dispatch} = this.props;

        return <div>
            <AppBar
                title="App"
                iconClassNameRight="muidocs-icon-navigation-expand-more">
                <FlatButton
                    onClick={() => dispatch(push('/'))}
                    label="Home"
                />
                <FlatButton
                    onClick={() => dispatch(push('/user'))}
                    label="User"
                />
                <FlatButton
                    onClick={() => dispatch(push('/user/1'))}
                    label="User 1"
                />
                <FlatButton
                    onClick={() => dispatch(push('/login'))}
                    label="Login"
                />
            </AppBar>
            <div>
                {children}
            </div>
        </div>
    }
}
export default HostPage = connect()(HostPage)