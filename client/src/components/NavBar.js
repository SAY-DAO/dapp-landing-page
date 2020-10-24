import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import WalletButton from "./WalletButton";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme) => ({
    root: {
        flexGrow: 1
    },
    grid: {

    },
    imgGrid: {
        alignItems: "center",

    },
    buttonGrid: {
        justifyContent: "flex-end",
        direction: "row",
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex"
        }
    }

});



class NavBar extends React.Component {
    render() {
    const renderButton = ( <WalletButton onConnect={this.props.onConnect}/>);

    const {classes} = this.props
    return (
        <div>
            <AppBar style={{backgroundColor: "black"}} position="static">
                <Toolbar>
                    <Grid container>
                        <Grid container className={classes.imgGrid} item xs={6}>
                            <img alt="logo" src={require('../static/sayLogo.png')}/>
                        </Grid>
                        <Grid  container className={classes.buttonGrid} item xs={6}>
                            {renderButton}
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

export default withStyles(styles)(NavBar)

