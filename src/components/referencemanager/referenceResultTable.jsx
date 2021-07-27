import React from "react";
import Link from "@material-ui/core/Link";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Chip from "@material-ui/core/Chip";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { TableHead, TextField } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";

import {
  fetchReferenceContent,
  mapFromApi,
} from "../../services/referenceService";
import FilterDialog from "../cv/subComponents/FilterDialog";

import { useRecoilState } from "recoil";

import {
  searchQueryState,
  formOpenState,
  refTextFieldsState,
  filteredReferenceContentsForEdit,
  filteredReferences,
  chosenRefsState,
} from "../../store/statesRef";
import { TableContainer } from "@material-ui/core";
import {
  technologies,
  filterNameData,
  filterClientData,
  filterProcedureData,
  policies,
  status,
  filterTechnologyData,
} from "../../store/filter";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  customTableContainer: {
    "overflow-x": "initial",
    width: "50%"
  },
  footer: {
    left: 0,
    bottom: 0, // <-- KEY
    zIndex: 2,
    position: "sticky",
    "background-color": "aliceblue",
  },
  vAlgiment: {
    display: "initial",
  },
  hAlgiment: {
    display: "flex;",
  },
  tableHeader: {
    "align-self": "center;",
    "font-size": "large;",
    color: "darkslategray;",
  },
}));

export default function ReferenceResultTable() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //from store
  const [filterName, setFilterNameData] = useRecoilState(filterNameData);
  const [filterClient, setFilterClient] = useRecoilState(filterClientData);
  const [filterTechnology, setFilterTechnology] = useRecoilState(filterTechnologyData);
  const [filterProcedure, setFilterProcedureData] = useRecoilState(filterProcedureData);

  const [filteredRefs] = useRecoilState(filteredReferences);
  const [chosenRefs, setChosenRefs] = useRecoilState(chosenRefsState);

  //content of refs
  const [filteredReferenceContents, setFilteredReferenceContentsForEdit] =
    useRecoilState(filteredReferenceContentsForEdit);

  //for editing of existing refrences
  const [open, setOpen] = useRecoilState(formOpenState);
  const [refState, setRefState] = useRecoilState(refTextFieldsState);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function handleNameChange(event, value) {
    setFilterNameData(event.target.value);
  }

  function handleClientChange(event, value) {
    setFilterClient(event.target.value);
  }

  //TODO only page filtering works , not changing page
  return (
    <div>
      <TableContainer className={classes.customTableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key={"labels"}>
              
              <TableCell>
                <div className={classes.vAlgiment}>
                  <div className={classes.tableHeader}> Name </div>
                  <TextField
                    onChange={handleNameChange}
                    placeholder="Name"
                    id="name"
                    value={filterName}
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.vAlgiment}>
                  <div className={classes.tableHeader}> Client </div>
                  <TextField
                    onChange={handleClientChange}
                    placeholder="Client"
                    id="name"
                    value={filterClient}
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}> Industry </div>
                  <FilterDialog dialogKey="industry" />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}> Country </div>
                  <FilterDialog dialogKey="country" />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}> Status </div>
                  <FilterDialog dialogKey="status" />
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}> Policy </div>
                  <FilterDialog dialogKey="policy" />
                </div>
              </TableCell>
              <TableCell>Project Start</TableCell>
              <TableCell>Project End</TableCell>
              <TableCell>Technical Tags</TableCell>
              <TableCell>Procedure Tags</TableCell>
              <TableCell align="right">Person Days Total</TableCell>
              <TableCell align="right">Add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRefs
              .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.referenceID}
                  selected={
                    chosenRefs.find((cr) => cr.referenceID === row.referenceID)
                      ? true
                      : false
                  }
                >
                  <TableCell
                    onClick={async () => {
                      setOpen(true);

                      setRefState(mapFromApi(row));

                      const contentsDE = await fetchReferenceContent(
                        row.referenceID,
                        "DE"
                      );
                      const contentsEN = await fetchReferenceContent(
                        row.referenceID,
                        "EN"
                      );
                      //sending both langauges
                      setFilteredReferenceContentsForEdit(
                        contentsDE.concat(contentsEN)
                      );
                    }}
                  >
                    <Link>{row.name}</Link>
                  </TableCell>
                  <TableCell>{row.client.name}</TableCell>
                  <TableCell>{row.industry}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.policy}</TableCell>
                  <TableCell>{row.projectBegin.substring(0, 10)}</TableCell>
                  <TableCell>{row.projectEnd.substring(0, 10)}</TableCell>
                  <TableCell>
                           {row.technologyTag.map((tag) => (
                  <Chip key={tag} label={tag} onClick={e => {
                    //fix to handle arrays
                    setFilterTechnology(tag) 
                  }}></Chip>))}
                  </TableCell>
                  <TableCell>
                          {row.processTag.map((tag) => (
                  <Chip  key={tag} label={tag} onClick={e => {
                    setFilterProcedureData(tag) 
                  }}></Chip>))} 
                  </TableCell>
                  <TableCell align="right">{row.personDaysTotal}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => setChosenRefs(changeRef(chosenRefs, row))}
                      color="primary"
                      aria-label="add"
                    >
                      {" "}
                      <AddBoxIcon />{" "}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.footer}
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
  const referenceID = row.referenceID;
  const refAlreadyInArray = chosenRefs.find(
    (cr) => cr?.referenceID === referenceID
  );
  return refAlreadyInArray
    ? chosenRefs.filter((cr) => cr?.referenceID !== referenceID)
    : chosenRefs.concat(row);
}
