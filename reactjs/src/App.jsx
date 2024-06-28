import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './page/Home';
import Chats from './page/Chats';
import CreateKey from './page/CreateKey';
import CreateSpace from './page/CreateSpace';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  const [userSigner, setUserSigner] = useState(null);
  const [userSessionSigs, setUserSessionSigs] = useState('');

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/test"
            element={
              <h1>Test</h1>} />
          <Route
            path="/createkey"
            element={
              <CreateKey />} />
          <Route
            path="/create-space"
            element={
              <CreateSpace />} />
          <Route
            path="/chats"
            element={
              <Chats ethAddress={ethAddress} />} />
          <Route
            path="/"
            element={
            <Home
              ethAddress={ethAddress}
              setETHAddress={setETHAddress} 
              userSigner={userSigner}
              setUserSigner={setUserSigner}
              userSessionSigs={userSessionSigs}
              setUserSessionSigs={setUserSessionSigs} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
