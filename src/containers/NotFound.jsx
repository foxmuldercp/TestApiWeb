import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Button from "material-ui/RaisedButton"

class NotFound extends Component {

  render() {
    return <Card expanded={true}>
    <CardHeader
      title="Page not found"
      subtitle="Seems, that this url is not functional now."
      titleColor='red'
    />
    <CardActions>
      <Button label="Return to home page" onClick={() => this.props.dispatch(push('/'))}/>
    </CardActions>
  </Card>
  }
}

export default NotFound = connect()(NotFound)
