var jwt_decode = require('jwt-decode')

export const initialViewer = {
  token:'',
  email:''
}

export default function viewer(state=initialViewer, action){
  switch (action.type){

  case 'auth_success':
    const token = action.payload.meta.token
    const decoded_token = jwt_decode(action.payload.meta.token)
    localStorage.setItem('token', token)
    localStorage.setItem('email', decoded_token.email)
    localStorage.setItem('expired_timestamp', decoded_token.expired_timestamp)
    return {
      ...state,
      token: token,
      email: decoded_token.email
    }
  case 'auth_logoff':
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('expired_timestamp')
    return {
      ...state,
      token: '',
      email: ''
    }
  default:
    return state
  }
}
