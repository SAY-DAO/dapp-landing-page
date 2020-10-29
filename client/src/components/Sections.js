import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((darkTheme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: darkTheme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
        borderRadius: 18

    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function ComplexGrid() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={require('../static/logo192.png')} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Crowd Sourcing
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    We believe borders should not separate people from each other and our focuse is global
                                    have lost connection to lost connection to the internet. This app is offline.
                                    children are chosen diff iranian / afghans and say does not select on basis of race, religion and ..
                                    chosenwhere we can access them care to join and connect international ngo?
                                    You have lost connectionlost connection to  to the internet. This app is offline.
                                    You have lost connectiolost connection to n to the internet. This app is offline.
                                    You have lost connectiolost connection to n to the internet. This app is offline.
                                    You have lost connectc iolost connection to n to the internet. This app is offline.
                                    You have lost connectiolost connection to n to the internet. This app is offline.
                                    You have lost connectiolost connection to n to the internet. This app is offline.
                                    You have lost connection to the internet. This app is offline.
                                    You have lost connection to the internet. This app is offline.
                                    You have lost connection to the internet. This app is offline.
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    more ...
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}