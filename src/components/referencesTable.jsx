import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  useRecoilState,
} from 'recoil';

import {searchQueryState, filteredReferences} from "../store/statesRef"
import { TableContainer } from '@material-ui/core';

//import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function RefTable() {
  const classes = useStyles();

  //const [ references, setReferences] = useRecoilState(referencesState);

  const [ searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [ filteredRefs] = useRecoilState(filteredReferences);

  console.log('references in orders', filteredRefs);
    //fix chips

  return (
  
     <TableContainer>

      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Industry</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Policy</TableCell>
            <TableCell>Project Start</TableCell>
            <TableCell>Project End</TableCell>
            <TableCell >Technical Tags</TableCell>
            <TableCell >Procedure Tags</TableCell>
            <TableCell align="right">Person Days Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { filteredRefs.map((row) => (
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
                    setSearchQuery({
                      value:tag,
                      param: "technologyTag"
                    }) 
                  }}></Chip>))}
              </TableCell>
              <TableCell >
                {row.processTag.map((tag) => (
                  <Chip label={tag} onClick={e => {
                    setSearchQuery({
                      value:tag,
                      param: "processTag"
                    }) 
                  }}></Chip>))}
              </TableCell>
              <TableCell align="right">{row.personDaysTotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
    
  );
}



