import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {domainActions} from '../actions/domain_actions'

import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Divider from 'material-ui/Divider';

class DomainActionsMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  fechData(){
    this.props.dispatch(fetchViewerProps(this.state))
  }

  handleChange (item, action, payload) {
    this.setState({open: false})
    this.props.dispatch(domainActions(item, action, payload))
  }

  render() {
    const item = this.props.item
    return <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Actions"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}>
          <Menu>
            <MenuItem primaryText="EPP commands" disabled='true' />
            <Divider />
            <MenuItem primaryText="UPDATE" onClick={() => {this.handleChange(item, 'epp_update_info')}} />
            <Divider />
            <MenuItem primaryText="HOLD" onClick={() => {if(confirm("Set HOLD for "+item.name_fqdn+"?")) {this.handleChange(item, 'epp_hold')}}} />
            <MenuItem primaryText="UNHOLD" onClick={() => {if(confirm("Set UNHOLD for "+item.name_fqdn+"?")) {this.handleChange(item, 'epp_unhold')}}} />
            <Divider />
            <MenuItem primaryText="DELETE" onClick={() => {if(confirm("DELETE "+item.name_fqdn+"?")) {this.handleChange(item, 'epp_delete')}}} />
            <MenuItem primaryText="RESTORE" onClick={() => {if(confirm("RESTORE "+item.name_fqdn+"?")) {this.handleChange(item, 'epp_restore')}}} />
          </Menu>
        </Popover>
      </div>
  }
}

export default DomainActionsMenu
