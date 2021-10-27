import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const FilterByDate = props => {
  return(
    <select key={10} onChange={props.filterHandler} className="filter-by-date" defaultValue={"აირჩიე თვე"}>
      <option defaultValue disabled key={11}>აირჩიე თვე</option>
      <option value="October" key={12}>ოქტომბერი</option>
      <option value="September" key={13}>სექტემბერი</option>
    </select>
  );
}

const DonationsTable = ({ name, donation, date }) => {
  return(
    <tr key={6} className="userProps">
      <td key={7}>{name}</td>
      <td key={8}>{donation} ₾</td>
      <td key={9}>{date}</td>
    </tr>
  );
}

function App() {
  const [politicanData, setPoliticanData] = useState({});
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});


  useEffect(() => {
    axios.get("./data.json").then(response => {
      setFetchedData(response.data.politicans)
    });
  }, []);


  const selectHandler = e => {
    setFilteredDonations([]);
    setLoaded(false);
    setPoliticanData(fetchedData.find(politican => politican.name === e.target.value)); 
    setLoaded(true);
  }


  const iterableData = filteredDonations.length > 0 ? filteredDonations : politicanData.donations;
  // let startingDate = new Date(startDate), endingDate = new Date(endDate);
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
  
      default: 
      console.log("hi");
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

  
  return (
    <div>
      <label>აირჩიე პოლიტიკოსი</label>
      <br />
      <select onChange={selectHandler} key={20}>
        <option value="Vakhtang_Megrelishvili" key={14}>ვახტანგ მეგრელიშვილი</option>
        <option value="Iago_Khvichia" key={15}>იაგო ხვიჩია</option>
        <option value="Aleksandre_Rakviashvili" key={16}>ალექსანდრე რაქვიაშვილი</option>
        <option value="Herman_Szaboo" key={17}>ჰერმან საბო</option>
        <option value="Otar_Zakalashvili" key={18}>ოთარ ზაკალაშვილი</option>
      </select>

      { isLoaded ? <FilterByDate filterHandler={filterHandler} /> : null }
      <p className="politican-name">პოლიტიკოსი:{politicanData.name_ge}</p>
      <table className="table" key={21}>
        <tbody key={1}>
          <tr key={2} className="table-headers">
            <th key={3}>მომხმარებელი</th>             
            <th key={4}>შემოწირულობა</th>
            <th key={5}>თარიღი</th>
          </tr>
          {
            isLoaded ? iterableData.map(value => <DonationsTable name={value.donator} donation={value.amount} date={value.date} />) : null 
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
