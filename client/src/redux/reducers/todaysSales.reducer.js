const todaysSales = (state = [], action) => {
    switch (action.type) {
      case 'SET_TODAYS_SALES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default todaysSales;