
import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './login/Login';
import Home from './home/Home';

const App = () => (
    localStorage.getItem('isLoggedIn') ? <Home /> : <Login /> 
);

export default App;