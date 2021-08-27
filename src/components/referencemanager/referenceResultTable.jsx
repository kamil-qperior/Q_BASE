import { TableContainer, TableHead, Badge, Tooltip } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  fetchReferenceContent,
  mapFromApi,
} from "../../services/referenceService";
import { languageCode } from "../../store/states";
import {
  chosenRefsState,
  filteredReferenceContents,
  filteredReferenceContentsForEdit,
  filteredReferences,
  formEditState,
  formOpenState,
  refTextFieldsState,
} from "../../store/statesRef";
import { i18n } from "../../utils/i18n/i18n";

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
  tableRow: {
    "&&:hover": {
      backgroundColor: "#0CB5F3",
    },
      },
  customBadge: {
    backgroundColor: "#00AFD7",
    color: "white",
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
  const [refContents] = useRecoilState(filteredReferenceContents);

  //content of refs
  const [filteredRefsContentsForEdit, setFilteredReferenceContentsForEdit] =
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
              {!onlySelection ? (
                <TableCell>
                  <div className={classes.vAlgiment}>
                    <div className={classes.tableHeader}>
                      {" "}
                      {i18n(lng, "Reference.tableHeader.project_start")}{" "}
                    </div>
                  </div>
                </TableCell>
              ) : null}
              {!onlySelection ? (
                <TableCell>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.project_end")}{" "}
                  </div>
                </TableCell>
              ) : null}
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
              {!onlySelection ? (
                <TableCell>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.person_days_total")}{" "}
                  </div>
                </TableCell>
              ) : null}
              {!onlySelection ? (
                <TableCell>
                  <div className={classes.tableHeader}>
                    {" "}
                    {i18n(lng, "Reference.tableHeader.add")}
                  </div>
                </TableCell>
              ) : null}
              {/* only for selection view */}
              {onlySelection ? (
                <TableCell>
                  <div className={classes.tableHeader}></div>
                </TableCell>
              ) : null}
              {onlySelection ? (
                <TableCell>
                  <div className={classes.tableHeader}></div>
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
                    onClick={handleRefPopUp(
                      row,
                      setFilteredReferenceContentsForEdit,
                      setOpen,
                      setRefState,
                      setEnabledEdit,
                      onlySelection
                    )} //last param enabels edit
                    selected={true}
                  >
                    <Link>{row.name}</Link>
                  </TableCell>

                  <TableCell>{row.client.name}</TableCell>
                  <TableCell>{row.industry}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  {/*                   <TableCell>{row.status}</TableCell>
                  <TableCell>{row.policy}</TableCell> */}
                  {!onlySelection ? (
                    <TableCell>{row.projectBegin.substring(0, 10)}</TableCell>
                  ) : null}
                  {!onlySelection ? (
                    <TableCell>{row.projectEnd.substring(0, 10)}</TableCell>
                  ) : null}
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
                  {!onlySelection ? (
                    <TableCell align="right">{row.personDaysTotal}</TableCell>
                  ) : null}
                  {!onlySelection ? (
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) =>
                          setChosenRefs(changeRef(chosenRefs, row))
                        }
                        color="primary"
                        aria-label="add"
                      >
                        {" "}
                        <AddBoxIcon />{" "}
                      </IconButton>
                    </TableCell>
                  ) : null}
                  {onlySelection ? (
                    <TableCell align="right">
                      {/* row?.configured === true */}
                      <Tooltip
                        title={i18n(lng, "CV.tableIcons.edit")}
                        placement="bottom"
                      >
                        <IconButton
                          onClick={handleRefPopUp(
                            row,
                            setFilteredReferenceContentsForEdit,
                            setOpen,
                            setRefState,
                            setEnabledEdit,
                            onlySelection
                          )}
                          color="primary"
                          aria-label="edit"
                        >
                          <Badge
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            classes={{ badge: classes.customBadge }}
                            variant="dot"
                            invisible={!row?.configured}
                            badgeContent={false}
                          >
                            <EditIcon />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  ) : null}
                  {onlySelection ? (
                    <TableCell align="right">
                      <Tooltip
                        title={i18n(lng, "CV.tableIcons.delete")}
                        placement="bottom"
                      >
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
                      </Tooltip>
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

function handleRefPopUp(
  row,
  setFilteredReferenceContentsForEdit,
  setOpen,
  setRefState,
  setEnabledEdit,
  enableEdit
) {
  return async () => {
    //this is the data to use for PaperRef
    const contentsDE = await fetchReferenceContent(row.referenceID, "DE");
    const contentsEN = await fetchReferenceContent(row.referenceID, "EN");
    //sending both langauges
    const combinedLng = contentsDE.concat(contentsEN);
    setFilteredReferenceContentsForEdit(combinedLng);

    setOpen(true);
    // set  row.referenceID for the currently chosen ref to edit

    setEnabledEdit(enableEdit);
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
