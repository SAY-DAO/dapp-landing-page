import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Sections from './Sections';

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
    borderRadius: 18,
  },
  tab: {
    marginRight: 40,
    minWidth: 50,
  },
}));

export default function MidTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contents = {
    section1: {
      img: 'child2',
      title: 'Ecosystem',
      content:
        'Our children are registered by social workers who are the bridge between the real world and the' +
        'virtual world. They regularly update children needs on the SAY panel and insure the product/service is received' +
        'by the child on a weekly basis. All the social workers and the children are authorized by registered ' +
        'local NGOs that are in partnership with SAY. On the other side, users get matched to a child with two ' +
        'different methods and become the virtual family of a child by choosing mother, father, aunt or uncle a' +
        "their role. Children's identities are kept confidential, however we assign a unique avatar to every single" +
        ' child profile along side their voice and real story.',
    },
    section2: {
      img: 'logo192',
      title: 'Transparency',
      content:
        'Our aim is to present all transactions and receipts on blockchain however at this stage we are ' +
        'providing up to 4 receipts for any paid need in our off chain app. Including bank transfer, purchase' +
        ' receipt, NGO receipt and receipt by the social worker monitoring the child on the delivery of the' +
        ' product/service to the child. SAY off chain app is accessible by everyone but as you might know not all ' +
        'the international banks can make transaction with Iranian banks. This is another reason why we are shifting SAY ' +
        'app to a dapp (decentralized app) where community and smart contracts are the decision makers rather than' +
        'individuals.',
    },
    section3: {
      img: 'logo192',
      title: 'Business Model',
      content:
        "SAY is founded on two business model and will not be limited to these to sustain it's ecosystem and grow" +
        'in a fast paste. Our first source of income is through affiliate marketing. All the products listed on SAY' +
        'are from online retailers that pay us commission fee on any purchase through our app which accumulate to up to 15%' +
        'of the purchased price. Our second model is the donations we receive from our users and SAY does not take any' +
        'fees our percantage from product/services purchased for the children.',
    },
    section4: {
      img: 'logo192',
      title: 'Token Economic',
      content: 'More information about our road map and crypto economic will be posted in upcoming weeks.',
    },
  };
  return (
    <div className={classes.root}>
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
