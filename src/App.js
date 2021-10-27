import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const FilterByDate = props => {
  return(
    <select onChange={props.filterHandler} className="filter-by-date">
      <option defaultValue disabled selected>აირჩიე თვე</option>
      <option value="October">ოქტომბერი</option>
      <option value="September">სექტემბერი</option>
    </select>
  );
}

const DonationsTable = ({ name, donation, date }) => {
  return(
    <tr key={Math.random() * 100000000} className="userProps">
      <td key={Math.random() * 100000000 + 3.14}>{name}</td>
      <td key={Math.random() * 100000000}>{donation}</td>
      <td key={Math.random() * 100000000}>{date}</td>
    </tr>
  );
}

function App() {
  const [selectedPolitican, setSelectedPolitican] = useState("");
  const [politicanData, setPoliticanData] = useState({});
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  useEffect(() => {
    axios.get("./data.json").then(response => {
      setFetchedData(response.data.politicans)
    });
  }, []);


  const selectHandler = e => {
    setFilteredDonations([]);
    setLoaded(false);
    setSelectedPolitican(e.target.value);
    setPoliticanData(fetchedData.find(politican => politican.name === e.target.value)); 
    setLoaded(true);
  }

  
  const filterHandler = e => {
    switch(e.target.value) {
      case "October": 
        setStartDate("2021-10-01");
        setEndDate("2021-10-31");
        break;
  
      case "September":
        setStartDate("2021-09-01");
        setEndDate("2021-09-30");
        break;
  
      default: 
        console.log("hi");
    }
    dateFilter(politicanData.donations);
  }

  const dateFilter = (donationsArr) => {
    const instanceObj = {...politicanData};
    let startingDate = new Date(startDate), endingDate = new Date(endDate);   
    let arr = [];

    donationsArr.forEach(value => {
      let date = new Date(value.date);
      if(date >= startingDate && date <= endingDate) {
        arr.push(value);
      } 
    })
    setFilteredDonations(arr);
  }

  let iterableData = filteredDonations.length > 0 ? filteredDonations : politicanData.donations;
  
  // useEffect(() => {
  //   let instance = {...politicanData};
  //   instance.donations = filteredDonations;

  //   setPoliticanData(instance);
    
  // }, [filteredDonations])


  
  return (
    <div>
      <h1>{politicanData.name}</h1>
      <label>აირჩიე პოლიტიკოსი</label>
      <br />
      <select onChange={selectHandler}>
        <option value="Vakhtang_Megrelishvili">ვახტანგ მეგრელიშვილი</option>
        <option value="Iago_Khvichia">იაგო ხვიჩია</option>
        <option value="Aleksandre_Rakviashvili">ალექსანდრე რაქვიაშვილი</option>
        <option value="Herman_Szaboo">ჰერმან საბო</option>
        <option value="Otar_Zakalashvili">ოთარ ზაკალაშვილი</option>
      </select>

      { loaded ? <FilterByDate filterHandler={filterHandler} /> : null }

      <table className="table" key={Math.random() * 100000000}>
        <tbody key={13}>
          <tr key={1} className="table-headers">
            <th key={2}>მომხმარებელი</th>             
            <th key={3}>შემოწირულობა</th>
            <th key={5}>თარიღი</th>
          </tr>
          {
            loaded ? iterableData.map(value => <DonationsTable name={value.donator} donation={value.amount} date={value.date} />) : null 
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
