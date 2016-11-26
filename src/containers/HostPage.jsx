import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import NavBar from './NavBar'

class HostPage extends Component {
  render() {
    const {children, dispatch} = this.props;

    return <div>
      <NavBar {...dispatch} />
      {children}
    </div>
  }
}
export default HostPage = connect()(HostPage)
