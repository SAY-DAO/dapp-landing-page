export default (state = [], action) => {
  switch (action.type) {
    case 'MINTED':
      console.log('nak', action);

      return [...state, action.payload.NAK];
    default:
      return state;
  }
};
