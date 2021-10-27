import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const DonationsTable = ({ name, donation, date }) => {
  let randomKey = Math.random() * 10000000000000;
  return(
    <tr key={randomKey + 4.13} className="userProps">
      <td key={randomKey + 3.14}>{name}</td>
      <td key={randomKey}>{donation}</td>
      <td key={randomKey + 2}>{date}</td>
    </tr>
  );
}

function App() {
  const [selectedPolitican, setSelectedPolitician] = useState("");
  const [politicianData, setPoliticianData] = useState({});
  const [fetchedData, setFetchedData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("./data.json").then(response => {
      setFetchedData(response.data.politicians)
    });
  }, []);

  let startDate = "2021-09-03";
  let endDate = "2021-09-15"
  const dateFilter = fetchedData.filter(value => {
    let donationsArr = value.donations;

    // let date = new Date(donationsArr.date);
    // console.log(donationsArr);
    
    donationsArr.filter(a => {
      const inDate = new Date(a.date);
      let date = `${inDate.getYear()}-${inDate.getMonth()}-${inDate.getDay()}`
      console.log(date);
      if(date >= startDate && date <= endDate) {
        // console.log(a);
      }
    })
  });

  // console.log(dateFilter);


  
  const selectHandler = e => {
    setLoaded(false);
    setSelectedPolitician(e.target.value);
    setPoliticianData(fetchedData.find(politician => politician.name === e.target.value)); 
    setLoaded(true);
  }

  let startingDate = new Date("2015-08-04");
  
  return (
    <div>
      <button onClick={() => console.log(dateFilter)}>FilterByDate</button>
      <h1>{politicianData.name}</h1>
      <label>აირჩიე პოლიტიკოსი</label>
      <br />
      <select onChange={selectHandler}>
        <option value="Vakhtang_Megrelishvili">ვახტანგ მეგრელიშვილი</option>
        <option value="Iago_Khvichia">იაგო ხვიჩია</option>
        <option value="Aleksandre_Rakviashvili">ალექსანდრე რაქვიაშვილი</option>
        <option value="Herman_Szaboo">ჰერმან საბო</option>
        <option value="Otar_Zakalashvili">ოთარ ზაკალაშვილი</option>
      </select>


      <table className="table">
        <tbody key={13}>
          <tr key={1} className="table-headers">
            <th key={2}>მომხმარებელი</th>
            <th key={3}>შემოწირულობა</th>
            <th key={5}>თარიღი</th>
          </tr>
          {
            loaded ? politicianData.donations.map((value, i) => <DonationsTable name={value.donator} donation={value.amount} date={value.date} />) : null 
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
