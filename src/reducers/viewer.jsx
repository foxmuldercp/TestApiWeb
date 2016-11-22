export const initialViewer = {
  token:'',
  email:''
}

export default function viewer(state=initialViewer, action){
  switch (action.type){
    case 'auth_success':
      return {
        ...state,
        token: action.payload.authentication_token,
        email: action.payload.email
      }
  default:
    return state
  }
}
