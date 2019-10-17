const storeInventoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STORE_INVENTORY':
        return action.payload;
      default:
        return state;
    }
  };
  
  // stores will be on the redux state at:
  // state.storeInventory
  export default storeInventoryReducer;