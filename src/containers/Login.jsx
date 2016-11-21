import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchViewerProps} from '../actions/viewer'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/RaisedButton'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login:    '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    render(){
        return <div>
            <TextField
                id="login"
                value={this.state.login}
                onChange={this.handleChange}
                hintText="Your E-mail"
                floatingLabelText="E-Mail"
            />
            <TextField
                id="password"
                hintText="Password"
                floatingLabelText="Password"
                type="password"
            /><br />
            <Button
                label="Sign in"
                primary={true}
            />
        </div>
    }
}

export default Login
//= connect(store => ({
//    token: store.viewer.token,
//}))(User)
