import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function Eye() {
  return (
    <Container maxWidth="md" style={{ height: '300px', marginTop: 10 }}>
      <Container
        style={{
          margin: 'auto',
          width: 474,
          padding: 10,
        }}
      >
        <img alt="left eye" src={require('../static/eye.svg')} style={{ width: '50%' }} />
        <img alt="right eye" src={require('../static/eye.svg')} style={{ width: '50%' }} />
        <Typography align="center" variant="subtitle1" style={{ opacity: 0.3 }}>
          Where To Find Us
        </Typography>
      </Container>
    </Container>
  );
}
