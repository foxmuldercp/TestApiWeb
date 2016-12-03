import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {fetchViewerProps} from '../actions/viewer'

import TextField from "material-ui/TextField"
import Button from "material-ui/RaisedButton"

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email:    "",
      password: "",
      email_error: "Field is required",
      password_error: "Field is required",
      submitDisabled: true
    }
  }

  componentDidMount(){
    if (this.props.email && this.props.token) {
      this.props.dispatch(push('/'))
    }
  }

  handleChange = (event) => {
    const state    = this.state
    const newfield = [event.target.name]
    const newvalue = event.target.value
    var errMsg     = 'Required field'
    var canSubmit  = true
    if ( newvalue.trim() != '') {
      errMsg = ''
    }
    if (this.state.email_error == '' && this.state.password_error == '') { canSubmit = false }
    const newstate = {state, [newfield]: newvalue, [newfield+"_error"]: errMsg, submitDisabled: canSubmit}
    this.setState(newstate) //{...this.state, [event.target.name]: event.target.value})

    //const keys = Object.keys(this.state).map(i => (i).match('error'))
    // = keys.map(i => { if(typeof(i) !== 'undefined') { i } })
    //const myitems = Object.keys(this.state).filter(k => k.indexOf('error') !== -1).map(key => doSomethingWith(key))
  }

  fetchData(){
    this.props.dispatch(fetchViewerProps(this.state))
  }

  render() {
    return <Container fluid={true}>
      <Row>
        <Col xs='12' sm='4' sm-offset='4' md='6' lg='6'>
        <h2 class='roboto'>Login</h2>
        </Col>
      </Row>
      <Row>
        <Col xs='12' sm='4' sm-offset='4' md='6' lg='6'>
          <TextField
            id="login"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            onBlur={this.handleChange}
            hintText="Your E-mail"
            errorText={this.state.email_error}
            floatingLabelText="E-Mail"
          />
        </Col>
      </Row>
      <Row>
        <Col xs='12' sm='4' sm-offset='4' md='6' lg='6'>
          <TextField
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onBlur={this.handleChange}
            hintText="Password"
            errorText={this.state.password_error}
            floatingLabelText="Password"
            type="password"
          />
        </Col>
      </Row>
      <Row>
        <Col xs='12' sm='4' sm-offset='4' md='6' lg='6'>
          <Button
            label="Sign in"
            primary={true}
            onClick={() => this.fetchData()}
            disabled={this.state.submitDisabled}
          />
        </Col>
      </Row>
    </Container>
  }
}

export default Login = connect(store => ({
    token: store.viewer.token, email: store.viewer.email
}))(Login)
