import React, {Component} from 'react'
import Chip from 'material-ui/Chip'

const styles = {
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

class EppStatus extends Component {

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
    var items = this.props.items
    return <div style={styles.wrapper}>
      {this.props.items.map(item => {
        return <Chip key={this.props.name+item} onRequestDelete={handleRequestDelete}
          style={{backgroundColor: this.chipStyle(item)}}>
            <div>{item}</div>
        </Chip>
      })
    }</div>
  }
}

export default EppStatus
