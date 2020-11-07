import randomNeed from '../apis/randomNeed';
import etherPrice from '../apis/EtherPrice';

// export const fetchNeed = (formValues) => {
//     return async dispatch => {
//         randomNeed.get('/api/v2/public/random/need')
//     }
// }

// refactored
export const fetchNeed = () => async (dispatch) => {
  try {
    const response = await randomNeed.get('/api/v2/public/random/need?_lang=en');
    dispatch({
      type: 'FETCH_NEED',
      payload: response.data,
    });
  } catch (e) {
    alert('looks like there is problem with your internet connection');
  }
};

export const fetchEthPrice = (needFetchedCost) => async (dispatch) => {
  try {
    const response = await etherPrice.get('/api/v3/coins/ethereum');
    // Due to $ / IRR volatility in recent years we are using a constant rate.
    const USDtoIRR = 30000;
    const needUsdCost = needFetchedCost / USDtoIRR;
    const needCostUSD = needUsdCost.toFixed(2);
    const ethCurrentPrice = response.data.market_data.current_price.usd;
    const needEthCost = Math.round((needCostUSD / ethCurrentPrice) * 1000000) / 1000000;

    console.log(needFetchedCost, needEthCost);

    dispatch({
      type: 'FETCH_ETH',
      payload: {
        ethCurrentPrice,
        needEthCost,
      },
    });
  } catch (error) {
    alert('looks like there is problem with your internet connection');
  }
};

export const connectWallet = (accounts, web3, networkId, nakama) => {
  return {
    type: 'CONNECT_WALLET',
    payload: {
      web3,
      nakama,
      accounts,
      userAccount: accounts[0],
    },
  };
};

export const mintedNakama = (NAK) => {
  return {
    type: 'MINTED',
    payload: NAK,
  };
};

export const activateModal = () => {
  return {
    type: 'NAK_MODAL',
    payload: true,
  };
};

export const deactivateModal = () => {
  return {
    type: 'NO_NAK_MODAL',
    payload: false,
  };
};

export const fetchIsOwner = (isOwner) => {
  return {
    type: 'ISOWNER',
    payload: isOwner,
  };
};
