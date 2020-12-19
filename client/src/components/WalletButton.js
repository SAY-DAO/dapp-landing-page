import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import MewConnect from '@myetherwallet/mewconnect-web-client';
import { connect } from 'react-redux';
import { connectWallet, fetchIsOwner, updateMintButton } from '../actions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Nakama from '../contracts/Nakama.json';
import Web3 from 'web3';
import { fetchTokenURI } from '../actions';

const styles = (darkTheme) => ({
  root: {
    [darkTheme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
    [darkTheme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },
  singleBtn: {
    [darkTheme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [darkTheme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
  },
});

let provider;
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FF8E53 30%, #FF8E53 90%)',
  border: '0px solid',
  borderRadius: 10,
  color: '#ffffff',
  margin: 5,
  whiteSpace: 'normal',
});

class WalletButton extends React.Component {
  componentDidMount = async () => {
    await this.isOwner();
    await this.onConnect();
  };

  isOwner = async () => {
    let isOwner = false;
    console.log('isOwner function is initiated');
    try {
      const userAccount = this.props.theWallet.userAccount;
      const contract = this.props.theWallet.contract;
      const totalSupply = await contract.methods.totalSupply().call();
      for (let i = 1; i <= totalSupply; i++) {
        const owner = await contract.methods.ownerOf(i).call();
        if (userAccount.toLowerCase() === owner.toLowerCase()) {
          isOwner = true;
          const NAK_LINK = await contract.methods.tokenURI(i).call();
          this.props.fetchTokenURI(NAK_LINK);
          console.log('Owner: ', owner);
          console.log('NAK Token URI: ', NAK_LINK);
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
    console.log('Initializing example');
    console.log('WalletConnectProvider is', WalletConnectProvider);
    console.log('Mew is', MewConnect);
    console.log('window.web3 is', window.web3, 'window.ethereum is', window.ethereum);

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
      cacheProvider: false, // optional
      providerOptions, // required,
      theme: 'dark',
    });
    console.log('Web3Modal instance is', web3Modal);
    try {
      await this.onModalConnect(web3Modal);
    } catch (error) {
      console.log(`Something is wrong here.`, error);
    }
  };

  onModalConnect = async (web3Modal) => {
    console.log('Opening a dialog', web3Modal);
    try {
      provider = await web3Modal.connect();
    } catch (e) {
      console.log('Could not get a wallet connection', e);
      return;
    }

    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts) => {
      this.fetchAccountData();
    });

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId) => {
      this.fetchAccountData();
    });

    // Subscribe to networkId change
    provider.on('networkChanged', (networkId) => {
      this.fetchAccountData();
    });

    await this.refreshAccountData();
  };

  fetchAccountData = async () => {
    // Get a Web3 instance for the wallet
    const web3 = window.web3 ? new Web3(window.web3.currentProvider) : new Web3(provider);
    console.log('Web3 instance is', web3);
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Nakama.networks[networkId];
    // Get the contract instance.
    const nakama = new web3.eth.Contract(Nakama.abi, deployedNetwork && deployedNetwork.address);

    console.log('Networkid: ', networkId);
    console.log('Deployed: ', deployedNetwork);
    console.log('Nakama Contract: ', nakama);
    this.props.connectWallet(accounts, web3, networkId, nakama);
    await this.isOwner();
  };

  refreshAccountData = async () => {
    await this.fetchAccountData();
  };

  isNakama = () => {
    const nakOwner = this.props.theWallet.nakamaOwner;
    console.log('isNakama()', nakOwner);
    if (nakOwner) {
      return (
        <a href={this.props.tokenURI} style={{ display: 'flex', alignItems: 'center', margin: 5 }}>
          <img
            alt="nakama"
            src={require('../static/theNakama.png')}
            style={{ height: 40 }}
          />
        </a>
      );
    }
    return (
      <svg style={{ position: 'absolute' }}>
        {/*<circle cx="40" cy="10" r="20" stroke="white" strokeWidth="3" fill="#FF8799" />*/}
      </svg>
    );
  };

  walletStatus = () => {
    const buttonSize = window.innerWidth < 376 ? "meduim" : "large";
    const { classes } = this.props;
    if (!this.props.theWallet.userAccount) {
      return (
        <Grid container className={classes.singleBtn}>
          <MyButton size={buttonSize} color="secondary" variant="outlined" onClick={this.onConnect}>
            Connect Wallet
          </MyButton>
        </Grid>
      );
    }
    const userAccount = this.props.theWallet.userAccount;
    const userAccountStart = userAccount.slice(0, 6);
    const userAccountEnd = userAccount.slice(-5);
    return (
      <>
        <Box>
          {this.isNakama}
        </Box>
        <MyButton size={buttonSize} color="secondary" variant="outlined" onClick={this.onConnect}>
          {userAccountStart}...{userAccountEnd}
        </MyButton>
      </>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container xs={12} sm={9} className={classes.root}>
        {this.walletStatus()}
      </Grid>
    );
  }
}

const mapToStateProps = (state) => {
  return {
    theWallet: state.wallet,
    modal: state.modal,
    tokenURI: state.tokenURI,
  };
};

export default connect(mapToStateProps, { connectWallet, fetchTokenURI, fetchIsOwner, updateMintButton })(withStyles(styles)(WalletButton));
