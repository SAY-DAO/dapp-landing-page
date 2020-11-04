import Web3 from 'web3';


const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    try {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // console.log(accounts)
          console.log("Window Ethereum Web3")
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        // const HDWalletProvider = require('truffle-hdwallet-provider')
        // console.log(HDWalletProvider)
        // const provider = new HDWalletProvider(
        //     'sweet lucky guitar walk hold fitness pioneer above because coast butter arctic',
        //     'https://rinkeby.infura.io/v3/187f0c9471ef426a84f48d4be7f81042'
        // );
        // const web3 = new Web3(provider)
        // console.log('No web3 instance injected, using HDWallet web3.');
        // resolve(web3);


        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        resolve(web3);
      }
    } catch (e) {
      alert(`Something is wrong here.`);
    }
  });

export default getWeb3;
