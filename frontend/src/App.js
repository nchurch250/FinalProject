import React, {useState, useCallback} from 'react';

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

  function View1() {

    
    for (let i = 0; i < locations.length; i++) {
      const location = locations[i]

      return (<div>
        <h1>Browse view</h1>
        <img src={location.images[0].url}></img>
        <p>{location.name}</p>
        <p>{location.description}</p>
      </div>);
    }
  }
  
  function View2() {
    
    return (<div>

      </div>);
  }

  function View3() {
    
    return (<div>

      </div>);
  }
  





  return (<div>
    <button onClick={() => setView(0)}>Browse</button>
    <button onClick={() => setView(1)}>Specific Location</button>
    <button onClick={() => setView(2)}>Authors</button>

    {viewer === 0 && <View1 />}
    {viewer === 1 && <View2 />}
    {viewer === 2 && <View3 />}
  </div>);
}

export default App;