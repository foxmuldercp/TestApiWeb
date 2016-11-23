import React, {Component} from 'react'
import {connect} from 'react-redux'

class Icon extends Component {

  render(){
    const iconname='fa fa-'+this.props.name
    return <i className={iconname} />
  }

}

export default Icon = connect()(Icon)
