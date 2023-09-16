import React from 'react';
import { useParams } from 'react-router-dom';

function EmployeeList() {
  const { companyId } = useParams();

  // You can replace the dummy data with your own logic to fetch employees
  const dummyData = {
    1: ['Employee A', 'Employee B', 'Employee C'],
    2: ['Employee D', 'Employee E', 'Employee F'],
    3: ['Employee G', 'Employee H', 'Employee I'],
  };

  const employees = dummyData[companyId] || [];

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>{employee}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;