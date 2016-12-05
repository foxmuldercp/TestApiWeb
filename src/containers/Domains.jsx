import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import moment from 'moment/min/moment.min'

import {fetchDomains} from '../actions/domains'

import TBF from './DomainTableBrief'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

  const styles = {
    propContainer: {
      width: 200,
      overflow: 'hidden',
      margin: '20px auto 0',
    },
    propToggleHeader: {
      margin: '20px auto 10px',
    },
  }

class Domains extends Component {
  constructor(props) {
    super(props)
    this.props.dispatch(fetchDomains())

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '400px',
      stripedRows: true,
      per_page: 10,
      current_page: 1,
      domains: this.props.domains,
      selectedRows: [],
    }
  }

  onRowSelection(rows) {
    console.log('props: ', this.state)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps: ', nextProps.domains)
    this.setState({domains: nextProps.domains.domains})
    console.log('newstate: ', this.state)
  }

  componentWillMount(){
  //  this.props.dispatch(fetchDomains())
  //  console.log('will mount: ', this.props)
  }

  shortDate(data) {
    const date = moment(data,'X')
    return date.format('DD MMM YY')
  }

  render() {
    console.log('render: ', this.props) //.domains.domains[rows])
    const items = this.props.domains.domains.slice(0,this.state.per_page)
    const all_count = this.props.domains.all_count
    return <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          onRowSelection={this.onRowSelection}
          multiSelectable={this.state.multiSelectable}>
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
              <TableHeaderColumn tooltip="Expiration">Expiration</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
          {items.map(item => {
              return <TableRow key={item.id}>
                <TableRowColumn>{item.name_fqdn}</TableRowColumn>
                <TableRowColumn>{item.status}</TableRowColumn>
                <TableRowColumn>{this.shortDate(item.date_expire)}</TableRowColumn>
              </TableRow>
            })
          }
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
              <TableRowColumn>Expiration</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
  }
}

export default Domains = connect(store => ({
    token: store.viewer.token, domains: store.domains
}))(Domains)
