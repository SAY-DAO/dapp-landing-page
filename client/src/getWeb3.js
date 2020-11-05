import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import MewConnect from '@myetherwallet/mewconnect-web-client';

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    try {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: '187f0c9471ef426a84f48d4be7f81042', // required
          },
        },
        mewconnect: {
          package: MewConnect, // required
          options: {
            infuraId: '187f0c9471ef426a84f48d4be7f81042', // required
          },
        },
      };

      const web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      const provider = await web3Modal.connect();

      const web3 = new Web3(provider);
      resolve(web3);
    } catch (error) {
      console.log(`Something is wrong here.`, error);
    }
  });

export default getWeb3;
