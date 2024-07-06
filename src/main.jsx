import React from 'react'
import ReactDOM from 'react-dom/client'
import Employee_login from './components/Employee_login.jsx';
import Manager_login from './components/Manager_login.jsx';
import Home from './components/Home.jsx';
import Employee from './components/Employee.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Manager from './components/Manager.jsx';
import Employee_leave_apply from './components/Employee_leave_apply.jsx';
import Requested_leave from './components/Requested_leave.jsx';
import Employee_report from './components/Employee_report.jsx';
import Customreport from './components/Customreport.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes> 
      <Route path='employee_leave_management/' element={<Home/>}/>
      <Route path='/Manager_login' element={<Manager_login/>}/>
      <Route path='/Employee_login' element={<Employee_login/>}/>
      <Route path='/Employee' element={<Employee/>}/>
      <Route path='/manager' element={<Manager/>}/>
      <Route path='/view-requests' element={<Requested_leave/>}/>
      <Route path='/Employee_leave_apply' element={<Employee_leave_apply/>}/>
      <Route path='/Employee_report' element={<Employee_report/>}/>
      <Route path='/sign_out' element={<Home/>}/>
      <Route path='/custom-report' element={<Customreport/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
