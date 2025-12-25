
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { DetailPage } from './pages/DetailPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/boilerplate/:identifier" element={<DetailPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
