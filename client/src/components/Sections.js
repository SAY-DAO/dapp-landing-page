import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(6),
        paddingLeft:100,
        margin: 'auto',
        maxWidth: 1440,
    },
    image: {
        border: "5px solid #ffffff",
        background: '#05596c',
        zIndex: 200
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        padding: theme.spacing(8),

    },
}));
const message = "ERC-721 has since moved out of beta and into a community formalized v1 spec, supported and endorsed by" +
    " a large number of projects from a number of community membecross the cryp number of community membe number of community " +
    "membe number of community membeto ecosystem. This EIP wouldn't be possible without time anddedication from a number " +
    "of co number of community membemmunity m number of community membe number of community membeembe number of community " +
    "membe number of community members. Special thanks to @fulldecent and others who have put in tremendousamounts of" +
    "work to push this forward"

export default function ComplexGrid() {
    const classes = useStyles();

    return (
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={require('../static/logo192.png')} />
                        </ButtonBase>
                        <div style={{ height: '100%', maxHeight: 350, position: "relative"}}>
                            <Paper variant="outlined" style={{height: '100%', width: '100%', maxWidth: 350, maxHeight: 350, left: -80, bottom: 240, position: "absolute", borderColor: "#FFF688"}}>
                            </Paper>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm container>
                        <Grid item sm container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" style={{  maxHeight: 350, position: "relative"}}>
                                    <Paper variant="outlined" style={{minWidth: 250, left: -100, bottom: -100, position: "absolute", background: "#ffffff", color: "#000000", zIndex: 300,}}>
                                        <Typography xs gutterBottom variant="subtitle1"  style={{  maxHeight: 122, minWidth:250, maxWidth:445}}>
                                            721 has since moved out of beta and into a community formalized v1 spec, supported and endorsed by"
                                        </Typography>
                                    </Paper>
                                </Typography>
                                <Typography xs gutterBottom variant="subtitle1" style={{  minWidth: 250, marginTop: 140}}>
                                    Standard license
                                </Typography>
                                <Typography variant="body1" gutterBottom  style={{  minWidth: 250 }}>
                                    {message}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    More...
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
    );
}