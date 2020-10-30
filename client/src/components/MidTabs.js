import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Sections from "./Sections";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'} variant={'body2'} >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((darkTheme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: darkTheme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${darkTheme.palette.divider}`,

    },
    paper: {
        padding: darkTheme.spacing(6),
        margin: 'auto',
        maxWidth: 1440,
        borderRadius: 18

    },
    tab: {
        marginRight: 40,
        minWidth:50
    }
}));

export default function MidTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const contents = {
        section1: {
            img: "child2",
            title: "Ecosystem",
            content: "Children are registered by social workers who are the bridge between the real world and the" +
                     "virtual world. They update children needs on SAY platform and insure the product/service is received" +
                     "by the child on a weekly basis. All social workers and children are authorized by local registered NGOs that are" +
                     "in partnership with SAY. on the other side, users get matched to a child with two different methods" +
                     "and become the virtual family a child to take care of their regularly updated needs."
        },
        section2: {
            img: "logo192",
            title: "Transparency",
            content: "2"
        },
        section3: {
            img: "logo192",
            title: "Business Model",
            content: "3"
        },
        section4: {
            img: "logo192",
            title: "Token Economic",
            content: "More information about our road map and crypto economic will be posted in upcoming weeks."
        },
    }

    return (
        <div className={classes.root} >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                scrollButtons="auto"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}

            >
                <Tab label={contents.section1.title} {...a11yProps(0)} className={classes.tab} />
                <Tab label={contents.section2.title} {...a11yProps(1)} className={classes.tab} />
                <Tab label={contents.section3.title} {...a11yProps(2)} className={classes.tab} />
                <Tab label={contents.section4.title} {...a11yProps(3)} className={classes.tab} />

            </Tabs>
            <TabPanel value={value} index={0}>
                <Sections props={contents.section1}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Sections props={contents.section2}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Sections props={contents.section3}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Sections props={contents.section4}/>
            </TabPanel>
        </div>
    );
}