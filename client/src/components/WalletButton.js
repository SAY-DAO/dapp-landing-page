import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import getWeb3 from '../getWeb3';
import Nakama from '../contracts/Nakama.json';
import { connect } from 'react-redux';
import { connectWallet, deactivateModal, fetchIsOwner, updateMintButton } from '../actions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import detectEthereumProvider from '@metamask/detect-provider';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FF8E53 30%, #FF8E53 90%)',
  border: '0px solid',
  borderRadius: 10,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: '#ffffff',
  height: 48,
  padding: '0 30px',
  margin: 10,
  whiteSpace: 'normal',
});

class WalletButton extends React.Component {
  componentDidMount = async () => {
    await this.isOwner();
    try {
      if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask is not installed!');
      }

      const provider = await detectEthereumProvider();

      // Subscribe to session connection
      provider.on('connect', async () => {
        console.log('connecting');
        await this.isOwner();
      });

      // Subscribe to disconnecting
      provider.on('disconnect', async () => {
        console.log('disconnected');
        await this.isOwner();
      });

      // Subscribe to accounts change
      provider.on('accountsChanged', async (accounts) => {
        console.log('Account is changed');
        await this.isOwner();
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(`Failed to load web3, accounts, or contract.`, error);
    }
  };

  isOwner = async () => {
    let isOwner = false;
    console.log('isOwner function is initiated');
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
    console.log('web3', web3);

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    const networkId = await web3.eth.net.getId();
    console.log('Networkid: ', networkId);

    // Get the contract instance.
    const deployedNetwork = Nakama.networks[networkId];
    const nakama = new web3.eth.Contract(Nakama.abi, deployedNetwork && deployedNetwork.address);
    this.props.connectWallet(accounts, web3, networkId, nakama);
    // Time to reload your interface with accounts[0]!
    this.props.connectWallet(accounts, web3, networkId, nakama);

    try {
      const userAccount = this.props.theWallet.userAccount;
      const contract = this.props.theWallet.contract;
      const totalSupply = await contract.methods.totalSupply().call();
      console.log('Total Supply: ', totalSupply);
      for (let i = 1; i <= totalSupply; i++) {
        const owner = await contract.methods.ownerOf(i).call();
        if (userAccount.toLowerCase() === owner.toLowerCase()) {
          isOwner = true;
          const NAK = await contract.methods.tokenURI(i).call();
          console.log('Owner: ', owner);
          console.log('NAK: ', NAK);
          break;
        }
      }
      console.log('isOwner(): ', isOwner);
    } catch (error) {
      console.log("Can't load Nakamas: ", error);
    }
    await this.props.fetchIsOwner(isOwner);
    if (this.props.theWallet.nakamaOwner) {
      await this.props.updateMintButton('Pay for Need', 'enabled');
    } else {
      await this.props.updateMintButton('Mint NAK', 'enabled');
    }
  };

  onConnect = async () => {
    await getWeb3();

    try {
      // Metmask pops up if not connected
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      if (error.code === -32002) {
        console.log(' Already processing in background');
      }
    }
  };

  isNakama = () => {
    const nakOwner = this.props.theWallet.nakamaOwner;
    console.log('isNakama()', nakOwner);
    if (nakOwner) {
      return (
        <img
          alt="nakama"
          src={require('../static/theNakama.png')}
          style={{ height: 40, justifyContent: 'center', marginTop: 'auto' }}
        />
      );
    }
    return (
      <svg style={{ position: 'absolute' }}>
        {/*<circle cx="40" cy="10" r="20" stroke="white" strokeWidth="3" fill="#FF8799" />*/}
      </svg>
    );
  };

  walletStatus = () => {
    if (!this.props.theWallet.userAccount) {
      return (
        <MyButton color="secondary" variant="outlined" onClick={this.onConnect}>
          Connect Wallet
        </MyButton>
      );
    }
    const userAccount = this.props.theWallet.userAccount;
    const userAccountStart = userAccount.slice(0, 6);
    const userAccountEnd = userAccount.slice(-5);
    return (
      <Grid container>
        <Box style={{ margin: 'auto' }}>
          <Box xs={2}>{this.isNakama}</Box>
        </Box>
        <Box>
          <MyButton color="secondary" variant="outlined" onClick={this.onConnect}>
            {userAccountStart}...{userAccountEnd}
          </MyButton>
        </Box>
      </Grid>
    );
  };

  render() {
    return (
      <div>
        <div className="App">{this.walletStatus()}</div>
      </div>
    );
  }
}

const mapToStateProps = (state) => {
  return {
    theWallet: state.wallet,
    modal: state.modal,
  };
};

export default connect(mapToStateProps, { connectWallet, deactivateModal, fetchIsOwner, updateMintButton })(
  WalletButton,
);
