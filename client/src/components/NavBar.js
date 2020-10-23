import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-scroll";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    menuTitles: {
        marginRight: theme.spacing(2),
    }
}));

export default function NavBar() {
    const classes = useStyles();
    return (
            <div className={classes.grow}>
                <AppBar style={{ backgroundColor: "black" }} position="static">
                    <Toolbar >
                        <Typography className={classes.title} variant="h6" noWrap>
                            Material-UI
                        </Typography>
                        <div className={classes.grow} />
                        <Typography className={classes.root}>
                            <Link href="https://say.company" className={classes.menuTitles} color="inherit">
                                Home
                            </Link>
                            <Link to="midsection" smooth={true} duration={1000} className={classes.menuTitles} color="inherit">
                                About Us
                            </Link>
                            <Link to="midsection" smooth={true} duration={1000} className={classes.menuTitles} color="inherit">
                                Joi
                            </Link>

                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
}
