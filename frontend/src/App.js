import React, { useState } from 'react';
import nathanPicture from './images/nathan.jpg';
import daltonPicture from './images/DaltonPicture.jpg';


function App() {
  const [viewer, setViewer] = useState(0);
  const [locations, setLocations] = useState([]);

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
      setLocations(data);
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
        <div key={location.id} className="locationBox">
          <img src={location.images}></img>
          <p>{location.name}</p>
          <p>{location.description}</p>
          <button onClick={() => handleClick(location.id)}>More Info</button>
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

    const location = locations[0];

    return (<div>
      <h1>Specific location</h1>
      <button onClick={() => setView(0)}>Back to Browse</button>
      <p>{location.name}</p>

    </div>);
  }

  function View3() {

    return (<div>
      <h1>Website Authors</h1>
      <button onClick={() => setView(0)}>Browse</button>
      <button onClick={() => setView(2)}>Authors</button>
      <br />
      <br />
      <div class="author">
        <div class="container-wrapper">

          <div class="container">
              <img src={nathanPicture} alt="Picture of Nathan" />
              <p>Nathan Church<br />
              <a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a></p>
          </div>

          <div class="container">
            <img src={daltonPicture} alt="Picture of Dalton" />
            <p>Hello! My name is Dalton Clark and I am a Computer Science major attending Iowa State University. <br />
              This is our final project for Com S 319 and I have completed Com S 227, 228, 230, and 309.<br />
            <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
            
          </div>

        </div>
      </div>
    </div>);
  }






  return (<div>
    {viewer === 0 && <View1 />}
    {viewer === 1 && <View2 />}
    {viewer === 2 && <View3 />}

    <div class="footer-padding"></div>
    <footer>
        <p>Contact:</p>
        <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
    </footer>
  </div>);
}

export default App;