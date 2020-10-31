import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React from 'react';

export default function () {
  return (
    <Container id="midsection" maxWidth="md" style={{ height: '300px', marginTop: 100 }}>
      <div className="App">
        <Typography align="center" color="secondary" variant="h5">
          The world is changing and so is SAY
        </Typography>
        <Typography align="center" variant="body1">
          SAY is an evolving project aiming to register and monitor every child under poverty and provide them with
          their necessary goods/service through a self-sustaining business model governed by its community. Nakama token
          is our first step to expand our reach to like-minded individuals for building an international community to
          think and work collectively and help SAY to transfer to a decentralized organization{' '}
          <a href="www.say.company">www.say.company</a> for more information regarding our solution.
          <br />
          Up to today 673 needs of 31 children have been taken care of by SAY virtual families.
        </Typography>
      </div>
    </Container>
  );
}
