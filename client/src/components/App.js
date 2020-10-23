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

    componentDidMount = async () => {
        const { web3, accounts, nakama } = await loadSmartContract();
        this.setState({web3, accounts, contract:nakama})
        console.log(nakama)
    }

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <React.Fragment>
                {/* Older browsers need a lot of normalization help*/}
                <CssBaseline />
                <Container>
                    {/*<NavBar />*/}
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

