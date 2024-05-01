import React, { useState } from 'react';

function App() {
  const [viewer, setViewer] = useState(0);
  const [locations, setLocations] = useState([]);
  const [oneLocation, setOneLocation] = useState();

  const setView = (view) => {
    setViewer(view)

    switch (view) {
      case 0:
        getAllLocations();
        break;

      case 1:

        break;

      case 2:

        break;
    }
  }

  function getAllLocations() {
    fetch("http://localhost:8081/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
        setLocations(data);
      });
  }

  function getOneLocation(id) {
    fetch("http://localhost:8081/read/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then((data) => {
      setOneLocation(data);
    });
  }

  function View1() {
    const locationBoxes = [];

    const handleClick = (locationID) => {
      getOneLocation(locationID);
      setViewer(1);
    };

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i]

      locationBoxes.push(
        <div key={location._id} className="locationBox">
          <img src={location.images}></img>
          <p>{location.name}</p>
          <p>{location.description}</p>
          <button onClick={() => handleClick(location._id)}>More Info</button>
        </div>
      );
    }

    return (<div>
      <h1>Browse view</h1>
      <button onClick={() => setView(0)}>Browse</button>
      <button onClick={() => setView(2)}>Authors</button>
      <div id="locationBoxes">{locationBoxes}</div>
    </div>);
  }

  function View2() {

    return (<div>
      <h1>Specific location</h1>
      <button onClick={() => setView(0)}>Back to Browse</button>

    </div>);
  }

  function View3() {

    return (<div>
      <h1>Website Authors</h1>
      <button onClick={() => setView(0)}>Browse</button>
      <button onClick={() => setView(2)}>Authors</button>
      <div className="author">
        <div>
          <h3>Nathan Church</h3>
        </div>
        <div>
          <h3>Dalton Clark</h3>
        </div>
      </div>
    </div>);
  }






  return (<div>
    {viewer === 0 && <View1 />}
    {viewer === 1 && <View2 />}
    {viewer === 2 && <View3 />}
  </div>);
}

export default App;