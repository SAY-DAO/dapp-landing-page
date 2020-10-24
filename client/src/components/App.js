import React, { Component } from "react";
import loadSmartContract from "../getWeb3";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MidSection from "./MidSection";
import IntroSection from "./IntroSection";
import VerticalTabs from "./VerticalTabs";
import Eye from "./Eye";
import EndSection from "./EndSection";
import NavBar from "./NavBar";


class App extends Component {
    state = { web3: null, accounts: null, contract: null};

    connectWallet = async () => {
        const { web3, accounts, nakama } = await loadSmartContract();
        this.setState({web3, accounts, contract:nakama})
        console.log(nakama)
    }

    render() {

        return (
            <React.Fragment>
                {/* Older browsers need a lot of normalization help*/}
                <CssBaseline />
                <Container>
                    <NavBar onConnect={this.connectWallet}/>
                    <IntroSection />
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

