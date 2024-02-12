import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtnGroup, MDBBtn,MDBPagination,MDBPaginationItem,MDBPaginationLink} from "mdb-react-ui-kit"
import './App.css';

function App() {
  const [data, setData ]=useState([]);
  const [value, setValue]= useState("");
  const [sortValue, setSortValue]= useState("");
  const [currentpage, setcurrentpage]= useState(0);
  const [pagelimit]= useState(5);

  const sortOptions=["date_of_birth","salary","first_name","last_name"];

  useEffect(()=>{
  loadEmployeeData(0,5,0);},[]);

  const loadEmployeeData =async(start,end,increase) =>  {
    return await axios
    .get("http://localhost:5000/employees?_start=${start}&_end=${end}")
    .then((response) => setData(response.data))
    .catch((err) => console.log(err));
  }
  console.log("data",data);

  const handlereset=()=> {
    loadEmployeeData();
  };
  const handleSearch= async(e)=>{
    e.preventDefault();
    return await axios.get(`http://localhost:5000/employees?q=${value}`)
    .then((response) =>{
      setData(response.data);
      setValue("");

    } )
    .catch((err)=>console.log(err));
  };

  const handleSort= async(e)=>{
    let value=e.target.value;
    setSortValue(value);
    return await axios.get(`http://localhost:5000/employees?_sort=${value}&_order=asc`)
    .then((response) =>{
      setData(response.data);
      setValue("");

    } )
    .catch((err)=>console.log(err));
  };

  const handlefilter= async(value)=>{
    return await axios.get(`http://localhost:5000/employees?filter=${value}`)
    .then((response) =>{
      setData(response.data);
      setValue("");

    } )
    .catch((err)=>console.log(err));
  };

  const renderpagination=()=>{
    if(currentpage===0){
      
    }
  }
  return (
    <MDBContainer>
      <form style={{
        margin:"auto",
        padding:"15px",
        maxwidth:"400px",
        alignContent:"center",
      }}
      className="d-flex input-group w-auto"
      onSubmit={handleSearch}
      >
        <input
        type="text"
        className="form-control"
        placeholder="Search Name...."
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
              <th scope='col'>No</th>
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
                    <th scope= "row" >{index+1}</th>
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
      </div>
      <MDBRow>
        <MDBCol size="8"><h5>Sort By:</h5><select style={{width:"50%",borderradius:"1px",height:"30px"}}>
          onChange={handleSort} 
          value={sortValue}

          <option>Please select value</option>
          {sortOptions.map((item,index)=>(
            <option value={item} key={index}>
            {item}
            </option>
          ))}
          </select>
          </MDBCol>
        <MDBCol size="4"><h5>Filter By:</h5>
        <MDBBtnGroup>
          <MDBBtn color="dark" onClick={()=>handlefilter("programming")}>programming</MDBBtn></MDBBtnGroup></MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}

export default App;