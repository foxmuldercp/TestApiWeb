export function fetchDomains() {
  return function (dispatch, getState) {
    const {viewer, domains} = getState() // get curent redux store
    var link = 'https://sites.mulder.kiev.ua/api/v1/domains'

    fetch(link, {
      method: 'GET',
      credentials: 'include',
      headers: { 'auth-token': viewer.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
    })
   .then(response => response.json())
   .then(json => dispatch({
     type:'load',
     payload:{
       ...json
     }
   }),
  )//.catch(alert('something is wrong'))
}}

export function sortDomains(field) {
  return function (dispatch, getState) {
    const {domains} = getState() // get curent redux store
    dispatch({ type:'sort', payload:{ order_field: field }})
}}
