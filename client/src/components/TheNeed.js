import React from 'react';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";

const styles = ((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordion: {
      background: "#000000"
    },
    border: {
        borderColor: '#FFF688',
        width: "80%",
        margin: 10,
        style: { width: '5rem', height: '5rem' },
        zIndex: 1000
    },
    needIcon: {
        background: "#000000",
        minWidth: 60,
        minHeight: 60
    }
}));


class TheChild extends React.Component {
    renderForm() {
        const { classes } = this.props

        if(this.props.props['childAvatarUrl']) {
            // Adding commas to price
            const fetchedCost = this.props.props.cost
            const cost = fetchedCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

            console.log(fetchedCost)
            return (
                <div>
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
                    <Grid>
                        <div className={classes.root}>
                            <Accordion className={classes.accordion}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>More...</Typography>
                                </AccordionSummary>
                                <Box display="flex" justifyContent="center" className={classes.border}>
                                    <Box borderTop={1} className={classes.border}  />
                                </Box>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                </div>
            )
        }
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