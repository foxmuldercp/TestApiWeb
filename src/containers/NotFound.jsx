import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Button from "material-ui/RaisedButton"

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

class NotFound extends Component {

  render() {
    return  <Container fluid={true}>
        <Row><Col xs='12' sm='4' sm-offset='4' md='6' lg='6'>
            <Card expanded={true}>
    <CardHeader
      title="Page not found"
      subtitle="Seems, that this url is not functional now."
      titleColor='red'
    />
    <CardActions>
      <Button label="Return to home page" onClick={() => this.props.dispatch(push('/'))}/>
    </CardActions>
  </Card>
  </Col>
</Row>
</Container>
  }
}

export default NotFound = connect()(NotFound)
