export const initialViewer = {
    token:''    
}

export default function viewer(state=initialViewer, action){
    switch (action.type){

        case 'auth_success':
            return {
                ...state,
                token: action.payload.user.authentication_token
            }

        default:
            return state
    }
}