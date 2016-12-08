import {push} from 'react-router-redux'

export function domainActions(item, action) {
  return function (dispatch, getState) {
    const {viewer} = getState() // get curent redux store
//    console.log('DomainActions: ', getState())
    if (viewer.token){
    var url = 'https://sites.mulder.kiev.ua'+item.url+'/'+action
    fetch(url, {
      credentials: 'include',
      headers: { 'auth-token': viewer.token, 'Accept': 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
   })
   .then(response => response.json())
   .then(json => dispatch({
     type:'update_domain_item',
     payload:{
       ...json
     }
   })
       //   dispatch(push('/'))
  )//.catch(alert('something is wrong'))
  }} //
}
