export function fetchViewerProps(login) {
    return function (dispatch, getState) {
        
        const {viewer} = getState()
        
        if (!viewer.token){
            fetch('https://sites.mulder.kiev.ua/api/v1/auth/is_signed_in?user_token=LiJPFGXRktQGHpyFxzNs', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => dispatch({
                    type:'auth_success',
                    payload:{
                        ...json
                    }
                }))
        }
    }
}

//'{"user":{"email":"test@example.com","password":"password"}}' -H 'Content-Type:application/json'
// http://test.mulder.kiev.ua/api/v1/users/sign_in.json
/*fetch(url, {
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {_method: '_delete', domain: {id: this.state.item.id}, authenticity_token: this.state.auth_token}*/
