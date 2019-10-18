
const editableState = {
    orderIsEditable: false
}

const editDeliveryOrderStatus = (state = editableState.orderIsEditable, action) => {
    switch (action.type) {
      case 'UPDATE_DELIVERY_ORDER_STATE':
        return !action.payload;
      default:
        return state;
    }
  };
  
  export default editDeliveryOrderStatus;