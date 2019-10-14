const suppliersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SUPPLIERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // suppliers will be on the redux state at:
  // state.suppliers
  export default suppliersReducer;