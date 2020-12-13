import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WalletButton from './WalletButton';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Alert from '@material-ui/lab/Alert';

const styles = (darkTheme) => ({
  root: {
    flexGrow: 1,
  },

  buttonGrid: {
    justifyContent: 'flex-end',
    direction: 'row',
    // O to sm size until the break
    // display: 'inlineBlock',
    [darkTheme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  alert: {
    display: 'flex',
    [darkTheme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        {/*<Alert className={classes.alert} severity="warning">*/}
        {/*  Please use the desktop version if you are having trouble on mobile while we are working on this version!*/}
        {/*</Alert>*/}
        <AppBar style={{ backgroundColor: 'transparent', marginTop: '10px' }} position="static">
          <Toolbar>
            <Grid container>
              <Grid container alignItems="center" item xs={4}>
                <img alt="logo" src={require('../static/sayLogo.png')} />
              </Grid>
              <Grid container className={classes.buttonGrid} item xs={8}>
                <WalletButton />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
