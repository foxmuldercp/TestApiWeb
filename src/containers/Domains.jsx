import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

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

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
      items: []
    }
  }

  componentDidMount(){
    if (this.props.email && this.props.token) {
      this.updateItems(0,50)
    } else {
      this.props.dispatch(push('/login'))
    }
  }

  updateItems(offset, limit) {
    var link = 'https://sites.mulder.kiev.ua/api/v1/domains'
    var url
/*    Object.keys(this.state.filters).map((item, id) => {
      var key = item;
      var value = this.state.filters[item];
      var url = link.concat(key, '=', value, '&');
      link = url;
    })
    url  = link.concat('offset', '=', offset, '&')
    link = url
    url  = link.concat('limit', '=',  limit, '&')
    link = url
    this.setState({currentMode: 'list', update: true, details: null, edit: null});
*/
    fetch(link, {
      method: 'GET',
//      mode: 'no-cors',
//      credentials: 'same-origin',
      headers: { 'auth-token': this.props.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
    })

    .then(result => result.json())
    .then(json   => this.setItems(json))
    .catch ( alert );
  }

  setItems(data) {
    console.log(data)
    this.setState({items: data.domains})
  }

  render() {
    return <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
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
          {this.state.items.map(item => {
              return <TableRow key={item.id}>
                <TableRowColumn>{item.name_fqdn}</TableRowColumn>
                <TableRowColumn>{item.status}</TableRowColumn>
                <TableRowColumn>{item.date_expire}</TableRowColumn>
              </TableRow>
            })
          }
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
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
    token: store.viewer.token, email: store.viewer.email
}))(Domains)
