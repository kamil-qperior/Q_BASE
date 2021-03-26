import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function App() {

  const [slides, setSlides] = useState([]);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Titel</TableCell>
              <TableCell align="right">Sektor</TableCell>
              <TableCell align="right">Kunde</TableCell>
              <TableCell align="right">id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slides.map((row) => (
              <TableRow key={row.titel}>
                <TableCell component="th" scope="row">
                  {row.titel}
                </TableCell>
                <TableCell align="right">{row.titel}</TableCell>
                <TableCell align="right">{row.sektor}</TableCell>
                <TableCell align="right">{row.kunde}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
