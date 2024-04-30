import React, {useState, useCallback} from 'react';

function App() {
  const [viewer, setViewer] = useState(0);

  const setView = (view) => {
    setViewer(view)

    switch (view) {
      case 0:
        getAllProducts();
        break;

      case 1:

        break;

      case 2:

        break;
    }
  }

  function getAllProducts() {
    fetch("http://localhost:8081/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setProducts(data);
      });
  }

  function View1() {

    return (<div>
      <h1>Browse view</h1>
    </div>);
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