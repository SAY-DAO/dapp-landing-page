import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { fetchNeed } from '../actions';

const styles = (darkTheme) => ({
  childImg: {
    maxWidth: 225,
    maxHeight: 225,
    margin: darkTheme.spacing(1),
    justifyContent: 'center',
    background: '#7f3536',
    borderRadius: '50%',
  },
  
  spacing: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

class TheChild extends React.Component {
  renderForm() {
    const { classes } = this.props;
    if (this.props.fetchedNeed['childAvatarUrl']) {
      const imgUrl = this.props.fetchedNeed['childAvatarUrl'];
      return (
        <div>
          <Grid container>
            <img className={classes.childImg} alt="child" src={`https://sayapp.company${imgUrl}`} />
          </Grid>
          <Grid>
            <Typography component="h1" variant="h5" align="center" className={classes.spacing}>
              {this.props.fetchedNeed.childSayName}
            </Typography>
          </Grid>
        </div>
      );
    }
    return (
      <div>
        <Grid container>
          <img className={classes.childImg} alt="child" src={require('../static/circle.png')} />
        </Grid>
        <Grid>
          <Typography component="h1" variant="h5" align="center" className={classes.spacing}>
            {this.props.fetchedNeed.childSayName}
          </Typography>
        </Grid>
      </div>
    );
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { fetchedNeed: state.need };
};

export default connect(mapStateToProps, { fetchNeed })(withStyles(styles)(TheChild));
