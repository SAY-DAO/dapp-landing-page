import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MidSection from './MidSection';
import IntroSection from './IntroSection';
import MidTabs from './MidTabs';
import Eye from './Eye';
import EndSection from './EndSection';
import NavBar from './NavBar';

class App extends Component {
  componentDidMount = async () => {};
  render() {
    return (
      <React.Fragment>
        {/* Older browsers need a lot of normalization help*/}
        <CssBaseline />
        <Container>
          <NavBar onConnect={this.onConnect} state={this.state} />
          <IntroSection />
          <br />
          <MidSection />
          <MidTabs />
          <EndSection />
          <Eye />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
