const globalSales = (state = [], action) => {
    switch (action.type) {
      case 'SET_GLOBAL_SALES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default globalSales;