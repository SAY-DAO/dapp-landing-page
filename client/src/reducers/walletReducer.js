export default (
  state = {
    walletConnected: false,
    web3: null,
    accounts: [],
    userAccount: '',
    nakamaOwner: false,
    fetching: false,
    connector: null,
    connected: false,
    chainId: 1,
    showModal: false,
    pendingRequest: false,
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
        fetching: action.payload.fetching,
        connector: action.payload.connector,
        connected: action.payload.connected,
        chainId: action.payload.chainId,
        showModal: action.payload.showModal,
        pendingRequest: action.payload.pendingRequest,

assets: [],
      };
    case 'IS_OWNER':
      return { ...state, nakamaOwner: action.payload };
    default:
      return state;
  }
};
