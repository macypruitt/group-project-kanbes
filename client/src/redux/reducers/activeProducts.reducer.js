const activeProducts = (state = [], action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // stores will be on the redux state at:
  // state.stores
  export default activeProducts;