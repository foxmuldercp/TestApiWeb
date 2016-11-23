import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

// import {fetchViewerProps} from '../actions/viewer'

class Posts extends Component {

  constructor(props) {
    super(props)
  }

  /*
    componentDidMount(){
    this.props.dispatch(fetchViewerProps(this.state))
  }
  */

//  handleChange = (event) => {
//    this.setState({...this.state, [event.target.name]: event.target.value})
//    console.log(this.state)
//  }

//  fetchData(){
//    this.props.dispatch(fetchViewerProps(this.state))
//  }

  render(){
    return <Container fluid={true}>
        <Row>
          <Col xs="12" md="8">xs-12 md-8</Col>
          <Col xs="6" md="4">xs-6 md-4</Col>
        </Row>
        <Row>
          <Col xs="6" md="4">xs-6 md-4</Col>
          <Col xs="6" md="4" md-offset="4">11 xs-6 md-411</Col>
          <Col xs="6" md="4">xs-6 md-4</Col>
        </Row>
        <Row>
          <Col xs="6">xs-6</Col>
          <Col xs="6">xs-6</Col>
        </Row>
      </Container>

  }
}

export default Posts = connect(store => ({
    token: store.viewer.token, token: store.viewer.email
}))(Posts)
