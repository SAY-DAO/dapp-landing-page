import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

const styles = ((theme) => ({
    childImg: {
        maxWidth: 225,
        margin: theme.spacing(1),
        boxShadow: "10px",
        justifyContent: "center"
    },
    needIcon: {
        background: "white",
        minWidth: 60,
        minHeight: 60
    }
}));


class Need extends React.Component {
    renderForm() {
        const { classes } = this.props

        if(this.props.props['childAvatarUrl']) {
            const imgUrl = this.props.props['childAvatarUrl']
            return (
                <div>
                    <Grid container>
                        <img className={classes.childImg} alt="child" src={`https:/sayapp.company${imgUrl}`} />
                    </Grid>
                    <Grid>
                        <Typography  component="h1" variant="h5" align="center">
                            {this.props.props.childSayName}
                        </Typography>
                    </Grid>
                    <Box  display="flex" p={1} m={1} alignItems="center">
                        <Box m={2}>
                            <Avatar className={classes.needIcon}>
                                <img src={`https://sayapp.company${this.props.props.imageUrl}`}  alt="need icons"/>
                            </Avatar>
                        </Box>
                        <Box>
                            <Typography  component="span" variant="subtitle1" align="center">
                                {this.props.props.name} - {this.props.props.cost}
                            </Typography>
                        </Box>
                    </Box>
                </div>
            )
        }
        return(
            <div>
                <Grid container>
                    <img className={classes.childImg} alt="child" src={require('../static/logo192.png')} />
                </Grid>
                <Grid>
                    <Typography  component="h1" variant="h5" align="center">
                        {this.props.props.childSayName}
                    </Typography>
                </Grid>
                <Box  display="flex" p={1} m={1} alignItems="center">
                    <Box m={2}>
                        <Avatar className={classes.needIcon}>
                            <img src={`https://sayapp.company${this.props.props.imageUrl}`}  alt="need icons"/>
                        </Avatar>
                    </Box>
                    <Box>
                        <Typography  component="span" variant="subtitle1" align="center">
                            {this.props.props.name} - {this.props.props.cost}
                        </Typography>
                    </Box>
                </Box>
            </div>
        )
    };

    render() {
        return(
            <div>
                { this.renderForm() }
            </div>
        )
    }
}

export default withStyles(styles)(Need)