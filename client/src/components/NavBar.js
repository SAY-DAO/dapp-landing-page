import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WalletButton from './WalletButton';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Alert from '@material-ui/lab/Alert';

const styles = (darkTheme) => ({
  root: {
    [darkTheme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    [darkTheme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    }
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
              <Grid container alignItems="center" item xs={12} sm={3} className={classes.root}>
                <img alt="logo" src={require('../static/sayLogo.png')} />
              </Grid>
              <WalletButton />
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
