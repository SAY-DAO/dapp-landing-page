import React, { Component } from "react";
import getWeb3 from "../getWeb3";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MidSection from "./MidSection";
import IntroSection from "./IntroSection";
import VerticalTabs from "./VerticalTabs";
import Eye from "./Eye";
import EndSection from "./EndSection";
import NavBar from "./NavBar";
import Nakama from "../contracts/Nakama.json";



class App extends Component {
    state = {
        walletConnection: 'NOT_CONNECTED',
        web3: null,
        accounts: null,
        userAccount: null,
        contract: null,
        totalSupply: 0,
        nakamas: []
    };

    componentDidMount = async () => {
            try {
                if (typeof window.ethereum === 'undefined') {
                    console.log('MetaMask is not installed!');
                }

                // Get network provider and web3 instance.
                const web3 = await getWeb3();
                this.setState({web3})

                // Use web3 to get the user's accounts.
                const accounts = await web3.eth.getAccounts();
                if (accounts[0]){
                    this.setState({ walletConnection: "CONNECTED" })
                }
                const networkId = await web3.eth.net.getId();
                console.log('Network id: ',networkId)

                // Get the contract instance.
                const deployedNetwork = Nakama.networks[networkId];
                const nakama = new web3.eth.Contract(
                    Nakama.abi,
                    deployedNetwork && deployedNetwork.address,
                );

                this.setState({ web3, accounts, userAccount: accounts[0], contract: nakama });
                window.ethereum.on('accountsChanged',  (accounts) => {
                    // Time to reload your interface with accounts[0]!
                    this.setState({ userAccount: accounts[0] })

                })
            } catch (error) {
                // Catch any errors for any of the above operations.
                alert(
                    `Failed to load web3, accounts, or contract. Check console for details.`,
                );
        }
    }

    onConnect = async () => {
            // Request account access if needed
            try {
                // Metmask pops up if not connected
                window.ethereum.request({method: 'eth_requestAccounts'});
                this.setState({ walletConnection: "CONNECTED" })
            }catch (error) {
                console.log(error)
            }

    };

    onMint = async () => {
        const contract = this.state.contract;
        const totalSupply = await contract.methods.totalSupply().call()
        this.setState({totalSupply})
        console.log(totalSupply)
        for (let i=1; i <= totalSupply; i++) {
           const token = await contract.methods.tokenURI(i).call()
            this.setState({nakamas: [...this.state.nakamas, token]})
        }
        console.log(this.state.nakamas)
        const nakama = await contract.methods.awardItem('0x50c8de07d6964b3b3b9DE1c35bA8bddB7a0429De', "esyj").send({
            from: this.state.accounts[0],
        })
            .once('receipt', (receipt) => {
                this.setState({
                    nakamas: [...this.state.nakamas, nakama]
                })
        })
    }

    render() {
        // if (!this.state.web3) {
        //     return(
        //         <div>
        //             Loading Web3, accounts, and contract...
        //         </div>
        //     )
        // }

        return (
            <React.Fragment>
                {/* Older browsers need a lot of normalization help*/}
                <CssBaseline />
                <Container>
                    <NavBar onConnect={this.onConnect} state={this.state}/>
                    <button onClick={this.onMint}>Mint a Nakama</button>
                    <IntroSection />
                    <br/>
                    {this.state.nakamas.map((token, key) => {
                        return(token)
                    })}
                    <MidSection />
                    <VerticalTabs />
                    <EndSection />
                    <Eye />
                </Container>
            </React.Fragment>
        );
    }
}


export default App;

