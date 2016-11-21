import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

class LoginBtn extends Component {
  static muiName = 'FlatButton';


  render() {
//    const {dispatch} = this.props;
    return (<div>
      <FlatButton {...this.props} label="Login" onClick={() => this.props.dispatch(push('/login'))} />
      <FlatButton {...this.props} label="Register" />
    </div>);
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

Logged.muiName = 'IconMenu'

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
 
class NavBar extends Component {

  state = {
    email: this.props.email,
    token: this.props.token,
    logged: true
  }

  render() {
    const email = this.props.email
    return (
      <div>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={email ? <div> {this.state.email} <Logged  /> </div>:<LoginBtn {...this.props} />}
        />
      </div>
    )
  }
}

export default NavBar = connect(store => ({
    token: store.viewer.token, email: store.viewer.email
}))(NavBar)
