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
import { fetchNeed } from '../actions'
import Need from "./Need";


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
    componentDidMount() {
        this.props.fetchNeed()
    }

    onMint = async () => {
        const contract = this.props.theWallet.contract;
        console.log(contract)
        try{
            const totalSupply = await contract.methods.totalSupply().call()
            console.log(`total supply: ${totalSupply}`)
            for (let i=1; i <= totalSupply; i++) {
                const token = await contract.methods.tokenURI(i).call()
                this.setState({nakamas: [...this.props.nakamas, token]})
            }
        }catch (error) {
            console.log("error: ", error)
        }

        console.log(this.props.theWallet.accounts[0])

        const nakama = await contract.methods.awardItem('0x9F48492751919439DEeAeaFd1C096555730CD182', "first nakama").send({
            from: this.props.theWallet.accounts[0],
        })
            // .once('receipt', (receipt) => {
            //     this.setState({
            //         nakamas: [...this.props.nakamas, nakama]
            //     })
            // })
        console.log(nakama)
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
                            <Need props={this.props.fetchedNeed}/>
                            <Grid>
                                <form name="form1" onSubmit={this.props.handleSubmit(this.randomNeed)} className={classes.form} noValidate>
                                    <Button  type="submit" variant="outlined"  color="secondary">
                                        Random Need
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                        <form name="form2" onSubmit={this.props.handleSubmit(this.onMint)} className={classes.form} >
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid className={classes.grid}>
                                    <Field name="amount"  component={this.renderInput} label="ETH" />
                                </Grid>
                                <Grid className={classes.grid}>
                                    <Button type="submit" variant="outlined"  color="secondary">
                                        pay with ETH
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
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
        theWallet: state.wallet
    }
}


export default connect(mapStateToProps, { fetchNeed })(formWrapped);