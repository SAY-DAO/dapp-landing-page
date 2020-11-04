export default (
  state = {
    walletConnected: false,
    web3: null,
    accounts: [],
    userAccount: null,
  },
  action,
) => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return {
        ...state,
        web3: action.payload.web3,
        contract: action.payload.nakama,
        accounts: action.payload.accounts,
        userAccount: action.payload.userAccount,
      };
    default:
      return state;
  }
};
