import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class HostPage extends Component {
    render() {
        const {children, dispatch} = this.props;

        return <div>
            <div className="menu">
                <ul>
                    <li><a onClick={() => dispatch(push('/'))}>home</a></li>
                    <li><a onClick={() => dispatch(push('/user'))}>me</a></li>
                    <li><a onClick={() => dispatch(push('/user/1'))}>user 1</a></li>
                </ul>
            </div>

            <div>
                {children}
            </div>
        </div>
    }
}

export default HostPage = connect()(HostPage)