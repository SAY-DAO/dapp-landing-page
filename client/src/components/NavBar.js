import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WalletButton from './WalletButton';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (darkTheme) => ({
  root: {
    flexGrow: 1,
  },

  imgGrid: {
    alignItems: 'center',
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
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar style={{ backgroundColor: 'transparent' }} position="static">
          <Toolbar>
            <Grid container>
              <Grid container className={classes.imgGrid} item xs={2}>
                <img alt="logo" src={require('../static/sayLogo.png')} />
              </Grid>
              <Grid container className={classes.buttonGrid} item xs={10}>
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
