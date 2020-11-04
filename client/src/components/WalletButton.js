import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import getWeb3 from '../getWeb3';
import Nakama from '../contracts/Nakama.json';
import { connect } from 'react-redux';
import { activateModal, connectWallet, deactivateModal } from '../actions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const styles = (darkTheme) => ({
  root: {},
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 100,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  paper: {
    backgroundColor: '#110f0f',
    boxShadow: darkTheme.shadows[5],
    padding: darkTheme.spacing(2, 4, 3),
    maxWidth: 600,
    borderRadius: 41,
  },
});

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
    try {
      this.walletStatus();

      if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask is not installed!');
      }

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

      window.ethereum.on('accountsChanged', (accounts) => {
        // Time to reload your interface with accounts[0]!
        this.props.connectWallet(accounts, web3, networkId, nakama);
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(`Failed to load web3, accounts, or contract.`, error);
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
    if (Nakama) {
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
        <circle cx="40" cy="10" r="20" stroke="white" strokeWidth="3" fill="#FF8799" />
      </svg>
    );
  };

  walletStatus = () => {
    if (!this.props.theWallet.accounts[0]) {
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

  handleOpen = () => {
    const open = true;
  };
  handleClose = () => {
    this.props.deactivateModal();
  };

  render() {
    const open = this.props.modal;
    const { classes } = this.props;

    return (
      <div>
        <div className="App">{this.walletStatus()}</div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Paper className={classes.paper}>
              <Box>
                <Typography component="h1" variant="h4" align="center" id="transition-modal-title">
                  You have earned a Nakama
                </Typography>
                <br />
                <Typography component="p" variant="subtitle1" align="center" id="transition-modal-description">
                  To stay in touch and for the token use cases please follow us on our social medias or just regularly
                  visit this page which will be updated regularly.
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <img alt="modalChild" src={require('../static/Dokhtar.png')} style={{ margin: 20, maxWidth: 100 }} />
              </Box>
            </Paper>
          </Fade>
        </Modal>
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

export default connect(mapToStateProps, { connectWallet, deactivateModal })(withStyles(styles)(WalletButton));
