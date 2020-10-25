import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import { Field, reduxForm } from "redux-form";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = ((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    grid: {
        marginTop: theme.spacing(3),
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class SubmitForm extends React.Component {

    getChild = () => {
        return "Nima"
    };

    renderInput = ({label, input, meta: { touched, invalid, error }, ...custom}) => (
        <TextField
            variant="outlined"
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )

    onSubmit(formValues) {
        // event.preventDefault() - redux-form takes care of this
        console.log(formValues)
    }

    render(){
        const child = this.getChild
        const {classes} = this.props
    return (
            <Container id="intro" component="main" maxWidth="xs">
                <CssBaseline />
                <Paper className={classes.paper} elevation={3} >
                    <div className={classes.paper}>
                        <img alt="child" src={require('../static/child.svg')}/>
                        <Typography component="h1" variant="h5">
                            {'child'}
                        </Typography>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={classes.form} noValidate>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid className={classes.grid}>
                                    <Field name="amount" component={this.renderInput} label="ETH" />
                                </Grid>
                                <Grid className={classes.grid}>
                                    <Field name="amount" component={this.renderInput} label="ETH" />
                                </Grid>
                                <Grid className={classes.grid}>
                                    <Button type="submit" variant="outlined"  color="secondary">
                                        pay with ETH
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Paper>
            </Container>
        );
    }
}

const validate = (formValues) => {
    const errors ={};
    console.log(formValues)
    if(!formValues.amount){
        errors.amount = "Enter Amount"
    }
    // parsing the formValues string to an integer
    else if(parseInt(formValues.amount, 10) < 5){
        errors.amount = 'minimum is 5 yo!'
    }

    return errors;
}

export default reduxForm({
    form: 'becomeNakama',
    validate
}) (withStyles(styles)(SubmitForm));