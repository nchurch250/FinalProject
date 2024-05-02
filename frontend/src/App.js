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
        <div key={location._id} className="locationPreview">
          <img src={location.image} alt=''></img>
          <p className="textButton" onClick={() => handleClick(location.id)}>{location.name}</p>
        </div>
      );
    }

    return (<div className="page">
      <header>
        <h1>Browse Locations</h1>
      </header>

      <nav>
        <button onClick={() => setView(0)}>Browse</button>
        <button onClick={() => setView(2)}>Authors</button>
      </nav>

      <div id="locationBrowse">{locationBoxes}</div>
    </div>);
  }

  function View2() {

    const location = locations[0];

    return (<div className="page">
      <button id="backButton" onClick={() => setView(0)}>Back to Browse</button>
      <div id="locationMain">
        <img src={location.image} alt=''></img>
        <p>{location.name}</p>
        <p>{location.description}</p>
      </div>
    </div>);
  }

  function View3() {

    return (<div className="page">
      <header>
        <h1>Website Authors</h1>
      </header>

      <nav>
        <button onClick={() => setView(0)}>Browse</button>
        <button onClick={() => setView(2)}>Authors</button>
      </nav>

      <br />
      <br />
      <div className="author">
        <div className="container-wrapper">

          <div className="container">
            <img src={nathanPicture} alt="Picture of Nathan" />
            <p>My name is Nathan Church, I am an undergraduate student at Iowa State University.<br />
              <a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a></p>
          </div>

          <div className="container">
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

    <footer>
      <p>Contact:</p>
      <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
    </footer>
  </div>);
}

export default App;