


export default (state = {
    walletConnected: false,
    web3: null,
    accounts: [],
    userAccount: null,
    contract: null,
    totalSupply: 0,
}, action) => {
    switch (action.type) {
        case "CONNECT_WALLET":
            return  { ...state,
                web3: action.payload.web3,
                contract: action.payload.nakama,
                accounts: action.payload.accounts,
                userAccount: action.payload.userAccount,
                totalSupply: 0,
            };
        case "FETCH_ACCOUNTS":
            return { ...state,
                walletConnected: true,
                accounts: action.payload.accounts,
                userAccount: action.payload.accounts[0]
            }
        default:
            return state
    }
}
