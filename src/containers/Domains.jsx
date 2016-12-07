import React, {Component} from 'react'

import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import moment from 'moment/min/moment.min'

import {fetchDomains, sortDomains} from '../actions/domains'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, 
        TableRow, TableRowColumn} from 'material-ui/Table'

import Chip from 'material-ui/Chip'

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  chip: {
    normal: '#F5F5DC',
    clientTransferProhibited: '#FFF8DC',
    AutoRenewGracePeriod: '#D2691E',
    clientHold: '#FF8C00',
    RedemptionPeriod: '#7FFF00',
    pendingDelete: '#66CDAA',
    ok: '#90EE90',
    inactive: '#D3D3D3',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

function handleRequestDelete() {
  alert('You clicked the delete button.');
}


export class Status extends Component {

  chipStyle(item){
    switch (item){
    case String(item.match(/ok/)):
      return styles.chip.ok
      break
    case String(item.match(/inactive/)):
      return styles.chip.inactive
      break
    case String(item.match(/clientHold/)):
      return styles.chip.clientHold
      break
    case String(item.match(/pendingDelete/)):
      return styles.chip.pendingDelete
      break
    case String(item.match(/RedemptionPeriod/)):
      return styles.chip.RedemptionPeriod
      break
    case String(item.match(/AutoRenewGracePeriod/)):
      return styles.chip.AutoRenewGracePeriod
      break
    case String(item.match(/clientTransferProhibited/)):
      return styles.chip.clientTransferProhibited
      break
    default:
      return styles.chip.normal
      break
    }
  }

  render(){
    return <div style={styles.wrapper}>
      {this.props.children.map(item => {
        return <Chip onRequestDelete={handleRequestDelete} style={{backgroundColor: this.chipStyle(item)}}>
          <div>{item}</div>
        </Chip>
      })
    }</div>
  }
}

class Domains extends Component {
  constructor(props) {
    super(props)
    if (!props.token) {
      props.dispatch(push('/login'))
      return
    } else {
      props.dispatch(fetchDomains())
    }
    this.state = {
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
//      domains: props.domains,
      selectedDomains: [],
//      order_field: props.domains.order_field,
    }
  }

  componentWillMount(){
    if (!this.props.token) {
      this.props.dispatch(push('/login'))
    }
  }

  onRowSelection(rows) {
    var items = []
    rows.forEach(i => {
      items.push(this.props.domains.slice(i, i+1)[0])
    })
    const selected = {selectedDomains: items}
    this.setState(selected)
  }

  componentWillReceiveProps(nextProps) {
//    this.setState({domains: nextProps.domains.domains, all_count: nextProps.domains.all_count})
  }

  shortDate(data) {
    const date = moment(data,'X')
    return date.format('DD MMM YY')
  }

  selected(item){
    return this.state.selectedDomains.includes(item)
  }

  setSort(e) {
    e.preventDefault()
//    this.setState({...this.state, order_field: e.target.name})
    this.props.dispatch(sortDomains(e.target.name))
  }
  
  render() {
    // console.log('props: ', this.props)
    const items = this.props.domains.domains //.slice(0,this.props.per_page)
    const all_count = this.props.domains.all_count
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
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                {this.props.domains.all_count}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Name"><a name='name_fqdn' href='#' onClick={::this.setSort}>Name</a></TableHeaderColumn>
              <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
              <TableHeaderColumn tooltip="Expiration"><a name='date_expire' href='#' onClick={::this.setSort}>Expiration</a></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
          {items.map((item,index) => {
              return <TableRow key={item.id} selected={this.selected(item)}>
                <TableRowColumn>{item.name_fqdn}</TableRowColumn>
                <TableRowColumn><Status key={'status'+'-'+item.id}>{item.status}</Status></TableRowColumn>
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
