export default (state = false, action) => {
  switch (action.type) {
    case 'NAK_MODAL':
      return (state = action.payload);
    case 'NO_NAK_MODAL':
      return (state = action.payload);
    default:
      return state;
  }
};
