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
      password: ""
    }
  }

  componentDidMount(){
    if (this.props.email && this.props.token) {
      this.props.dispatch(push('/'))
    }
  }

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value})
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
            value={this.state.email}
            onChange={this.handleChange}
            hintText="Your E-mail"
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
            hintText="Password"
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
          />
        </Col>
      </Row>
    </Container>
  }
}

export default Login = connect(store => ({
    token: store.viewer.token, email: store.viewer.email
}))(Login)
