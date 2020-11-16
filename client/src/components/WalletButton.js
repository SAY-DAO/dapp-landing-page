import * as React from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
//
import { apiGetAccountAssets } from '../apis/helpers/api';

class walletConnect extends React.Component {
  state = {
    fetching: false,
    connector: null,
    connected: false,
    chainId: 1,
    showModal: false,
    pendingRequest: false,
    accounts: [],
    address: '',
    result: null,
    assets: [],
  };
  // Initiate a connector and its session
  walletConnectInit = async () => {
    // bridge url
    const bridge = 'https://bridge.walletconnect.org';
    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    await this.setState({ connector });
    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }
    // subscribe to events
    await this.subscribeToEvents();
    console.log('initiated', connector);
  };

  subscribeToEvents = async () => {
    const { connector } = this.state;
    if (!connector) {
      return;
    }
    connector.on('session_update', async (error, payload) => {
      console.log(`connector.on("session_update")`);
      if (error) {
        throw error;
      }
      const { chainId, accounts } = payload.params[0];
      await this.onSessionUpdate(accounts, chainId);
    });
    connector.on('connect', (error, payload) => {
      console.log(`connector.on("connect")`);
      if (error) {
        throw error;
      }
      this.onConnect(payload);
    });
    connector.on('disconnect', async (error, payload) => {
      console.log(`connector.on("disconnect")`);
      if (error) {
        throw error;
      }
      await this.onDisconnect();
    });
    if (connector.connected) {
      const { chainId, accounts } = connector;
      const address = accounts[0];
      this.setState({
        connected: true,
        chainId,
        accounts,
        address,
      });
      await this.onSessionUpdate(accounts, chainId);
    }

    this.setState({ connector });
  };

  onSessionUpdate = async (accounts, chainId) => {
    const address = accounts[0];
    await this.setState({ chainId, accounts, address });
    await this.getAccountAssets();
  };

  getAccountAssets = async () => {
    const { address, chainId } = this.state;
    this.setState({ fetching: true });
    try {
      // get account balances
      const assets = await apiGetAccountAssets(address, chainId);
      await this.setState({ fetching: false, address, assets });
    } catch (error) {
      console.error(error);
      await this.setState({ fetching: false });
    }
  };

  onConnect = async (payload) => {
    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];
    await this.setState({
      connected: true,
      chainId,
      accounts,
      address,
    });
    await this.getAccountAssets();
  };

  onDisconnect = async () => {
    await this.resetApp();
  };

  resetApp = async () => {
    await this.setState({
      fetching: false,
      connector: null,
      connected: false,
      chainId: 1,
      showModal: false,
      pendingRequest: false,
      accounts: [],
      address: '',
      result: null,
      assets: [],
    });
  };

  killSession = async () => {
    const { connector } = this.state;
    if (connector) {
      await connector.killSession();
    }
    await this.resetApp();
  };

  render() {
    return (
      <div>
        <div>
          {`showModal: ${this.state.showModal}`}
          <br />
          {`pendingRequest: ${this.state.pendingRequest}`}
          <br />
          {`result: ${this.state.result}`}
          <br />
          {`fetching: ${this.state.fetching}`}
          <br />
          {`isConnected: ${this.state.connected}`}
          <br />
          {`account: ${this.state.address}`}
          <br />
          {`chainId: ${this.state.chainId}`}
          <br />
          {`balance: ${this.state.assets[0] ? this.state.assets[0]['balance'] : 0}`}
          <br />
        </div>
        <button onClick={this.walletConnectInit}>{'Connect to WalletConnect'}</button>
        <button onClick={this.killSession}>{'Disconnect'}</button>
      </div>
    );
  }
}

export default walletConnect;
