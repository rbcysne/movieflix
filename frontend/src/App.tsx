import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import './App.css';

import React, { useState } from 'react';
import Routes from './Routes';

import { AuthContextData } from 'types/AuthContextData';
import { AuthContext } from 'AuthContext';
import { ToastContainer } from 'react-toastify';


function App() {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  })

  return (
    <AuthContext.Provider value={ {authContextData, setAuthContextData} }>
      <Routes />
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
