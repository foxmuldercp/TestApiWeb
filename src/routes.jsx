import React from 'react';
import {Route} from 'react-router';

import HostPage from './containers/HostPage'
import User from './containers/User'
import Login from './containers/Login'
import Domains from './containers/Domains'
import NotFound from './containers/NotFound'

const routes = <Route path="/" component={HostPage}>
    <Route path="login" component={Login} />
    <Route path="domains" component={Domains} />
    <Route path="user" component={User} />
    <Route path="user/(:id)" component={User} />
    <Route path="*" component={NotFound}/>
</Route>

export default routes
