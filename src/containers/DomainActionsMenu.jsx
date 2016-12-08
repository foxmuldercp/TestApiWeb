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
//    console.log(props.item.url)
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

  handleChange (item, action) {
//    console.log('item ', item, 'action ', action)
    this.props.dispatch(domainActions(item, action))
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
            <MenuItem primaryText="EPP HOLD" onClick={() => {if(confirm("Set HOLD for "+item.name_fqdn+"?")) {this.handleChange(item, 'epp_hold')}}} />
            <MenuItem primaryText="EPP UNHOLD" onClick={() => {if(confirm("Set UNHOLD for "+item.name_fqdn+"?")) {this.handleChange(item, 'epp_unhold')}}} />
            <Divider />
          </Menu>
        </Popover>
      </div>
  }
}

export default DomainActionsMenu
