import React, {Component} from 'react'
import {connect} from 'react-redux'

import {push} from 'react-router-redux'

import {fetchViewerProps} from '../actions/viewer'
import Button from 'material-ui/RaisedButton'

class User extends Component {

  componentDidMount(){
    if (!this.props.email && !this.props.token) {
      this.props.dispatch(push('/login'))
    }
  }

  render(){
    const {params, token, email} = this.props
    const {id} = params

    return <div>
      <div>{email}</div>
   </div>
  }
}

export default User = connect(store => ({
  token: store.viewer.token, email: store.viewer.email
}))(User)
