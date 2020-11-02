export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ETH':
      return {
        ethCurrentPrice: action.payload.ethCurrentPrice,
        needEthCost: action.payload.needEthCost,
      };
    default:
      return state;
  }
};
