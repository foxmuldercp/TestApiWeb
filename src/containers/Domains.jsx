import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import moment from 'moment/min/moment.min'

import DomainActionsMenu from './DomainActionsMenu'
import EppStatus from './EppStatus'

import {fetchDomains, sortDomains} from '../actions/domains'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, 
        TableRow, TableRowColumn} from 'material-ui/Table'

import CircularProgress from 'material-ui/CircularProgress';

class Domains extends Component {
  constructor(props) {
    super(props)
      var demo = props.location.query.demo
      this.state = {
      privacy: demo,
      height: '400px',
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
      stripedRows: true,
      per_page: 10,
      current_page: 1,
      domains: props.domains,
      selectedDomains: [],
      order_field: props.domains.order_field,
    }
  }

  componentWillMount(){
    if (this.props.token) {
      this.props.dispatch(fetchDomains())
    } else {
      this.props.dispatch(push('/login'))
    }
  }

  onRowSelection(rows) {
    var items = []
    rows.forEach(i => {
      items.push(this.state.domains.slice(i, i+1)[0])
    })
    const selected = {selectedDomains: items}
    this.setState(selected)
  }

  componentWillReceiveProps(nextProps) {
    const newState = {domains: nextProps.domains.domains, all_count: nextProps.domains.all_count, order_field: nextProps.domains.order_field}
    this.setState(newState)
  }

  shortDate(data) {
    const date = moment(data,'X')
    return date.format('DD MMM YY')
  }

  selected(item){
    if (this.state.selectedDomains.indexOf(item) != '-1' ){
    return true
    } else { return false }
  }

  setSort(e) {
    e.preventDefault()
    this.props.dispatch(sortDomains(e.target.name))
  }

  render() {
    var items = this.state.domains //.slice(0,this.props.per_page)
    return <div>
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        onRowSelection={::this.onRowSelection}
        multiSelectable={this.state.multiSelectable}>
        onRowSelection={this.onRowSelection}
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}>
          <TableRow>
            <TableHeaderColumn colSpan="6" tooltip="Super Header" style={{textAlign: 'center'}}>
              <p>all: {items.length} order: {this.state.order_field}</p>
              selected: {this.state.selectedDomains.length}
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="Status icons">Icons</TableHeaderColumn>
            <TableHeaderColumn tooltip="Name"><a name='name_fqdn' href='#' onClick={::this.setSort}>Name</a></TableHeaderColumn>
            <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
            <TableHeaderColumn tooltip="Expiration"><a name='date_expire' href='#' onClick={::this.setSort}>Expiration</a></TableHeaderColumn>
            <TableHeaderColumn tooltip="Status">Client name</TableHeaderColumn>
            <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}>
          {(items.length > 1) ? items.map((item,index) => {
            return <TableRow key={item.id} selected={this.selected(item)}>
              <TableRowColumn></TableRowColumn>
              <TableRowColumn>{!(this.state.privacy) ? item.name_fqdn : 'example.com'}</TableRowColumn>
              <TableRowColumn><EppStatus key={'status'+'-'+item.id} name={item.name_fqdn} items={item.status} /></TableRowColumn>
              <TableRowColumn>{this.shortDate(item.date_expire)}</TableRowColumn>
              <TableRowColumn>{!(this.state.privacy) ? item.client_name : 'Example Client'}</TableRowColumn>
              <TableRowColumn><DomainActionsMenu {...this.props} item={item} /></TableRowColumn>
            </TableRow>
          }) : <TableRow selectable='false'><TableRowColumn colSpan="3" style={{textAlign: 'center'}}><CircularProgress /></TableRowColumn></TableRow>
        }
        </TableBody>
        <TableFooter
          adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow>
            <TableRowColumn>Icons</TableRowColumn>
            <TableRowColumn>Name</TableRowColumn>
            <TableRowColumn>Status</TableRowColumn>
            <TableRowColumn>Expiration</TableRowColumn>
            <TableRowColumn tooltip="Status">Client name</TableRowColumn>
            <TableRowColumn tooltip="Actions">Actions</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn colSpan="6" style={{textAlign: 'center'}}>
              Super Footer
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  }
}

export default Domains = connect(store => ({
    token: store.viewer.token, domains: store.domains, order_field: store.domains.order_field
}))(Domains)
