import randomNeed from "../apis/randomNeed";
import etherPrice from "../apis/etherPrice";

// export const fetchNeed = (formValues) => {
//     return async dispatch => {
//         randomNeed.get('/api/v2/public/random/need')
//     }
// }

// refactored
export const fetchNeed = () =>  async dispatch => {
        const response = await randomNeed.get('/api/v2/public/random/need?_lang=en');
        dispatch({
                type: "FETCH_NEED",
                payload: response.data
        });
}

export const fetchEthPrice = (needFetchedCost) => async dispatch => {
        const response = await etherPrice.get('/api/v3/coins/ethereum');
        // Due to $ / IRR volatility in recent years we are using a constant rate.
        const USDtoIRR = 30000;
        const needUsdCost = needFetchedCost / USDtoIRR
        const needCostUSD = needUsdCost.toFixed(2);
        const ethCurrentPrice = response.data.market_data.current_price.usd
        const needEthCost = Math.round((needCostUSD / ethCurrentPrice) * 1000000) / 1000000

        console.log(needFetchedCost, needEthCost)

        dispatch({
                type: "FETCH_ETH",
                payload: {
                        ethCurrentPrice,
                        needEthCost
                }
        });
}

export const connectWallet = (accounts, web3, networkId, nakama) => {
        return({
                type: "CONNECT_WALLET",
                payload: {
                        accounts,
                        userAccount: accounts[0],
                        web3,
                        networkId,
                        nakama
                }
        });
}

export const mintedNakama = (NAK) => {
        return({
                type: "MINTED",
                payload: NAK
        });
}


//
// export const updateServer = (data) => async dispatch => {
//         const response = randomNeed.post(`/ethereum/${data.needId}/${data.transaction}`);
//         dispatch({
//                 type: "UPDATE_SERVER",
//                 payload: response.data
//         });
// }

