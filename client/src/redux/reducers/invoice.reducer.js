const invoiceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVOICE':
        return action.payload;
      default:
        return state;
    }
  };
  
  // stores will be on the redux state at:
  // state.stores
  export default invoiceReducer;