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


export default function App() {
  return (
    <React.Fragment>
      {/* Older browsers need a lot of normalization help*/}
      <CssBaseline />
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
    </React.Fragment>
  );
}

