import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MidSection from './MidSection';
import IntroSection from './IntroSection';
import MidTabs from './MidTabs';
import Eye from './Eye';
import NavBar from './NavBar';
import Footer from './Footer';
import Circle from './Circles';
import Web3Provider from 'web3-react';
import { connectors } from '../connectors';
import { useWeb3Context } from 'web3-react/dist';
import { ethers } from 'ethers';

console.log(connectors);

export default function App() {
  return (
    <React.Fragment>
      {/* Older browsers need a lot of normalization help*/}
      <CssBaseline />
      <Web3Provider connectors={connectors} libraryName={'ethers.js'}>
        <MyComponent />
        <Container style={{ maxWidth: 1000 }}>
          <NavBar />
          <IntroSection />
          <br />
          <MidSection />
          <MidTabs />
          {/*<EndSection />*/}
          <Eye />
          <Footer />
          <Circle />
        </Container>
      </Web3Provider>
    </React.Fragment>
  );
}

function MyComponent() {
  const context = useWeb3Context();
  console.log(context);
  return (
    <button
      onClick={() => {
        context.setConnector('MetaMask');
      }}
    >
      Activate
    </button>
  );
}
