import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import Appbar from 'muicss/lib/react/appbar'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from 'muicss/lib/react/button'

import Icon from './Icon'

class NavBar extends Component {

  state = {
    email: this.props.email,
    token: this.props.token,
    logged: true
  }

  render() {
    const email = this.props.email
    let s2 = {textAlign: 'right'};
    return <Appbar>
      <Row>
        <Col md='3' md-offset='1'>
          <Button variant="flat" onClick={() => this.props.dispatch(push('/posts'))}><Icon name='file-text-o' /></Button>
          <Button variant="flat" onClick={() => this.props.dispatch(push('/posts'))}><Icon name='users' /></Button>
        </Col>
        <Col md='1' md-offset='1'>
          <Button variant="flat" onClick={() => this.props.dispatch(push('/'))}><Icon name='home' /></Button>
        </Col>
        <Col md='3' md-offset='3'>
          <Button variant="flat" onClick={() => this.props.dispatch(push('/login'))}><Icon name='sign-in' /></Button>
          <Button variant="flat" onClick={() => this.props.dispatch(push('/login'))}><Icon name='user-plus' /></Button>
        </Col>
      </Row>
    </Appbar>
  }
}

export default NavBar = connect(store => ({
    token: store.viewer.token, email: store.viewer.email
}))(NavBar)
