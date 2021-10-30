import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Url from 'url-parse';
import './App.css';


const DynamicTableRows = props => {
  if(!props.hasQueryString) {
    return(
      props.isLoaded ? props.iterableData.map(
        (value, index) => <DonationsTable name={value.donator} donation={value.amount} date={value.date} key={index} />) : null 
    );
  }
  return props.iterableData.map((value, i) => <DonationsTable name={value.donator} donation={value.amount} date={value.date} key={i} />)
}

const Table = props => {
  return(
  <table className="table">
    <tbody>
      <tr className="table-headers">
        <th>მომხმარებელი</th>             
        <th>შემოწირულობა</th>
        <th>თარიღი</th>
      </tr>
      <DynamicTableRows hasQueryString={props.hasQueryString} isLoaded={props.isLoaded} iterableData={props.iterableData} />
    </tbody>
  </table>
  );
}

const FilterByDate = ({ filterHandler }) => {
  return(
    <select onChange={filterHandler} className="filter-by-date" defaultValue={"აირჩიე თვე"}>
      <option defaultValue disabled>აირჩიე თვე</option>
      <option value="October">ოქტომბერი</option>
      <option value="September">სექტემბერი</option>
    </select>
  );
}

const DonationsTable = ({ name, donation, date }) => {
  return(
    <tr className="userProps">
      <td>{name}</td>
      <td>{donation} ₾</td>
      <td>{date}</td>
    </tr>
  );
}

function App() {
  const [politicanData, setPoliticanData] = useState({});
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [hasQueryString, setHasQueryString] = useState(false);  
  const [isLoaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});

  
  useEffect(() => {
    let parsedUrlQuery = new Url(window.location.href, true);

    axios.get("./data.json").then(response => {
      setFetchedData(response.data.politicans)

      if(Object.keys(parsedUrlQuery.query).length > 0) {  
        let filteredData = response.data.politicans.find(value => value.name.toLowerCase() === parsedUrlQuery.query.politican.toLowerCase())
        setPoliticanData(filteredData);
        setHasQueryString(true);
        setLoaded(true);
      }
    });
  }, []);


  const selectHandler = e => {
    if(hasQueryString) {
      return;
    }
    setFilteredDonations([]);
    setLoaded(false);
    setPoliticanData(fetchedData.find(politican => politican.name.toLowerCase() === e.target.value.toLowerCase())); 
    setLoaded(true);
  }

  const filterHandler = e => {
    switch(e.target.value) {
      case "October": 
        setStartDate(new Date("2021-10-01"));
        setEndDate(new Date("2021-10-31"));
        break;
        
      case "September":
        setStartDate(new Date("2021-09-01"));
        setEndDate(new Date("2021-09-30"));
        break;
  
      default: break;
    }
  }

  useEffect(() => {
    if(isLoaded) {
      const donationsArr = politicanData.donations;
      let arr = [];
      
      for(const value of donationsArr) {
        let date = new Date(value.date);
        if(date >= startDate && date <= endDate) {
          arr.push(value);
        } 
      }
      setFilteredDonations(arr);
    }
  }, [startDate])

  console.log(fetchedData);
  // console.log(politicanData.name_ge, politicanData.donations);
  const iterableData = filteredDonations.length > 0 ? filteredDonations : politicanData.donations;

  return (
    <div>
        <div className="select-politican">
        <label>აირჩიე პოლიტიკოსი</label>
        <br />
        <select onChange={selectHandler}>
          <option value="Vakhtang_Megrelishvili">ვახტანგ მეგრელიშვილი</option>
          <option value="Iago_Khvichia">იაგო ხვიჩია</option>
          <option value="Aleksandre_Rakviashvili">ალექსანდრე რაქვიაშვილი</option>
          <option value="Herman_Szaboo">ჰერმან საბო</option>
          <option value="Otar_Zakalashvili">ოთარ ზაკალაშვილი</option>
        </select>
      </div>
      { isLoaded ? <FilterByDate filterHandler={filterHandler} /> : null }
      { isLoaded ? <p className="politican-name">პოლიტიკოსი: {politicanData.name_ge}</p> : null }
      
      <Table isLoaded={isLoaded} iterableData={iterableData} hasQueryString={hasQueryString} />
    </div>
  );
}

export default App;
