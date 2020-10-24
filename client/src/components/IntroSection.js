import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

export default function SignIn() {
    const classes = useStyles();
    const childName = "Nima"

    return (
        <Container id="intro" component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper} elevation={3} >
                <div className={classes.paper}>
                        <img alt="child" src={require('../static/child.svg')}/>
                    <Typography component="h1" variant="h5">
                        {childName}
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid>
                                <TextField id="outlined-basic" label="ETH" type="number" variant="outlined" />
                            </Grid>
                            <Grid>
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