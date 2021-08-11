import { TableContainer, TableHead } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddBoxIcon from "@material-ui/icons/AddBox";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  fetchReferenceContent,
  mapFromApi,
} from "../../services/referenceService";
import {
  clientFilterHolder,
  filterNameData,
  filterProcedureData,
  filterTechnologyData,
} from "../../store/filter";
import { languageCode } from "../../store/states";
import {
  chosenRefsState,
  filteredReferenceContentsForEdit,
  filteredReferences,
  formEditState,
  formOpenState,
  refTextFieldsState,
} from "../../store/statesRef";
import { i18n } from "../../utils/i18n/i18n";
import FilterDialog from "../cv/subComponents/FilterDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
    color: "green",
  },
  smallMargin: {
    margin: "0px 4px 2px 0px",
  },
  algiment: {
    display: "flex;",
  },
  footer: {
    left: 0,
    bottom: 0, // <-- KEY
    zIndex: 2,
    position: "sticky",
    "background-color": "aliceblue",
  },
  hierachieTransition: {
    transition: "height 1s",
    overflow: "hidden",
  },
  tableHeader: {
    "align-self": "center;",
    "font-size": "large;",
    // color: "darkslategray;",
  },
  customTableContainer: {
    // overflowX: "initial",
    // padding: 5,
    "overflow-x": "initial",
  },
}));

export default function ReferenceResultTable(data) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lng] = useRecoilState(languageCode);

  //from store
  /*   const [filterName, setFilterNameData] = useRecoilState(filterNameData);
  const [filterClient, setFilterClient] = useRecoilState(clientFilterHolder); */

  //do we want to do it via table or filter on the left
  /*   const [filterTechnology, setFilterTechnology] =
    useRecoilState(filterTechnologyData);
  const [filterProcedure, setFilterProcedureData] =
    useRecoilState(filterProcedureData); */

  const [filteredRefs] = useRecoilState(filteredReferences);
  const [chosenRefs, setChosenRefs] = useRecoilState(chosenRefsState);

  //content of refs
  const [filteredReferenceContents, setFilteredReferenceContentsForEdit] =
    useRecoilState(filteredReferenceContentsForEdit);

  //for editing of existing refrences
  const [open, setOpen] = useRecoilState(formOpenState);
  const [refState, setRefState] = useRecoilState(refTextFieldsState);
  const [enabledEdit, setEnabledEdit] = useRecoilState(formEditState);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onlySelection = data.onlySelection;


  const rowsToBeDisplayed = onlySelection ? chosenRefs : filteredRefs;
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /*   function handleNameChange(event, value) {
    setFilterNameData(event.target.value);
  }

  function handleClientChange(event, value) {
    setFilterClient(event.target.value);
  }
 */

  //TODO only page filtering works , not changing page
  return (
    <div>
      <TableContainer className={classes.customTableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow key={"labels"}>
              <TableCell>
                <div className={classes.vAlgiment}>
                  <div className={classes.tableHeader}>
                    {i18n(lng, "Reference.tableHeader.name")}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.vAlgiment}>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.client")}{" "}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.industry")}{" "}
                  </div>
                  {/*        <FilterDialog dialogKey="industry" /> */}
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}>
                    {i18n(lng, "Reference.tableHeader.country")}{" "}
                  </div>
                  {/* <FilterDialog dialogKey="country" /> */}
                </div>
              </TableCell>
              {/*               <TableCell>
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}>{i18n(lng, "Reference.tableHeader.status")}  </div>
                  <FilterDialog dialogKey="status" />
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <div className={classes.hAlgiment}>
                  <div className={classes.tableHeader}> {i18n(lng, "Reference.tableHeader.policy")} </div>
                  <FilterDialog dialogKey="policy" />
                </div>
              </TableCell> */}
              <TableCell>
                <div className={classes.vAlgiment}>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.project_start")}{" "}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.tableHeader}>
                  {" "}
                  {i18n(lng, "Reference.tableHeader.project_end")}{" "}
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.tableHeader}>
                  {" "}
                  {i18n(lng, "Reference.tableHeader.tech_tags")}{" "}
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.tableHeader}>
                  {" "}
                  {i18n(lng, "Reference.tableHeader.procedure_tags")}{" "}
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.tableHeader}>
                  {" "}
                  {i18n(lng, "Reference.tableHeader.person_days_total")}{" "}
                </div>
              </TableCell>

              <TableCell>
                <div className={classes.tableHeader}>
                  {" "}
                  {i18n(lng, "Reference.tableHeader.add")}
                </div>
              </TableCell>
              {/* only for selection view */}
              {onlySelection ? (
                <TableCell>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.edit")}
                  </div>
                </TableCell>
              ) : null}
              {onlySelection ? (
                <TableCell>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.delete")}
                  </div>
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToBeDisplayed
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
                    onClick={handleRefPopUp(row, setFilteredReferenceContentsForEdit, setOpen, setRefState,setEnabledEdit, onlySelection)  } //last param enabels edit 
                  >
                    <Link>{row.name}</Link>
                  </TableCell>
                  <TableCell>{row.client.name}</TableCell>
                  <TableCell>{row.industry}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  {/*                   <TableCell>{row.status}</TableCell>
                  <TableCell>{row.policy}</TableCell> */}
                  <TableCell>{row.projectBegin.substring(0, 10)}</TableCell>
                  <TableCell>{row.projectEnd.substring(0, 10)}</TableCell>
                  <TableCell>
                    {row.technologyTag.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={(e) => {
                          //fix to handle arrays
                          /*                           setFilterTechnology(tag);
                           */
                        }}
                      ></Chip>
                    ))}
                  </TableCell>
                  <TableCell>
                    {row.processTag.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={(e) => {
                          /*                           setFilterProcedureData(tag);
                           */
                        }}
                      ></Chip>
                    ))}
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
                  {onlySelection ? (
                    <TableCell align="right">
                      <IconButton
                        onClick={handleRefPopUp(row, setFilteredReferenceContentsForEdit, setOpen, setRefState,setEnabledEdit, onlySelection)}
                        color="primary"
                        aria-label="edit"
                      >
                        {" "}
                        <EditIcon />{" "}
                      </IconButton>
                    </TableCell>
                  ) : null}
                  {onlySelection ? (
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) =>
                          setChosenRefs(changeRef(chosenRefs, row))
                        }
                        color="primary"
                        aria-label="delete"
                      >
                        {" "}
                        <DeleteIcon />{" "}
                      </IconButton>
                    </TableCell>
                  ) : null}
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

function handleRefPopUp(row, setFilteredReferenceContentsForEdit, setOpen, setRefState,setEnabledEdit, enableEdit) {
  return async () => {
    //this is the data to use for PaperRef
    console.log("click");
    const contentsDE = await fetchReferenceContent(
      row.referenceID,
      "DE"
    );
    const contentsEN = await fetchReferenceContent(
      row.referenceID,
      "EN"
    );
    //sending both langauges
    const combinedLng = contentsDE.concat(contentsEN);
    console.log("combinedLng", combinedLng);
    setFilteredReferenceContentsForEdit(combinedLng);

    setOpen(true);
    
    setEnabledEdit(enableEdit)
    setRefState(mapFromApi(row));
  };
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
