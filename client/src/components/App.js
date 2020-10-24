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
        web3: null,
        userAccount: null,
        contract: null
    };


    loadSmartContract = async () => {
        try {

            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            this.setState({ web3 })
            // Request account access if needed
            await window.ethereum.enable();
            // Use web3 to get the user's accounts.
            const accounts =  await web3.eth.getAccounts();
            this.setState({ userAccount: accounts[0] })

            window.ethereum.on('accountsChanged',  (accounts) => {
                // Time to reload your interface with accounts[0]!
                this.setState({ userAccount: accounts[0] })
            })

            // Get the contract instance.
            const networkId =  web3.eth.net.getId();

            const deployedNetwork = Nakama.networks[networkId];
            const nakama = new web3.eth.Contract(
                Nakama.abi,
                deployedNetwork && deployedNetwork.address,
            );
            return {web3, accounts, nakama}
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
        }

    };

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
                    <NavBar onConnect={this.loadSmartContract} />
                    <IntroSection />
                    {this.state.userAccount}
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

