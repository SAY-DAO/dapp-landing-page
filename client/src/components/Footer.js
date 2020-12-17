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

  icons: {
    color: 'gray',
    '&:hover': {
      color: '#ffeb90',
    }
  }
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid style={{ backgroundColor: 'transparent', marginBottom: 30 }} position="static">
          <Toolbar>
            <Grid container justify='center'>
              <Grid container item sm={8} lg={3} justify='space-around'>
                <a href="https://instagram.com/say.company" target="_blank" rel="noopener noreferrer">
                  <Instagram className={classes.icons} />
                </a>
                <a href="https://twitter.com/say_company" target="_blank" rel="noopener noreferrer">
                  <Twitter className={classes.icons} />
                </a>
                <a href="https://github.com/saycompany" target="_blank" rel="noopener noreferrer">
                  <GitHub className={classes.icons} />
                </a>
                <a href="https://t.me/saycompany" target="_blank" rel="noopener noreferrer">
                  <Telegram className={classes.icons} />
                </a>
                <a href="https://say.company" target="_blank" rel="noopener noreferrer">
                  <Link className={classes.icons} />
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
