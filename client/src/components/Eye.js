import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const styles = (darkTheme) => ({
  root: {
    width: '100%',
    '& label.Mui-focused': {
      color: '#FFF688',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FFF688',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff',
      },
      '&:hover fieldset': {
        borderColor: '#FFF688',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFF688',
      },
    },
  },

  button: {
    margin: 'auto',
    height: 56,
    borderColor: '#8CB4C5',
    borderRadius: 10,
    border: '1px solid',
    color: 'white',
  },
});

class Eye extends React.Component {
  renderInput = ({ input, label, meta: { touched, error } }) => {
    return (
      <TextField
        variant="outlined"
        type="email"
        color="secondary"
        label="Email"
        error={touched && error}
        helperText={touched && error}
        {...input}
        style={{ border: '1px solid #ced4da', borderRadius: 10 }}
      />
    );
  };

  onSubmit = () => {
    console.log('hi');
  };

  render() {
    // const { classes } = this.props;
    return (
      <Container maxWidth="md" style={{ marginTop: 70, marginBottom: 30 }}>
        <Grid
          style={{
            margin: 'auto',
            maxWidth: 474,
            padding: 10,
          }}
        >
          <img alt="left eye" src={require('../static/eye.svg')} style={{ width: '50%' }} />
          <img alt="right eye" src={require('../static/eye.svg')} style={{ width: '50%' }} />
          <Typography align="center" variant="subtitle1" style={{ opacity: 0.3 }}>
            Where To Find Us
          </Typography>
          {/*<form onSubmit={this.props.handleSubmit(this.onSubmit)}>*/}
          {/*  <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">*/}
          {/*    <Box m={1} color="secondary">*/}
          {/*      <Field name="email" component={this.renderInput} />*/}
          {/*    </Box>*/}
          {/*    <Box style={{ margin: 'auto', height: 56 }}>*/}
          {/*      <Button type="submit" variant="outlined" color="secondary" className={classes.button}>*/}
          {/*        Join the Community*/}
          {/*      </Button>*/}
          {/*    </Box>*/}
          {/*  </Box>*/}
          {/*</form>*/}
        </Grid>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'Email', // a unique identifier for this form
  // validate, // <--- validation function given to redux-form
})(withStyles(styles)(Eye));
