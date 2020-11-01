import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {GitHub, Instagram, Telegram, Twitter, Link} from "@material-ui/icons";


const styles = (darkTheme) => ({
    root: {
        flexGrow: 1
    },

    buttonGrid: {
        justifyContent: "flex-end",
        direction: "row",
        display: "none",
        [darkTheme.breakpoints.up("sm")]: {
            display: "flex"
        }
    }

});



class NavBar extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <AppBar style={{backgroundColor: "transparent"}} position="static">
                    <Toolbar>
                        <Grid container>
                            <Grid container item xs={12} justify={"center"}>
                                <Instagram style={{ color: "gray" }} />
                                <Twitter style={{ color: "gray" }} />
                                <GitHub style={{ color: "gray" }} />
                                <Telegram style={{ color: "gray" }} />
                                <Link style={{ color: "gray" }} />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NavBar)

