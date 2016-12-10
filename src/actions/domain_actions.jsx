import {push} from 'react-router-redux'

export function domainActions(item, action) {
  return function (dispatch, getState) {
    const {viewer} = getState() // get curent redux store
    if (viewer.token) {
      var url = 'https://sites.mulder.kiev.ua'+item.url+'/'+action
      fetch(url, {
//        mode: 'no-cors',
        credentials: 'include',
        headers: { 'auth-token': viewer.token, 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
      })
      .then(function(response) {
        if (response.status == '200') {
          return response.json()
        } else if (response.status == '410') {
          dispatch({ type: 'delete_domain_item', payload: { domain: item }})
        }
      })
      .then(json => {
         dispatch({ type: 'update_domain_item', payload: { ...json }})
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  }
}
