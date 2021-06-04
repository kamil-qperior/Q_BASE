import React from 'react';
import Link from '@material-ui/core/Link';
import {  useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

import {
  useRecoilState,
} from 'recoil';

import {searchQueryState, filteredReferences,chosenRefsState} from "../store/statesRef"
import { TableContainer } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function RefTable() {
  const classes = useStyles();

  const [ page, setPage]  = useState(0)
  const [ rowsPerPage, setRowsPerPage]  = useState(10)
  const [ searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [ filteredRefs] = useRecoilState(filteredReferences);
  const [ chosenRefs, setChosenRefs] = useRecoilState(chosenRefsState);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //TODO only page filtering works , not changing page 
  return (
    <div>

     <TableContainer>
      <Table >
        <TableHead>
          <TableRow key={"labels"}>
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
            <TableCell align="right">Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { filteredRefs.slice(page*rowsPerPage,rowsPerPage + page*rowsPerPage).map((row) => (
            <TableRow key={row.referenceID} selected={chosenRefs.find(cr => cr.referenceID === row.referenceID)}>
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
              <TableCell align="right"><IconButton 
                onClick={(e) => setChosenRefs(changeRef(chosenRefs, row))}
                color="primary" aria-label="add"> <AddBoxIcon/> </IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
          <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRefs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          </div>
    
  );
}



function changeRef(chosenRefs, row) {
  const referenceID = row.referenceID
  const refAlreadyInArray = chosenRefs.find(cr => cr?.referenceID === referenceID);
  return refAlreadyInArray ? chosenRefs.filter( cr => cr?.referenceID !== referenceID) : chosenRefs.concat(row) ;
  
}


