import React, { useState, useEffect } from 'react';
import './app.css';


function App() {
  const [selectedPolitican, setSelectedPolitician] = useState("");
  const [politicianData, setPoliticianData] = useState({});

  useEffect(() => {
    fetch("./data.json")
    .then(response => response.json())
    .then(value => {
      console.log(value);
    })
  }, []);

  const selectHandler = e => setSelectedPolitician(e.target.value);

  return (
    <div>
      <label>აირჩიე პოლიტიკოსი</label>
      <br />
      <select onChange={selectHandler}>
        <option>ვახტანგ მეგრელიშვილი</option>
        <option>იაგო ხვიჩია</option>
        <option>ალექსანდრე რაქვიაშვილი</option>
        <option>ჰერმან საბო</option>
        <option>ოთარ ზაკალაშვილი</option>
      </select>
    </div>
  );
}

export default App;
