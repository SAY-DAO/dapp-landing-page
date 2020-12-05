export default (state = null, action) => {
  switch (action.type) {
    case 'LINK':
      return (state = action.payload);
    default:
      return state;
  }
};
