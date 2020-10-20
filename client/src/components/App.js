import React, { Component } from "react";
import loadSmartContract from "../getWeb3";




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
            <div className="App">
                <div>
                    <div>
                        <h2>Mint a Nakama</h2>
                        <form>
                            <div>Child</div>
                            <div>Need</div>
                            <div>Need Cost</div>
                            <input />
                        </form>
                        <button>Pay with ETH</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
