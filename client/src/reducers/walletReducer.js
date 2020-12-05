export default (
  state = {
    walletConnected: false,
    web3: null,
    accounts: [],
    userAccount: '',
    nakamaOwner: false,
    chainId: 1,
    showModal: false,
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
        chainId: action.payload.networkId,
        showModal: action.payload.showModal,
      };
    case 'IS_OWNER':
      return { ...state, nakamaOwner: action.payload };
    default:
      return state;
  }
};
