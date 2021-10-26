import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const DataTable = props => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.donation}</td>
    </tr>
  );
}

const TableTemplate = ({ name, donation, key }) => {
  return(
    <div key={key}>
      <table>
        <tbody>
          <tr>
            <th>მომხმარებელი</th>
            <th>შემოწირულობა</th>
          </tr>
          <DataTable name={name} donation={donation} />
        </tbody>
      </table>
    </div>
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

  // useEffect(() => {
  //   console.log(politicianData.donations[0]);
  // }, [selectedPolitican])
  
  let randomKey = Math.random() * 500000000;
  
  const selectHandler = e => {
    setLoaded(false);
    setSelectedPolitician(e.target.value);
    setPoliticianData(fetchedData.find(politician => politician.name === e.target.value)); 
    setLoaded(true);
  }
  
  // if(loaded) {
    // console.log(politicianData.donations);
    // [politicianData].map(value => <DataTable name={value.donations.donator} donation={value.amount} />);
  // }



  return (
    <div>
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

      {loaded ? politicianData.donations.map(value => <TableTemplate name={value.donator} donation={value.amount} key={randomKey} />) : null }
      
    </div>
  );
}

export default App;
