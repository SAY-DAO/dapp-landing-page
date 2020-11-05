export default (
  state = {
    walletConnected: false,
    web3: null,
    accounts: [],
    userAccount: null,
    nakamaOwner: false,
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
    case 'ISOWNER':
      return { ...state, nakamaOwner: action.payload };
    default:
      return state;
  }
};
