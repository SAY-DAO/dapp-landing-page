import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  div: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    zIndex: -1,
    top: 0,
    left: 0,
  },
  svg: {
    width: '100%',
    opacity: 0.6,
  },
});

class Circle extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <svg className={classes.svg} style={{ height: 1700 }}>
          <circle cx="200" cy="500" r="20" stroke="black" fill="#FF8799" />
          <circle cx="1900" cy="900" r="150" stroke="black" fill="#FF8799" />
          <circle cx="20" cy="1100" r="50" stroke="black" fill="#5CD0CC" />
          <circle cx="1400" cy="1400" r="20" stroke="black" fill="#5CD0CC" />
          <circle cx="400" cy="1600" r="20" stroke="black" fill="#FF8799" />
        </svg>
      </div>
    );
  }
}

export default withStyles(styles)(Circle);
