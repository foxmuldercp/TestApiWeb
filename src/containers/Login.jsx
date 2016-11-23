import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchViewerProps} from '../actions/viewer'

import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Textarea from 'muicss/lib/react/textarea'
import Button from 'muicss/lib/react/button'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email:    "",
      password: ""
    }
  }

  /*
    componentDidMount(){
    this.props.dispatch(fetchViewerProps(this.state))
  }
  */

  handleChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  fetchData(e){
    e.preventDefault()
    this.props.dispatch(fetchViewerProps(this.state))
  }

  render(){
    return <Container> <Col md="4" md-offset="4"> <Form>
        <legend>Sign in</legend>
        <Input id="login" name="email" onChange={this.handleChange} value={this.state.email} required={true} />
        <Input id="password" name="password" onChange={this.handleChange} value={this.state.password} required={true} />
        <Button variant="raised" label="Sign in" primary={true} onSubmit={() => this.fetchData(e)}>Submit</Button>
    </Form> </Col> </Container>
  }

}

export default Login = connect(store => ({
    token: store.viewer.token, token: store.viewer.email
}))(Login)
