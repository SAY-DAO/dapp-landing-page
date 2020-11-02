import { Connectors } from 'web3-react';
const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });

const connectors = { MetaMask };

export default connectors;