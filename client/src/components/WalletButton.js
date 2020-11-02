import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import getWeb3 from '../getWeb3';
import Nakama from '../contracts/Nakama.json';
import { connect } from 'react-redux';
import { connectWallet } from "../actions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";


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

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // if (accounts[0]){
      //     this.setState({ walletConnection: "CONNECTED" })
      // }
      const networkId = await web3.eth.net.getId();

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
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
    }
  }

    onConnect = async () => {
        try {
            // Metmask pops up if not connected
            await window.ethereum.request({method: 'eth_requestAccounts'});

        }catch (error) {
            if (error.code === -32002){
                console.log(" Already processing in background")
            }
        }
    };

    walletStatus = () => {

        if(!this.props.theWallet.accounts[0]){
            return(
                <MyButton color="secondary" variant="outlined" onClick={this.onConnect}>
                    Connect Wallet
                </MyButton>
            )
        }
        const userAccount = this.props.theWallet.userAccount
        const userAccountStart = userAccount.slice(0, 6);
        const userAccountEnd = userAccount.slice(-5);

        return(
            <Grid container>
                <Box  style={{ margin: "auto"}}>
                    <Box xs={2} >
                        <img alt="nakama" src={require("../static/NAKAMA-03.png")} style={{ height: 40, justifyContent: "center", marginTop: "auto" }}/>
                    </Box>
                </Box>
                <Box>
                    <MyButton color="secondary" variant="outlined" onClick={this.onConnect}>
                        {userAccountStart}...{userAccountEnd}
                    </MyButton>
                </Box>
            </Grid>
        )

  };

  render() {
    return <div className="App">{this.walletStatus()}</div>;
  }
}

const mapToStateProps = (state) => {
  return {
    theWallet: state.wallet,
  };
};

export default connect(mapToStateProps, { connectWallet })(WalletButton);
