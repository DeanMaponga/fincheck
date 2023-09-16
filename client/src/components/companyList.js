// CompanyList.js

import Company from '../models/Company';

function CompanyList({ companies }) {

  return (
    <ul>
      {companies.map(company => (
        <li key={company.name}>{company.name}</li>  
      ))}
    </ul>
  )
}

export default CompanyList;