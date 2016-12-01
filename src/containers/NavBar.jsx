import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavMenuIcon from 'material-ui/svg-icons/navigation/menu'

import {logOut} from '../actions/viewer'


class LoginBtn extends Component {
  static muiName = 'FlatButton';

  render() {
    return (<div>
      <FlatButton {...this.props} label="Login" onClick={() => this.props.dispatch(push('/login'))} />
      <FlatButton {...this.props} label="Register" />
    </div>);
  }
}

class Logged extends Component {
  static muiName = 'IconButton';

  render() {
  return <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem name='SignOut' primaryText="Sign out" onClick={() => this.props.dispatch(logOut())} />
  </IconMenu>
}}

class NavMenuItems extends Component {
  render() {
  return <IconMenu
    iconButtonElement={<IconButton><NavMenuIcon /></IconButton>}
      targetOrigin={{horizontal: 'left', vertical: 'center'}}
      anchorOrigin={{horizontal: 'left', vertical: 'center'}}>
    { this.props.email ?
        <MenuItem name='Domains' primaryText="Domains" onClick={() => this.props.dispatch(push('/domains'))} />
      : null 
    }
    <MenuItem name='Hosting' primaryText="Hosting" onClick={() => this.props.dispatch(push('/login'))} />
  </IconMenu>
}}


/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
 
class NavBar extends Component {

  render() {
    const email = this.props.email
    return (
      <div>
        <AppBar
          title="Title"
          iconElementLeft={<NavMenuItems {...this.props} />}
          iconElementRight={ email ? <div> {email} <Logged {...this.props} /> </div>:<LoginBtn {...this.props} />}
        />
      </div>
    )
  }
}

export default NavBar = connect(store => ({
    token: store.viewer.token, email: store.viewer.email
}))(NavBar)
