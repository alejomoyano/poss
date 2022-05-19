import React from 'react';

import './App.css';
import Auth from '../src/components/Auth';
import ChatScreen from '../src/components/Chat';
import { useState } from 'react';
import { useEffect } from 'react';




function App() {


  return (
    <div>
      <Auth />
      <ChatScreen  />

    </div>
    
  );
}

export default App;