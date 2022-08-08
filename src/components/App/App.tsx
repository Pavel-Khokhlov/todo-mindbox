import React from 'react';
import { styled } from '@linaria/react';
import MainScreen from '../MainScreen/MainScreen';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { RecoilRoot } from 'recoil';

const SApp = styled.section`
  position: relative;
  background-color: rgb(245, 245, 245);
  width: 100vw;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export default function App() {
  return (
    <RecoilRoot>
      <SApp>
        <Header />
        <MainScreen />
        <Footer />
      </SApp>
    </RecoilRoot>
  );
}
