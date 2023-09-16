import React from 'react';

function Sidebar() {
  return (
    <div className="p-4">
    <div className="font-bold text-xl mb-4">Site Title</div>
    <ul className="space-y-2">
      <li className="hover:bg-gray-200 py-2 px-4 rounded cursor-pointer">Link 1</li>  
      <li className="hover:bg-gray-200 py-2 px-4 rounded cursor-pointer">Link 2</li>
    </ul>
  </div>
  );
}

export default Sidebar;