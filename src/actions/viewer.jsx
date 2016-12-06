import {push} from 'react-router-redux'

export function fetchViewerProps(data) {
  return function (dispatch, getState) {
    const {viewer} = getState() // get curent redux store
    if (!viewer.token){
    var url = 'https://sites.mulder.kiev.ua/api/v1/users/sign_in'
    var auth = {'user': {'email': data.email, 'password': data.password}}

    fetch(url, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(auth)
   })
   .then(response => response.json())
   .then(json => dispatch({
     type:'auth_success',
     payload:{
       ...json
     }
   }),
   dispatch(push('/'))
  )//.catch(alert('something is wrong'))
}}}

export function logOut() {
  return function (dispatch, getState) {
    dispatch({ type:'auth_logoff', null })
    dispatch(push('/'))
  }
}
