const invoiceParameterReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVOICE_PARAMETERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default invoiceParameterReducer;