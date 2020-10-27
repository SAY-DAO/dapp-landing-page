import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import { Field, reduxForm } from "redux-form";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import {fetchNeed, mintedNakama} from '../actions'
import {Box} from "@material-ui/core";
import TheChild from "./TheChild";
import TheNeed from "./TheNeed";


const styles = ((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    grid: {
        marginTop: theme.spacing(3),
    },

    avatar: {
        maxWidth: "75%",
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));



class SubmitForm extends React.Component {
    componentDidMount = async () => {
        this.props.fetchNeed()
    }

    getContract = async () => {
        let contract = {}
        let totalSupply = null
        let NAKS = {}

        try{
            contract = this.props.theWallet.contract;
            totalSupply = await contract.methods.totalSupply().call();
            const userAccount = this.props.theWallet.userAccount

            for (let i=1; i <= totalSupply; i++) {
                const NAK = await contract.methods.tokenURI(i).call();
                NAKS = {...NAKS, [`${i} -- ${userAccount}`]:NAK}
            }
            console.log(NAKS)

        }catch (error) {
            console.log("Can't load Nakamas: ", error)
        }
        return { contract, totalSupply }
    }


    onMint = async () => {
        const contract = (await this.getContract()).contract
        const totalSupply = (await this.getContract()).totalSupply
        console.log("Smart Contract: ", contract)
        console.log("Total Supply: ", totalSupply)
        const userAccount = this.props.theWallet.accounts[0]
        const theNeed = this.props.fetchedNeed

        try{
            const nakama = await contract.methods.awardItem(userAccount, JSON.stringify(theNeed)).send({
                from: this.props.theWallet.accounts[0],
            })
                .once('receipt', (receipt) => {
                    console.log("nakama")
                })
        }catch (error) {
            if(error.code === -32603)
                console.log("Sorry! This Need Has Been Already Payed")
        }
        }



    renderInput = ({label, input, meta: { touched, invalid, error }}) => (
        <TextField
            variant="outlined"
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
        />
    )

    randomNeed = () => {
        this.props.fetchNeed()
    }


    render(){
        const {classes} = this.props
    return (
            <Container id="intro" component="main" maxWidth="xs">
                <CssBaseline />
                <Paper className={classes.paper} elevation={3} >
                <div className={classes.paper}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <TheChild props={this.props.fetchedNeed}/>
                            <Grid className={classes.grid}>
                                <Field name="amount"  component={this.renderInput} label="ETH" />
                            </Grid>
                            <Box  display="flex" p={1} m={1} alignItems="center">
                                <Box m={2}>
                                    <form name="form1" onSubmit={this.props.handleSubmit(this.randomNeed)} className={classes.form} noValidate>
                                        <Button  type="submit" variant="outlined"  color="secondary">
                                            Random Need
                                        </Button>
                                    </form>
                                </Box>
                                <Box m={2}>
                                    <form name="form2" onSubmit={this.props.handleSubmit(this.onMint)} className={classes.form} >
                                        <Button type="submit" variant="outlined"  color="secondary">
                                            pay with ETH
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                            <Paper style={{ background: "#000000", width: "90%" ,marginBottom: 10}}>
                                <TheNeed props={this.props.fetchedNeed}/>
                            </Paper>
                        </Grid>
                    </div>
                </Paper>
            </Container>
        );
    }
}

const validate = (formValues) => {
    const errors ={};

    if(!formValues.amount){
        errors.amount = "Enter Amount"
    }
    // parsing the formValues string to an integer
    else if(parseInt(formValues.amount, 10) < 5){
        errors.amount = 'minimum is 5 yo!'
    }

    return errors;
}

const formWrapped = reduxForm({
    form: 'becomeNakama',
    validate
}) (withStyles(styles)(SubmitForm));


const mapStateToProps = state => {
    return{
        fetchedNeed: state.need,
        theWallet: state.wallet,
        fetchedTokens: state.tokens
    }
}


export default connect(mapStateToProps, { fetchNeed, mintedNakama })(formWrapped);