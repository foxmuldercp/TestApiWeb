export function fetchViewerProps(data) {
  return function (dispatch, getState) {
    const {viewer} = getState() // get curent redux store
    console.log ('action viewer', viewer, 'data', data)
    if (!viewer.token){
    var url = 'https://sites.mulder.kiev.ua/api/v1/users/sign_in.json'
    var auth = {'user': {'email': data.email, 'password': data.password}}

    fetch(url, {
//      mode: 'no-cors',
//      credentials: 'include',
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
  }))
}}}

//'{"user":{"email":"test@example.com","password":"password"}}' -H 'Content-Type:application/json'
// http://test.mulder.kiev.ua/api/v1/users/sign_in.json
