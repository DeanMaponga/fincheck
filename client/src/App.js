import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import CompanyForm from './components/company_form';
import CompanyList from './components/company_list';
import EmployeeList from './components/employee_list';
import EmployeeForm from './components/employee_form';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={CompanyList} />
        <Route exact path="/company/create" component={CompanyForm} />
        <Route exact path="/company/:companyId" component={EmployeeList} />
        <Route exact path="/company/:companyId/create" component={EmployeeForm} />
      </Routes>
    </Router>
  );
}
export default App;