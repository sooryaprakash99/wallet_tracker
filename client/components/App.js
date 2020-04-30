
import React from 'react';
//import { Switch, Route } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import AddExpense from './addExpense/AddExpense'

const App = () => (
    <AddExpense />
//   <div className="app-routes">
//     <Switch>
//       <Route path="/login" component={Login} />
//       <Route path="/" component={Home} />
//     </Switch>
//   </div>
);

export default App;