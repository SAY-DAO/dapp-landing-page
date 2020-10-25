import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 30

});

export default class WalletButton extends React.Component {
    componentDidMount() {
        this.walletStatus()
        console.log(this.props.state.walletConnection)
    }

    walletStatus = () => {
        if(this.props.state.walletConnection !== "CONNECTED"){
            return "Connect Wallet"
        }
        return this.props.state.userAccount
    }


    render()
    {
        const walletStatus =this.walletStatus()

        return (
            <div className="App">
                <MyButton color="secondary" variant="outlined" onClick={this.props.onConnect}>
                    { walletStatus }
                </MyButton>
            </div>
        );
    }
}