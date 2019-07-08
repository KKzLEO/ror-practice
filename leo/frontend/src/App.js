import React from 'react';
import './App.css';
import Turnover from './components/Turnover/Turnover';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Turnover />
      <Footer />
    </div>
  );
}

export default App;
