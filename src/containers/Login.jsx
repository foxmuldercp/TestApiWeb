import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchViewerProps} from '../actions/viewer'

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

  fetchData(){
    this.props.dispatch(fetchViewerProps(this.state))
  }

  render(){
    return <div>Login
    </div>
  }

}

export default Login = connect(store => ({
    token: store.viewer.token, token: store.viewer.email
}))(Login)
