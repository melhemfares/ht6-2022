import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

const Dashboard = (props) => (
  <Background>
    <Logo />
    <Header>Dashboard</Header>
    <Paragraph>
      Your home for anything personal finance related.
    </Paragraph>
    <Button mode="outlined" onPress={() => props.signOut()}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);