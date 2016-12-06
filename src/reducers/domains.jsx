export const initialDomains = {
  domains:[]
}

export default function fetchDomains(state=initialDomains, action){
  switch (action.type){

  case 'load':
//    console.log('payload: ', action.payload)
    return {
      ...state,
      domains: action.payload.domains,
      all_count: action.payload.meta.count
    }

  case 'unload':
    return {
      ...state,
      domains: []
    }

  default:
    return state
  }
}
