import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
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

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://qperior-reference-mgmt-api.azurewebsites.net/slide-infos',
      );
      const dataFromSql = await result.json();
      const array = Object.values(dataFromSql);
      console.log("slides", dataFromSql)
      setSlides(array)
    };
    fetchData();
  }, []);


  console.log("slides", slides)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Button href = "https://qperior-reference-mgmt-api.azurewebsites.net/slide-deck" variant="contained" color="primary">
          Download Slides</Button>
      </header>
      <TableContainer component={Paper}>
        <Table color="primary" className={classes.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Slide Reference Info</StyledTableCell>
              <StyledTableCell align="right">Titel</StyledTableCell>
              <StyledTableCell align="right">Sektor</StyledTableCell>
              <StyledTableCell align="right">Kunde</StyledTableCell>
              <StyledTableCell align="right">Ort</StyledTableCell>
              <StyledTableCell align="right">Vorgehen</StyledTableCell>
              <StyledTableCell align="right">Ziele Des Projektes</StyledTableCell>
              <StyledTableCell align="right">Ergebnisse</StyledTableCell>
              <StyledTableCell align="right">Logo</StyledTableCell>
              <StyledTableCell align="right">Bild</StyledTableCell>
              <StyledTableCell align="right">Id</StyledTableCell>

            </StyledTableRow>
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
                <TableCell align="right">{row.ort}</TableCell>
                <TableCell align="right">{row.vorgehen}</TableCell>
                <TableCell align="right">{row.ziele_Des_Projektes}</TableCell>
                <TableCell align="right">{row.ergebnisse}</TableCell>
                <TableCell align="right">{row.logo}</TableCell>
                <TableCell align="right">{row.bild}</TableCell>
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
