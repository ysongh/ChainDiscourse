import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './page/Home';

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/test"
            element={
              <h1>Test</h1>} />
          <Route
            path="/"
            element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
