import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React from 'react';
import Box from '@material-ui/core/Box';

export default function () {
  return (
    <Container id="midsection" maxWidth="md" style={{ marginTop: 40, marginBottom: 55 }}>
      <Box className="container">
        <Typography align="center" color="secondary" variant="h5">
          The world is changing and so is SAY
        </Typography>
        <Typography align="center" variant="body1">
          SAY is an evolving project aiming to register and monitor every child in poverty and provide them with their
          necessary goods/services through a self-sustaining business model governed by its community. Nakama token is
          our first step to expand our reach to like-minded individuals for building an international community to think
          and work collectively and help SAY to transfer to a decentralized organization. For more information about our
          solution please visit {}
          <a style={{ color: '#8CB4C5' }} href="https://say.company">
            www.say.company
          </a>
          <br />
          {/*Up to today 673 needs of 31 children have been taken care of by SAY virtual families.*/}
        </Typography>
      </Box>
    </Container>
  );
}
