import { Connectors } from 'web3-react';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const { InjectedConnector, NetworkOnlyConnector } = Connectors;
const walletConnect = new WalletConnectConnector({ rpc: { 1: '...' } });
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });
const Infura = new NetworkOnlyConnector({
  providerURL: 'https://rinkeby.infura.io/v3/187f0c9471ef426a84f48d4be7f81042',
});
export const connectors = { MetaMask, Infura, walletConnect };
