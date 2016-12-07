export const initialDomains = {
  domains: [],
  order_field: 'name_fqdn'
}

export default function fetchDomains(state=initialDomains, action){
  var items
  switch (action.type){

  case 'load':
    items = action.payload.domains
    return {
      ...state,
      domains: items,
      all_count: action.payload.meta.count
    }

  case 'sort':
    const order_field = action.payload.order_field
    console.log('reducer:', order_field)

    items = state.domains.sort(function (a, b) {
      if (a[state.order_field] > b[state.order_field]) {
        return 1;
      }
      if (a[state.order_field] < b[state.order_field]) {
        return -1;
      }
      // a eql b
      return 0;
    })
    return {
      ...state,
      domains: items,
      order_field: order_field
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
