import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const DonationsTable = ({ name, donation }) => {
  return(
    <tr key={Math.random() * 10000000000000}>
      <td>{name}</td>
      <td>{donation}</td>
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
  
  const selectHandler = e => {
    setLoaded(false);
    setSelectedPolitician(e.target.value);
    setPoliticianData(fetchedData.find(politician => politician.name === e.target.value)); 
    setLoaded(true);
  }
  

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


      <table className="table">
        <tbody key={Math.random() * 10000000000000}>
          <tr>
            <th>მომხმარებელი</th>
            <th>შემოწირულობა</th>
          </tr>
          {loaded ? politicianData.donations.map(value => <DonationsTable name={value.donator} donation={value.amount} />) : null }
        </tbody>
      </table>
    </div>
  );
}

export default App;
