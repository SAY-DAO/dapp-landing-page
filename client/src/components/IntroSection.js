import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { mintedNakama } from '../actions';
import TheChild from './TheChild';
import TheNeed from './TheNeed';

const styles = (darkTheme) => ({
  paper: {
    marginTop: darkTheme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 18,
  },
  paper2: {
    background: '#000000',
    width: '85%',
    margin: 15,
    borderRadius: 18,
  },
  grid: {
    marginTop: darkTheme.spacing(3),
  },

  avatar: {
    maxWidth: '75%',
    margin: darkTheme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: darkTheme.spacing(1),
  },
  submit: {
    margin: darkTheme.spacing(3, 0, 2),
  },
});

class IntroSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container id="intro" component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper} elevation={3}>
          <div className={classes.paper}>
            <Grid container direction="column" justify="center" alignItems="center">
              <TheChild />
              <Paper className={classes.paper2}>
                <TheNeed />
              </Paper>
            </Grid>
          </div>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theWallet: state.wallet,
    fetchedTokens: state.tokens,
  };
};

export default connect(mapStateToProps, { mintedNakama })(withStyles(styles)(IntroSection));
