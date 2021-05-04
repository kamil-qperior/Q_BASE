import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function RefTable({ isLoading, references, setSearchQueryTag, searchQueryTag }) {
  const classes = useStyles();


  console.log('references in orders', references);

  //all state objects are saved as array

  //const references= input.references


  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Kunde</TableCell>
            <TableCell>Industry</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Policy</TableCell>
            <TableCell>Projekt Start</TableCell>
            <TableCell>Projekt Ende</TableCell>
            <TableCell >Technische Tags</TableCell>
            <TableCell align="right">Person Days Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {references && references.map((row) => (
            <TableRow key={row.referenceID}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.client.name}</TableCell>
              <TableCell>{row.industry}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.policy}</TableCell>
              <TableCell>{row.projectBegin.substring(0, 10)}</TableCell>
              <TableCell>{row.projectEnd.substring(0, 10)}</TableCell>
              <TableCell >
                {row.technologyTag.map((tag) => (
                  <Chip label={tag} onClick={e => {
                    setSearchQueryTag(tag)
                  }}></Chip>))}
              </TableCell>
              <TableCell align="right">{row.personDaysTotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
          </Link>
      </div>
    </React.Fragment>
  );
}



