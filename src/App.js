import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import Account from './containers/acсounts/parent/parentAcc';
import ParentOrder from './containers/acсounts/parent/createOrder';

function App() {
  return (
  <Router>
    <Routes>
     <Route path='/' element={<Login />}/>
     <Route path='/account' element={<Account />}/>
     <Route path='/createOrder' element={<ParentOrder />}/>
     </Routes>
  </Router>
  );
}

export default App;
