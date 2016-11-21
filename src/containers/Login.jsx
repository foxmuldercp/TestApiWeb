import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchViewerProps} from '../actions/viewer'

import TextField from "material-ui/TextField"
import Button from "material-ui/RaisedButton"

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email:    "",
      password: ""
    }
  }

  /*  componentDidMount(){
    this.props.dispatch(fetchViewerProps())
  }*/

  handleChange = (event) => {
    console.log(this.state)
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  fetchData(){
    this.props.dispatch(fetchViewerProps())
  }

  render(){
    return <div>
      <TextField
         id="login"
         name="email"
         value={this.state.email}
         onChange={this.handleChange}
         hintText="Your E-mail"
         floatingLabelText="E-Mail"
      />
      <TextField
         id="password"
         name="password"
         value={this.state.password}
         onChange={this.handleChange}
         hintText="Password"
         floatingLabelText="Password"
         type="password"
      /><br />
      <Button
         label="Sign in"
         primary={true}
         onClick={() => this.fetchData()}
      />
    </div>
  }

}

export default Login
// = connect(store => ({
//    token: store.viewer.token,
// }))(User)
