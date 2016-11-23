import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class AppsList extends Component {

  render() {
    return (<div id='AppsList'>Apps
    </div>);
  }
}

export default AppsList = connect()(AppsList)
