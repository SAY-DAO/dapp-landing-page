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
    },
    tab: {
        marginRight: 40,
        minWidth:50
    }
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Tab label="Item One" {...a11yProps(0)} className={classes.tab} />
                <Tab label="Item Two" {...a11yProps(1)} className={classes.tab} />
                <Tab label="Item Three" {...a11yProps(2)} className={classes.tab} />
                <Tab label="Item Four" {...a11yProps(3)} className={classes.tab} />

            </Tabs>
            <TabPanel value={value} index={0}>
                <Sections />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Sections />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Sections />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Sections />
            </TabPanel>
        </div>
    );
}