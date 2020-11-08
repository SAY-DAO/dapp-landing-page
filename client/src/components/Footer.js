import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { GitHub, Instagram, Telegram, Twitter, Link } from '@material-ui/icons';

const styles = (darkTheme) => ({
  root: {
    flexGrow: 1,
  },

  buttonGrid: {
    justifyContent: 'flex-end',
    direction: 'row',
    display: 'none',
    [darkTheme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
});

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Grid style={{ backgroundColor: 'transparent' }} position="static">
          <Toolbar>
            <Grid container>
              <Grid container item xs={12} justify={'center'}>
                <a href="https://instagram.com/say.company" target="_blank">
                  <Instagram style={{ color: 'gray' }} />
                </a>
                <a href="https://twitter.com/say_company" target="_blank">
                  <Twitter style={{ color: 'gray' }} />
                </a>
                <a href="https://github.com/saycompany" target="_blank">
                  <GitHub style={{ color: 'gray' }} />
                </a>
                <a href="https://t.me/saycompany" target="_blank">
                  <Telegram style={{ color: 'gray' }} />
                </a>
                <a href="https://say.company" target="_blank">
                  <Link style={{ color: 'gray' }} />
                </a>
              </Grid>
            </Grid>
          </Toolbar>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
