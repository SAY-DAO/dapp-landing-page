import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = ((theme) => ({
    childImg: {
        maxWidth: 225,
        margin: theme.spacing(1),
        boxShadow: "10px",
        justifyContent: "center",
        background: "#501E33",
        borderRadius: "50%"
    }
}));


class TheChild extends React.Component {
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

export default withStyles(styles)(TheChild)