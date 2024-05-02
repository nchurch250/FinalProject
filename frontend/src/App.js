import React, { useState, useEffect } from 'react';


function App() {
  const [viewer, setViewer] = useState(0);
  const [locations, setLocations] = useState([]);
  const [authors, setAuthors] = useState([]);

  //Initial load functions
  useEffect(() => {
    getAllAuthors();
    getAllLocations();
  }, [])

  const setView = (view) => {
    setViewer(view)

    switch (view) {
      case 0:
        getAllLocations();
        break;

      case 1:

        break;

      case 2:
        getAllAuthors();
        break;

      case 3:

        break;
    }
  }

  function getAllLocations() {
    let result;
    fetch("http://localhost:8081/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
        setLocations(data);
        result = data;
      });
    return result;
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

  function getAllAuthors() {
    fetch("http://localhost:8081/authors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
        setAuthors(data);
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
          <img src={location.images[0]}></img>
          <p className="textButton" onClick={() => handleClick(location.id)}>{location.name}</p>
        </div>
      );
    }

    return (<div className="page">

      <header>
        <h1>Browse view</h1>
      </header>

      <nav>
        <button onClick={() => setView(0)}>Browse</button>
        <button onClick={() => setView(3)}>Update Pictures</button>
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
        <button onClick={() => setView(3)}>Update Pictures</button>
        <button onClick={() => setView(2)}>Authors</button>
      </nav>

      <br />
      <br />
      <div className="author">
        <div className="container-wrapper">

          <div class="container">
            <img src={authors.find(item => item.id === 2).image} alt="Picture of Nathan" />
            <p>My name is Nathan Church, I am an undergraduate student at Iowa State University.<br />
              <a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a></p>
          </div>

          <div class="container">
            <img src={authors.find(item => item.id === 1).image} alt="Picture of Dalton" />
            <p>Hello! My name is Dalton Clark and I am a Computer Science major attending Iowa State University. <br />
              This is our final project for Com S 319 and I have completed Com S 227, 228, 230, and 309.<br />
              <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
          </div>

        </div>
      </div>
    </div>);
  }


  function View4() {

    const [newLocation, setNewLocation] = useState({
      id: (locations.length + 1),
      images: [],
      name: '',
      description: ''
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      getAllLocations();

      fetch("http://localhost:8081/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocation)
      })
        .then(response => response.json())

      alert("Location and Cover Picture Added to Database with ID: " + newLocation.id);
      getAllLocations();
      setNewLocation({
        id: (locations.length + 1),
        images: [],
        name: '',
        description: ''
      });
    };

    const handleChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;

      setNewLocation((prevalue) => {
        return {
          ...prevalue,   // Spread Operator               
          [name]: value
        }
      })
    }

    return (
      <div className="page">

        <header>
          <h1>Update Pictures</h1>
        </header>

        <nav>
          <button onClick={() => setView(0)}>Browse</button>
          <button onClick={() => setView(3)}>Update Pictures</button>
          <button onClick={() => setView(2)}>Authors</button>
        </nav>

        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Create New Location and Cover Picture</h1>
            <input type='text' placeholder='Name of the Location'
              onChange={handleChange} name='name' />
            <input type='text' placeholder='Description of the Location'
              onChange={handleChange} name='description' />
            <input type='text' placeholder='Cover Image Link'
              onChange={handleChange} name='images' />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Add Picture to Location with ID</h1>
            <input type='number' placeholder='ID of the location'
              onChange={handleChange} name='name' />
            <input type='text' placeholder='Image Link'
              onChange={handleChange} name='description' />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }


  return (<div>
    {viewer === 0 && <View1 />}
    {viewer === 1 && <View2 />}
    {viewer === 2 && <View3 />}
    {viewer === 3 && <View4 />}

    <footer>
      <p>Contact:</p>
      <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
    </footer>
  </div>);
}

export default App;