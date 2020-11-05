import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { deactivateModal } from '../actions';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (darkTheme) => ({
  root: {},
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 100,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  paper: {
    backgroundColor: '#110f0f',
    boxShadow: darkTheme.shadows[5],
    padding: darkTheme.spacing(2, 4, 3),
    maxWidth: 600,
    borderRadius: 41,
  },
});

class WalletButton extends React.Component {
  // handleOpen = () => {
  //   const open = true;
  // };

  handleClose = () => {
    this.props.deactivateModal();
  };

  render() {
    const open = this.props.modal;
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Paper className={classes.paper}>
              <Box>
                <Typography component="h1" variant="h4" align="center" id="transition-modal-title">
                  You have earned a Nakama
                </Typography>
                <br />
                <Typography component="p" variant="subtitle1" align="center" id="transition-modal-description">
                  To stay in touch and for the token use cases please follow us on our social medias or just regularly
                  visit this page which will be updated regularly.
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <img alt="modalChild" src={require('../static/Dokhtar.png')} style={{ margin: 20, maxWidth: 100 }} />
              </Box>
            </Paper>
          </Fade>
        </Modal>
      </div>
    );
  }
}

const mapToStateProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapToStateProps, { deactivateModal })(withStyles(styles)(WalletButton));
