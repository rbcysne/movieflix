import React, { useState } from 'react';
import Routes from './Routes';

import './App.css';
import './assets/styles/custom.scss';
import { AuthContextData } from 'types/AuthContextData';
import { AuthContext } from 'AuthContext';


function App() {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  })

  return (
    <AuthContext.Provider value={ {authContextData, setAuthContextData} }>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
