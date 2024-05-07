import React, { useState, useEffect } from 'react';


function App() {
  const [viewer, setViewer] = useState(0);
  const [locations, setLocations] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [highestId, setHighestId] = useState(0);

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
    fetch("http://localhost:8081/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
        setLocations(data);
        if (data.length != 0) {
          setHighestId(data[data.length - 1].id);
        }
        else {
          setHighestId(0);
        }
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

    for (let i = 0; i < locations.length; i = i + 2) {
      const location = locations[i];
      let location2 = null;
      try {
        location2 = locations[i+1];
      } catch {

      }

      if (location2 == null) {
        locationBoxes.push(
          <div>
            <div key={location.id} className="locationPreview">
              <img src={location.images[0]}></img>
              <p className="textButton" onClick={() => handleClick(location.id)}>{location.name}</p>
            </div>
          </div>
        );
      } else {
        locationBoxes.push(
          <div className="pairedCards">
            <div key={location.id} className="locationPreview">
              <img src={location.images[0]}></img>
              <p className="textButton" onClick={() => handleClick(location.id)}>{location.name}</p>
            </div>
            <div key={location2.id} className="locationPreview">
              <img src={location2.images[0]}></img>
              <p className="textButton" onClick={() => handleClick(location2.id)}>{location2.name}</p>
            </div>
          </div>
        );
      }
    }

    return (<div className="page">

      <header>
        <h1>Browse</h1>
      </header>

      <nav>
        <button onClick={() => setView(0)}>Browse</button>
        <button onClick={() => setView(3)}>Update Pictures</button>
        <button onClick={() => setView(2)}>Authors</button>
      </nav>

      <div id="locationBrowse">{locationBoxes}</div>

      <footer>
        <p>Contact:</p>
        <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
      </footer>
    </div>);
  }


  function View2() {
    const location = locations[0];

    const [slideshow, setSlideshow] = useState(0);
    const allImages = [];

    for (let i = 0; i < location.images.length; i++) {
      allImages.push(location.images[i]);
    }

    const nextSlide = () => {
      setSlideshow((slideshow + 1) % allImages.length);
    }

    const prevSlide = () => {
      setSlideshow((slideshow - 1 + allImages.length) % allImages.length);
    }

    return (<div className="page">
      <button id="backButton" onClick={() => setView(0)}>Back to Browse</button>
      <div id="slideshowMain">
        <div className="slideshow">
          {allImages.map((image, index) => (
            <img key={index} className={index === slideshow ? "slideImage active" : "slideImage"} src={image}></img>
          ))}
        </div>

        <div className="slideButtons">
          <button className="submitButton" onClick={prevSlide}>Previous</button>
          <button className="submitButton" onClick={nextSlide}>Next</button>
        </div>

        <p>Location Name: {location.name}</p>
        <p>Location Description: {location.description}</p>
      </div>

      <footer>
        <p>Contact:</p>
        <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
      </footer>
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

          <div className="container">
            <img src={authors.find(item => item.id === 2).image} alt="Picture of Nathan" />
            <p>My name is Nathan Church, I am an undergraduate student at Iowa State University.<br />
              <a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a></p>
          </div>

          <div className="container">
            <img src={authors.find(item => item.id === 1).image} alt="Picture of Dalton" />
            <p>Hello! My name is Dalton Clark and I am a Computer Science major attending Iowa State University. <br />
              This is our final project for Com S 319 and I have completed Com S 227, 228, 230, and 309.<br />
              <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
          </div>

        </div>
      </div>

      <footer>
        <p>Contact:</p>
        <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
      </footer>
    </div>);
  }

  function View4() {

    function locationIdExists(id) {
      let exists = false;
      for (let i of locations) {
        if (i.id == id) {
          exists = true;
          break;
        }
      }
      getAllLocations();
      return exists;
    }

    //POST stuff
    const [newLocation, setNewLocation] = useState({
      id: (highestId + 1),
      images: [],
      name: '',
      description: ''
    });

    const handleSubmit = async (event) => {
      event.preventDefault();
      getAllLocations();

      if (event.target.name.value.length == 0 || event.target.description.value.length == 0 || event.target.images.value.length == 0) {
        alert("All fields must be populated in order to submit");
      }
      else {
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
          id: (highestId + 1),
          images: [],
          name: '',
          description: ''
        });
      }
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

    //PUT stuff
    const [location, setLocation] = useState([]);
    const [newImage, setNewImage] = useState("");

    const handleSubmitPut = (event) => {
      event.preventDefault();
      getAllLocations();

      if (!locationIdExists(event.target.id.value)) {
        alert("No valid location ID selected");
      }
      else if (newImage == "") {
        alert("Enter an image link");
      }
      else {
        fetch("http://localhost:8081/update/" + location[0].id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "image": newImage })
        })
          .then(response => response.json())

        alert("Added new image to location ID: " + location[0].id);
        setNewImage("");
        setLocation([]);
      }
    };

    const handleChangeLocation = (event) => {
      if (event.target.value.length != 0) {
        fetch("http://localhost:8081/read/" + event.target.value, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then((data) => {
            setLocation(data);
          });
      }
      else {
        setLocation([]);
      }
    };

    const handleChangePut = (event) => {
      setNewImage(event.target.value);
    };

    //Change this for making preview look good
    const showOneLocation = location.map((el) => (
      <div key={el.id} className="locationMiniPreview" id="floatRight">
        <img src={el.images[0]} />
        Name: <br />
        {el.name} <br /> <br />
        Description: <br />
        {el.description}
      </div>
    ));

    //DELETE stuff
    const handleSubmitDelete = (event) => {
      event.preventDefault();
      getAllLocations();

      if (!locationIdExists(event.target.id.value)) {
        alert("No valid location ID selected");
      }
      else if (event.target.confirmation.value != "yes") {
        alert("Enter 'yes' to confirm deletion");
      }
      else {
        fetch("http://localhost:8081/delete/" + location[0].id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())

        alert("Deleted Location with ID: " + location[0].id);
        setLocation([]);
      }
    };

    return (
      <div className="page">

<div className="inPage">
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
        {showOneLocation}
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <h1>Create New Location and Cover Picture</h1>
              <input type='text' placeholder='Name of the Location'
                onChange={handleChange} name='name' />
              <input id="descriptionInput" type='text' placeholder='Description of the Location'
                onChange={handleChange} name='description' />
              <input type='text' placeholder='Cover Image Link'
                onChange={handleChange} name='images' />
              <input className="submitButton" type="submit" value="Submit" />
            </div>
          </form>
          <form onSubmit={handleSubmitPut}>
            <div>
              <h1>Add Picture to Location with ID</h1>
              <input type='number' placeholder='ID of the location'
                onChange={handleChangeLocation} name='id' />
              <input type='text' placeholder='Image Link'
                onChange={handleChangePut} name='images' />
              <input className="submitButton" type="submit" value="Submit" />
            </div>
          </form>
          <form onSubmit={handleSubmitDelete}>
            <div>
              <h1>Delete a Location with ID</h1>
              <input type='number' placeholder='ID of the location'
                onChange={handleChangeLocation} name='id' />
              <input type='text' placeholder="Type 'yes' to confirm"
                name='confirmation' />
              <input className="submitButton" type="submit" value="Submit" />
            </div>
          </form>
        </div>

        <footer>
          <p>Contact:</p>
          <p><a href="mailto:nchurch@iastate.edu">nchurch@iastate.edu</a> or <a href="mailto:dbclark@iastate.edu">dbclark@iastate.edu</a></p>
        </footer>
        
</div>

        
      </div>
    );
  }


  return (<div>
    {viewer === 0 && <View1 />}
    {viewer === 1 && <View2 />}
    {viewer === 2 && <View3 />}
    {viewer === 3 && <View4 />}


  </div>);
}

export default App;