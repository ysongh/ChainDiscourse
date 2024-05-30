import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './page/Home';
import Chats from './page/Chats';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  const [userSigner, setUserSigner] = useState(null);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/test"
            element={
              <h1>Test</h1>} />
          <Route
            path="/chats"
            element={
              <Chats />} />
          <Route
            path="/"
            element={
            <Home
              ethAddress={ethAddress}
              setETHAddress={setETHAddress} 
              userSigner={userSigner}
              setUserSigner={userSigner} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
