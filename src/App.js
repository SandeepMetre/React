import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup, MDBBtn, MDBPagination, MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";
import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLimit] = useState(5);
    const [searchValue, setSearchValue] = useState('');

    const sortOptions = ["employee_id", "date_of_birth", "salary"];
    const filterOption = ["Java", "C#", "Python", "JavaScript", "PHP"];

    useEffect(() => {
        loadEmployeeData(0, 5, 0);
    }, []);

    const loadEmployeeData = async (start, end, increase) => {
        try {
            const response = await axios.get(`http://localhost:5000/employees?_start=${start}&_end=${end}`);
            setData(response.data);
            setCurrentPage(currentPage + increase);
        } catch (err) {
            console.log(err);
        }
    };

    const handlereset = () => {
      // Load the first page of data with 5 rows
      loadEmployeeData(0, pageLimit, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredEmployees = data.filter((item) =>
      item.first_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredEmployees);
  };

  const handleSort = async (e) => {
    const value = e.target.value;
    setSortValue(value);
    if (value === "date_of_birth") {
      const filteredData = data.filter((item) => item.date_of_birth);
      const sortedData = filteredData.sort((a, b) => {
        const dateA = new Date(a.date_of_birth);
        const dateB = new Date(b.date_of_birth);
        return dateA - dateB;
      });
      setData(sortedData);
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/employees?_sort=${value}&_order=asc`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    const filteredData = data.filter((item) => item.skills.programming.includes(value));
    setData(filteredData);
  };


  
    const renderPagination = () => {
      if (currentPage === 0) {
          return (
              <MDBPagination className="mb-0">
                  <MDBPaginationItem>
                      <MDBPaginationLink>1</MDBPaginationLink>
                  </MDBPaginationItem>
                  <MDBPaginationItem>
                      <MDBBtn onClick={() => loadEmployeeData(5, 10, 1)}>
                          Next
                      </MDBBtn>
                  </MDBPaginationItem>
              </MDBPagination>
          );
      } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
          return (
              <MDBPagination className="mb-0">
                  <MDBPaginationItem>
                      <MDBBtn onClick={() => loadEmployeeData((currentPage - 1) * 5, currentPage * 5, -1)}>
                          Prev
                      </MDBBtn>
                  </MDBPaginationItem>
                  <MDBPaginationItem>
                      <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                  </MDBPaginationItem>
                  <MDBPaginationItem>
                      <MDBBtn onClick={() => loadEmployeeData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)}>
                          Next
                      </MDBBtn>
                  </MDBPaginationItem>
              </MDBPagination>
          );
      } else {
          return (
              <MDBPagination className="mb-0">
                  <MDBPaginationItem>
                      <MDBBtn onClick={() => loadEmployeeData((currentPage - 1) * 5, currentPage * 5, -1)}>
                          Prev
                      </MDBBtn>
                  </MDBPaginationItem>
                  <MDBPaginationItem>
                      <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                  </MDBPaginationItem>
              </MDBPagination>
          );
      }
  };
  return (
    <MDBContainer>
      <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center",
      }}
      className="d-flex input-group w-auto"
      onSubmit={handleSearch}
      >
        <input
  type="text"
  placeholder="Search"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
/>
        
          <MDBBtn type="submit" color="dark">
            Search
            </MDBBtn>
          <MDBBtn className="mx-2" color="info" onClick={() => handlereset()}>
            Reset
            </MDBBtn>
    
      </form>
      <div style={{marginTop: "100px"}}>
      <div> <h2 className='text-center'>Serach, sort ,filter, and pagination using JSON Server</h2></div>
      <MDBRow>
        <MDBCol size="12">

        </MDBCol>
          <MDBTable>
            <MDBTableHead dark>
              <tr>
              
                <th scope='col'>employee_id</th>
                <th scope='col'>First_name</th>
                <th scope='col'>Last_name</th>
                <th scope='col'>Date_of_birth</th>
                <th scope='col'>Salary</th>
                <td scope='col'>programming</td>
                <td scope='col'>Languages</td>
                
                </tr>
            </MDBTableHead>
            {data.length === 0 ? (
              <MDBTableBody className=' align center mb-0'>
                <tr >
                  
                  <td colSpan={9} className='text-center mb-0'>No data found</td>
                </tr>
              </MDBTableBody>
            ):(
              data.map((item,index) => (
                <MDBTableBody key= {index}>
                  <tr>
                    
                    <td>{item.employee_id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.date_of_birth}</td>
                    <td>{item.salary}</td>
                    <td>{item.skills.programming.join(', ')}</td>
                    <td>{item.skills.languages.join(', ')}</td>
                  </tr>
                </MDBTableBody>
              ))
            )}
          </MDBTable>
      </MDBRow>
      <div style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"250px",
        alignContent:"center",
      }}>
        {renderPagination()}
      </div>
      </div>
      <MDBRow>
        <MDBCol size="8"><h5>Sort By:</h5><select style={{width:"50%",borderRadius:"1px",height:"30px"}} 
        onChange={(e) => handleSort(e)} value={sortValue}>
          <option>Please select value</option>
          {sortOptions.map((item,index)=>(
            <option value={item} key={index}>
            {item}
            </option>
          ))}
          </select>
          </MDBCol>
        
        <MDBBtnGroup>
        <MDBCol size="4">
          <h5>Filter By:</h5>
          <select style={{width: "50%", borderRadius: "1px", height: "30px"}}
          onChange={handleFilter} 
          value={sortValue}>

          <option>Please select value</option>
          {filterOption.map((item,index)=>(
            <option value={item} key={index}>
            {item}
            </option>
          ))}
          </select>      
          </MDBCol>    
          </MDBBtnGroup>  
      </MDBRow>
    </MDBContainer>
  );
}

export default App;