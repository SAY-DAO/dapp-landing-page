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

const styles = ((darkTheme) => ({
    root: {
        width: '100%',
        '& label.Mui-focused': {
            color: '#FFF688',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FFF688',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#ffffff',
            },
            '&:hover fieldset': {
                borderColor: '#FFF688',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FFF688',
            },
        },
    },
    more: {
        fontSize: darkTheme.typography.pxToRem(15),
        fontWeight: darkTheme.typography.fontWeightRegular,
        fontFamily: 'Londrina Shadow'
    },
    accordion: {
      background: "#000000",
    },
    border: {
        borderColor: '#8CB4C5',
        width: "80%",
        marginBottom: 10,
        marginLeft: 25,
        style: { width: '5rem', height: '5rem' },
        zIndex: 1000
    },
    needIcon: {
        background: "#000000",
        minWidth: 60,
        minHeight: 60
    },
    button1: {
       margin: "auto",
        height: 56,
        borderColor: '#8CB4C5',
        borderRadius: 3,
        border: "1px solid",
        color: "white"

    },

    button2: {
        borderColor: '#8CB4C5',
        borderRadius: 3,
        border: "1px solid",
        color: "white"
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


    randomNeed = async (event) => {
        event.preventDefault()
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
        console.log("huh")
        const contract = (await this.getContract()).contract
        const totalSupply = (await this.getContract()).totalSupply
        console.log("Smart Contract: ", contract)
        console.log("Total Supply: ", totalSupply)
        const userAccount = this.props.theWallet.userAccount
        const theNeed = this.props.fetchedNeed
        console.log(userAccount)

        try{
            const nakama = await contract.methods.awardItem(userAccount, JSON.stringify(theNeed)).send({
                from: this.props.theWallet.accounts[0],
            })
                .once('receipt', (receipt) => {
                    console.log("NAK Receipt")
                })
        }catch (error) {
            if(error.code === -32603)
                console.log("Sorry! This Need Has Been Already Payed")
        }
    }

    renderInput = ({label, input, meta: { touched, invalid, error }}) => (
        <TextField
            variant="outlined"
            type="number"
            color="secondary"
            label={label}
            inputProps={{ min: this.props.fetchedEth.needEthCost,  step: "any"}}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
        />
    )

    renderTheForm = () => {
        const { classes } = this.props
        if (this.props.theWallet.userAccount && this.props.fetchedEth.needEthCost){

            return (
                <form name="form2" onSubmit={this.props.handleSubmit(this.onMint)}>
                    <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">
                        <Box m={1} style={{ width: "50%", maxHeight: "70%"}}  color="secondary" >
                            <Field name="amount" component={this.renderInput} label="ETH" style={{  border: '1px solid #ced4da'}} />
                        </Box>
                        <Box style={{ margin: "auto", height: 56}}>
                            <Button type="submit" variant="outlined"  color="secondary" className={classes.button1}>
                                Mint NFT
                            </Button>
                        </Box>
                    </Box>
                </form>
            )
        }
        return (
                <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">
                    <Box m={1} style={{ width: "50%", maxHeight: "70%"}}  color="secondary" >
                        <Field name="amount" component={this.renderInput} label="ETH" style={{  border: '1px solid #ced4da'}} />
                    </Box>
                    <Box style={{ margin: "auto", height: 56}}>
                        <Button type="submit" variant="outlined"  color="secondary" className={classes.button1} disabled>
                            Connect Wallet
                        </Button>
                    </Box>
                </Box>
        )


        }


    render() {
        let  user = this.props.theWallet.userAccount
        let needEthCost = this.props.fetchedEth.needEthCost
        const { classes } = this.props
        if(this.props.fetchedNeed) {
            return (
                <div className={classes.root}>
                    <Box display="flex" p={1} m={1} justifyContent="center">
                        <form name="form1" onSubmit={this.randomNeed} noValidate >
                            <Button type="submit" variant="outlined" color="secondary" className={ classes.button2 }>
                                Random Search
                            </Button>
                        </form>
                    </Box>
                    <Box>
                        { this.renderTheForm() }
                    </Box>
                    <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">
                        <Box>
                            <Avatar className={classes.needIcon}>
                                <img src={`https://sayapp.company${this.props.fetchedNeed.imageUrl}`} alt="need icons"/>
                            </Avatar>
                        </Box>
                        <Box p={1}>
                            <Typography component="p" variant="subtitle1" align="center" style={{ fontFamily: 'Londrina Shadow', fontSize:"1.2rem" }}>
                                {this.props.fetchedNeed.name}
                            </Typography>
                        </Box>
                        <Box p={1}>
                            <Typography component="p" variant="subtitle1" align="center" style={{ fontFamily: 'Londrina Shadow', fontSize:"1.2rem" }}>
                                { this.props.fetchedEth.needEthCost}
                            </Typography>
                        </Box>
                        <Box pt={2}>
                            <img alt="eth" src={require('../static/eth.svg')} />
                        </Box>
                    </Box>

                    <Grid>
                        <div className={classes.root}>
                            <Accordion className={classes.accordion}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography className={classes.more}>More...</Typography>
                                </AccordionSummary>
                                <Box display="flex" justifyContent="center" className={classes.border}>
                                    <Box borderTop={1} className={classes.border}/>
                                </Box>
                                <AccordionDetails>
                                    <Typography style={{ fontFamily: 'Londrina Shadow'}} >
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

const validate = values => {
    console.log(values)
    const errors = {}
    if (!values.amount) {
        errors.amount = 'Required'
    // } else if (isNaN(Number(values.amount))) {
    //     errors.amount = 'Must be a number'
    // } else if (Number(values.amount) < 18) {
    //     errors.amount = `Minimum price to mint is the price of the need`
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.amount < 19 ) {
        warnings.amount = 'Hmm, you seem a bit young...'
    }
    return warnings
}


const formWrapped = reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
})(withStyles(styles)(TheNeed))

const mapStateToProps = state => {
    return{
        fetchedNeed: state.need,
        fetchedEth: state.ethPrice,
        theWallet: state.wallet
    }
}


export default connect(mapStateToProps, {fetchEthPrice, fetchNeed})(formWrapped)