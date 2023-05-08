import React from 'react';
import { styled } from '@linaria/react';
import MainScreen from '../MainScreen/MainScreen';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { RecoilRoot } from 'recoil';

const StyledApp = styled.section`
  position: relative;
  width: 100vw;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export default function App() {
  return (
    <RecoilRoot>
      <StyledApp>
        <Header />
        <MainScreen />
        <Footer />
      </StyledApp>
    </RecoilRoot>
  );
}
