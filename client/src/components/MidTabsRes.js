import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Sections from './Sections';
import tabsContent from '../apis/tabsContent.json';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((darkTheme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: darkTheme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const contents = tabsContent;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#08060287' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          <Tab label={contents.section1.title} {...a11yProps(0)} />
          <Tab label={contents.section2.title} {...a11yProps(1)} />
          <Tab label={contents.section3.title} {...a11yProps(2)} />
          <Tab label={contents.section4.title} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Sections props={contents.section1} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Sections props={contents.section2} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Sections props={contents.section3} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Sections props={contents.section4} />
      </TabPanel>
    </div>
  );
}
