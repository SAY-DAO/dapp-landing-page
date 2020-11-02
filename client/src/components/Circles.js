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
    console.log(this);
    const { classes } = this.props;
    return (
      <div className={classes.div}>
        <svg className={classes.svg} style={{ height: 1900 }}>
          <circle cx="200" cy="500" r="20" stroke="black" strokeWidth="3" fill="#5CD0CC" />
          <circle cx="1900" cy="900" r="150" stroke="black" strokeWidth="3" fill="#FF8799" />
          <circle cx="20" cy="1200" r="50" stroke="black" strokeWidth="3" fill="#5CD0CC" />
          <circle cx="1400" cy="1500" r="20" stroke="black" strokeWidth="3" fill="#5CD0CC" />
          <circle cx="400" cy="1800" r="20" stroke="black" strokeWidth="3" fill="#FF8799" />
        </svg>
      </div>
    );
  }
}

export default withStyles(styles)(Circle);
