import { useState } from 'react';

// Add the following line at the beginning of your App component:
const [searchValue, setSearchValue] = useState('');

// Replace your existing search input with the following:
<input
  type="text"
  placeholder="Search"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>

// Replace your existing handleSearch function with the following:
const handleSearch = (e) => {
  e.preventDefault();
  const filteredEmployees = data.filter((item) =>
    item.first_name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setData(filteredEmployees);
};