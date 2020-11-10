import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { activateModal, fetchEthPrice, fetchNeed, fetchIsOwner, updateMintButton } from '../actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';

const styles = (darkTheme) => ({
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
      '& .Mui-focused fieldset': {
        borderColor: '#FFF688',
      },
    },
  },
  more: {
    fontSize: darkTheme.typography.pxToRem(15),
    fontWeight: darkTheme.typography.fontWeightRegular,
    fontFamily: 'Big Shoulders Inline Text',
  },
  accordion: {
    background: '#000000',
  },
  border: {
    borderColor: '#ffeb90',
    width: '80%',
    marginBottom: 10,
    marginLeft: 25,
    style: { width: '5rem', height: '5rem' },
    zIndex: 1000,
  },
  needIcon: {
    background: '#000000',
    width: 60,
    height: 60,
  },
  button1: {
    margin: 'auto',
    height: 56,
    borderColor: '#8CB4C5',
    borderRadius: 3,
    border: '1px solid',
    color: 'white',
  },
  button2: {
    borderColor: '#8CB4C5',
    borderRadius: 3,
    border: '1px solid',
    color: 'white',
  },
});

class TheNeed extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchNeed();
    const needFetchedCost = this.props.fetchedNeed.cost;
    await this.props.fetchEthPrice(needFetchedCost);
    await this.isOwner();
    if (this.props.theWallet.nakamaOwner) {
      await this.props.updateMintButton('Pay for Need', 'enabled');
    } else {
      await this.props.updateMintButton('Mint NAK', 'enabled');
    }
  };

  randomNeed = async (event) => {
    event.preventDefault();
    await this.props.fetchNeed();
    if (this.props.theWallet.nakamaOwner) {
      await this.props.updateMintButton('Pay for Need', 'enabled');
    } else {
      await this.props.updateMintButton('Mint NAK', 'enabled');
    }
    // Adding commas to price
    // const fetchedCostCleaned = needFetchedCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  };

  isOwner = async () => {
    let isOwner = false;
    try {
      const userAccount = this.props.theWallet.userAccount;
      const contract = this.props.theWallet.contract;
      const totalSupply = await contract.methods.totalSupply().call();
      for (let i = 1; i <= totalSupply; i++) {
        const owner = await contract.methods.ownerOf(i).call();
        if (userAccount.toLowerCase() === owner.toLowerCase()) {
          isOwner = true;
        }
      }
    } catch (error) {
      console.log("Can't load Nakamas: ", error);
    }
    await this.props.fetchIsOwner(isOwner);
  };

  onMint = async (formValues) => {
    await this.isOwner();
    const theNeed = this.props.fetchedNeed.id;
    // Solidity need uint256 type
    const needValueEth = this.props.fetchedEth.needEthCost;
    const web3 = await this.props.theWallet.web3;

    let needValueWei;
    // When no input is inserted by the user
    if (formValues.amount === undefined) {
      needValueWei = web3.utils.toWei(needValueEth.toString(), 'ether');
    } else {
      needValueWei = web3.utils.toWei(formValues.amount.toString(), 'ether');
    }

    try {
      const userAccount = this.props.theWallet.userAccount;
      const contract = this.props.theWallet.contract;
      const isOwner = this.props.theWallet.nakamaOwner;
      if (!isOwner) {
        await contract.methods
          .awardToken(userAccount, `https://sayapp.company/api/v2/public/needs/${theNeed}`)
          .send({
            from: userAccount,
            value: needValueWei,
          })
          .once('receipt', async (receipt) => {
            this.props.activateModal();
            await this.props.updateMintButton('Minted <3', 'disabled');
            await this.props.fetchIsOwner(true);
          });
      } else {
        await contract.methods
          .transferAmount(userAccount, `https://sayapp.company/api/v2/public/needs/${theNeed}`)
          .send({
            from: userAccount,
            value: needValueWei,
          })
          .once('receipt', async (receipt) => {
            alert('ETH is transferred');
            await this.props.updateMintButton('Paid :)', 'disabled');
          });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  renderInput = ({ input, label, meta: { touched, error } }) => {
    const needEthCost = this.props.fetchedEth.needEthCost;
    return (
      <TextField
        variant="outlined"
        type="number"
        color="secondary"
        label={`min ${label}`}
        inputProps={{ min: needEthCost, step: 'any' }}
        error={touched && error}
        helperText={touched && error}
        {...input}
        style={{ fontSize: 3 }}
      />
    );
  };

  renderTheForm = () => {
    const { classes } = this.props;
    if (this.props.theWallet.userAccount && this.props.fetchedEth.needEthCost) {
      const needEthCost = this.props.fetchedEth.needEthCost;
      return (
        <form onSubmit={this.props.handleSubmit(this.onMint)}>
          <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">
            <Box m={1} style={{ width: '50%', maxHeight: '70%' }} color="secondary">
              <Field
                name="amount"
                component={this.renderInput}
                style={{ border: '1px solid #ced4da' }}
                label={needEthCost ? needEthCost : '0'}
                defaultValue={needEthCost}
              />
            </Box>
            <Box style={{ margin: 'auto', height: 56 }}>
              <Button type="submit" variant="outlined" color="secondary" className={classes.button1}>
                {this.props.mintButton.text}
              </Button>
            </Box>
          </Box>
        </form>
      );
    }
    return (
      <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">
        <Box m={1} style={{ width: '50%', maxHeight: '70%' }} color="secondary">
          <Field name="amount" component={this.renderInput} label="ETH" style={{ border: '1px solid #ced4da' }} />
        </Box>
        <Box style={{ margin: 'auto', height: 56 }}>
          <Button type="submit" variant="outlined" color="secondary" className={classes.button1} disabled>
            Connect Wallet
          </Button>
        </Box>
      </Box>
    );
  };

  render() {
    const { classes } = this.props;
    if (this.props.fetchedNeed) {
      return (
        <div className={classes.root}>
          <Box display="flex" p={1} m={1} justifyContent="center">
            <form name="form1" onSubmit={this.randomNeed} noValidate>
              <Button type="submit" variant="outlined" color="secondary" className={classes.button2}>
                Random Search
              </Button>
            </form>
          </Box>
          <Box>{this.renderTheForm()}</Box>
          <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">
            <Box>
              <Avatar className={classes.needIcon}>
                <img
                  src={`https://sayapp.company${this.props.fetchedNeed.imageUrl}`}
                  alt="need icons"
                  style={{ maxWidth: 60 }}
                />
              </Avatar>
            </Box>
            <Box p={1}>
              <Typography
                component="p"
                variant="subtitle1"
                align="center"
                style={{ fontFamily: 'Big Shoulders Inline Text', fontSize: '1rem' }}
              >
                {this.props.fetchedNeed.name}
              </Typography>
            </Box>
            <Box p={1}>
              <Typography
                component="p"
                variant="subtitle1"
                align="center"
                style={{ fontFamily: 'Big Shoulders Inline Text', fontSize: '1rem' }}
              >
                {this.props.fetchedEth.needEthCost}
              </Typography>
            </Box>
            <Box pt={2}>
              <img alt="eth" src={require('../static/eth.svg')} />
            </Box>
          </Box>

          <Grid>
            <div className={classes.root}>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.more}>More...</Typography>
                </AccordionSummary>
                <Box display="flex" justifyContent="center" className={classes.border}>
                  <Box borderTop={1} className={classes.border} />
                </Box>
                <AccordionDetails>
                  <Typography style={{ fontSize: '0.7rem' }}>
                    Nakama (NAK) is an ERC-721/non fungible token that is created by contributing to SAY ecosystem such
                    as paying a need, taking part in building the software, or helping with the logistic side of SAY.
                    NAK is meant to be created only once per person. NAK tokens are NOT valued based on the way you
                    choose to contribute and are NOT designed to be traded rather behold as a bond between us and a
                    community membership token to get involved in the SAY ecosystem. Moreover, this also helps with
                    lower ethereum gas costs for further transactions. More information about tokens use cases will be
                    released in the upcoming weeks.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        </div>
      );
    }
  }
}

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const validate = (values) => {
  // return sleep(1000) // simulate server latency
  //     .then(() => {
  const errors = {};
  if (!values.amount) {
    errors.amount = 'Required';
  } else if (isNaN(Number(values.amount))) {
    errors.amount = 'Must be a number';
  } else if (values.amount === '') {
    errors.amount = `Minimum price to mint is the price of the need`;
  }
  return errors;
  // })
};

const formWrapped = reduxForm({
  form: 'Mint', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(withStyles(styles)(TheNeed));

const mapStateToProps = (state) => {
  return {
    fetchedNeed: state.need,
    fetchedEth: state.ethPrice,
    theWallet: state.wallet,
    modal: state.modal,
    mintButton: state.mintButton,
  };
};

export default connect(mapStateToProps, { fetchEthPrice, fetchNeed, activateModal, fetchIsOwner, updateMintButton })(
  formWrapped,
);
