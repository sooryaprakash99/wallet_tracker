import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import App  from "./components/App"
import './styles/style.css';


ReactDOM.render(
  <div id='appContainer'>
    <Header name='E-Wallet Tracker'></Header>
    <App />
  </div>,
  document.getElementById('app')
);