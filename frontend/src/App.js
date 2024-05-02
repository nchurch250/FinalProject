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
        <div key={location._id} className="locationBox">
          <img src={location.images[0]}></img>
          <p>{location.name}</p>
          <p>{location.description}</p>
          <button onClick={() => handleClick(location.id)}>More Info</button>
        </div>
      );
    }

    return (<div>
      <h1>Browse view</h1>
      <button onClick={() => setView(0)}>Browse</button>
      <button onClick={() => setView(3)}>Update Pictures</button>
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
      <button onClick={() => setView(3)}>Update Pictures</button>
      <button onClick={() => setView(2)}>Authors</button>
      <br />
      <br />
      <div class="author">
        <div class="container-wrapper">

          <div class="container">
              <img src={authors.find(item => item.id === 2).image} alt="Picture of Nathan" />
              <p>Nathan Church<br />
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
      <div>
        <h1>Update Pictures</h1>
        <button onClick={() => setView(0)}>Browse</button>
        <button onClick={() => setView(3)}>Update Pictures</button>
        <button onClick={() => setView(2)}>Authors</button>
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

    <div class="footer-padding"></div>
    <footer>
        <p>Contact:</p>
        <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
    </footer>
  </div>);
}

export default App;