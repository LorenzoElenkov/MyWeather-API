import React from 'react';
import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';
import Header from './F-components/Header/Header';
import About from './F-components/About/About';
import Home from './F-components/Home/Home';
import FAQ from './F-components/FAQ/FAQ';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr 25px;
`;


function App() {
  
  return (
    <StyledApp>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
        </Routes>
    </StyledApp>
  );
}

export default App;
