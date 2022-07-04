import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom'
import Header from './components/header/header';
import Mainpage from './components/mainpage/mainpage';



function App() {
  
  return (
  
      <Router>

         <div className="App">
        <Header/>
        <Mainpage/>
        </div>

      </Router>

  );
}

export default App;
