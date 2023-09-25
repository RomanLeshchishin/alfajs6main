import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import ParentAccount from './containers/acсounts/parent/parentAcc';
import ParentOrder from './containers/acсounts/parent/createOrder';
import TeacherAccount from './containers/acсounts/teacher/teacherAcc';
import CookerAccount from './containers/acсounts/cooker/cookerAcc';
import CookerReport from './containers/acсounts/cooker/cookerReport';
import CookerCreateMenu from './containers/acсounts/cooker/cookerCreateMenu';

function App() {
  return (
  <Router>
    <Routes>
     <Route path='/' element={<Login />}/>
     <Route path='/parentAccount' element={<ParentAccount />}/>
     <Route path='/createOrder' element={<ParentOrder />}/>
     <Route path='/teacherAccount' element={<TeacherAccount />}/>
     <Route path='/cookerAccount' element={<CookerAccount />}/>
     <Route path='/cookerReport' element={<CookerReport />}/>
     <Route path='/cookerCreateMenu' element={<CookerCreateMenu />}/>
     </Routes>
  </Router>
  );
}

export default App;
