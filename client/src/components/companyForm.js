// CompanyForm.js

import { useState } from 'react';

function CompanyForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    // submit company
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  )
}
export default CompanyForm;