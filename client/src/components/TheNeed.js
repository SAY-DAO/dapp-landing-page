import React from 'react';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import {fetchEthPrice, fetchNeed} from "../actions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import {Field, reduxForm} from "redux-form";
import TextField from "@material-ui/core/TextField";

const styles = ((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordion: {
      background: "#000000"
    },
    border: {
        borderColor: '#FFF688',
        width: "80%",
        margin: 10,
        style: { width: '5rem', height: '5rem' },
        zIndex: 1000
    },
    needIcon: {
        background: "#000000",
        minWidth: 60,
        minHeight: 60
    }
}));


class TheNeed extends React.Component {
    componentDidMount = async () => {
        await this.props.fetchNeed()
        const needFetchedCost = this.props.fetchedNeed.cost
        await this.props.fetchEthPrice(needFetchedCost)

        // Adding commas to price
        const fetchedCostCleaned = needFetchedCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        console.log(needFetchedCost, fetchedCostCleaned, this.props.fetchedEth)
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

    randomNeed = async () => {
        await this.props.fetchNeed()
        const needFetchedCost = this.props.fetchedNeed.cost
        await this.props.fetchEthPrice(needFetchedCost)
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
                    console.log({nakama})
                })
        }catch (error) {
            if(error.code === -32603)
                console.log("Sorry! This Need Has Been Already Payed")
        }
    }

    render() {
    const { classes } = this.props
    if(this.props.fetchedNeed) {
        return (
            <div>
                <Grid className={classes.grid}>
                    <Field name="amount" component={this.renderInput} label="ETH"/>
                </Grid>
                <Box display="flex" p={1} m={1} alignItems="center">

                    <Box m={2}>
                        <form name="form1" onSubmit={this.props.handleSubmit(this.randomNeed)} className={classes.form}
                              noValidate>
                            <Button type="submit" variant="outlined" color="secondary">
                                Random Need
                            </Button>
                        </form>
                    </Box>
                    <Box m={2}>
                        <form name="form2" onSubmit={this.props.handleSubmit(this.onMint)} className={classes.form}>
                            <Button type="submit" variant="outlined" color="secondary">
                                pay with ETH
                            </Button>
                        </form>
                    </Box>
                </Box>
                <Box display="flex" p={1} m={1} alignItems="center">
                    <Box m={2}>
                        <Avatar className={classes.needIcon}>
                            <img src={`https://sayapp.company${this.props.fetchedNeed.imageUrl}`} alt="need icons"/>
                        </Avatar>
                    </Box>
                    <Box>
                        <Typography component="p" variant="subtitle1" align="center">
                            {this.props.fetchedNeed.name} -- { this.props.fetchedEth.needEthCost}
                        </Typography>
                    </Box>
                </Box>
                <Grid>
                    <div className={classes.root}>
                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>More...</Typography>
                            </AccordionSummary>
                            <Box display="flex" justifyContent="center" className={classes.border}>
                                <Box borderTop={1} className={classes.border}/>
                            </Box>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Grid>
            </div>
        )
    }
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


const mapStateToProps = state => {
    return{
        fetchedNeed: state.need,
        fetchedEth: state.ethPrice
    }
}

const formWrapped = reduxForm({
    form: 'becomeNakama',
    validate
}) (withStyles(styles)(TheNeed));


export default connect(mapStateToProps, {fetchEthPrice, fetchNeed})(formWrapped)