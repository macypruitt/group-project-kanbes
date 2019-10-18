const storesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STORES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // stores will be on the redux state at:
  // state.stores
  export default storesReducer;