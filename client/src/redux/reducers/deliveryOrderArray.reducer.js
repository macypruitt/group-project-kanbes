

const editDeliveryOrderArray = (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_DELIVERY_ORDER_ARRAY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default editDeliveryOrderArray;