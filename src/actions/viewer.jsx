export function fetchViewerProps(login) {
  return function (dispatch, getState) {
    const {viewer} = getState()
    console.log ('action viewer', viewer)
//    if (!viewer.token){
//    var url = 'https://sites.mulder.kiev.ua/api/v1/users/sign_in.json';
//    fetch(url, {
//      mode: 'no-cors',
//      credentials: 'include',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json',
//        'csrf-param': this.state.forgery_name,
//        'X-CSRF-Token': this.state.auth_token
//      },
//      method: 'POST',
//      body: JSON.stringify({user: {email: viewer.email, password: viewer.password}})
//  })
//  .then(response => response.json())
//  .then(json => dispatch({
//     type:'auth_success',
//     payload:{
//       ...json
//     }
//  }))
}} //}

//'{"user":{"email":"test@example.com","password":"password"}}' -H 'Content-Type:application/json'
// http://test.mulder.kiev.ua/api/v1/users/sign_in.json
