import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'



function App() {
  
  const [slides, setSlides] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://sql-connector-azure.azurewebsites.net/slide-infos',
      );
      const dataFromSql = await result.json();
      const array = Object.values(dataFromSql);
      setSlides(array)
    };
    fetchData();
  }, []);
  
  
  console.log("slides", slides)
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload in Azure.
        </p>
        <div>
          {slides.map(element => (
             <ul  >
              <li>{element.titel}</li>
              <li>{element.sektor}</li>
              <li>{element.kunde}</li>
              <li>{element.id}</li>
            </ul>
          ))}
        </div>;
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
