import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import FilterDialog from "./subComponents/FilterDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  languageCode,
  CVsData,
  CVsDataSelected,
  CVsDataWithFilter,
  filterCertificationData,
  hierachyHeight,
  filterITCompetenciesData,
  filterFunctionalAndMethodCompetenciesData,
  filterIndustryKnowHowData,
  filterConsultingEmphasisData,
  filterLanguagesData,
  showCVPopover,
} from "../../store/states";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { useRecoilState } from "recoil";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DoneIcon from "@material-ui/icons/Done";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Hierachie from "./Hierachie";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { i18n } from "../../utils/i18n/i18n";
import ShortChip from "./subComponents/ShortChip";
import SearchBarLeft from "./subComponents/SearchBarLeft";
import Checkbox from "@material-ui/core/Checkbox";
import DialogCV from "./subComponents/DialogCV";
import { getCVs } from "./subComponents/restCalls/getCVService";
import Select from "@material-ui/core/Select";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "initial",
    display: "flex",
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
  leftSearchBar: {},
  selectTemplate: {
    width: "9rem",
  },
  toolbar: {
    "justify-content": "flex-end",
  },
  buttonDownload: {
    "margin-left": "2rem",
  },
}));

export default function SelectedTableItems() {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [templateID, setTemplateID] = React.useState(20);

  const [employes] = useRecoilState(CVsDataWithFilter);
  let [CVsDataRaw, setCVsData] = useRecoilState(CVsData);
  const [CVsDataSelectedRaw, setCVsDataSelected] =
    useRecoilState(CVsDataSelected);

  const index = CVsDataSelectedRaw.findIndex((el) => el.isExpanded);

  const [theHierachyHeight] = useRecoilState(hierachyHeight);

  const [theShowCVPopover, setShowCVPopover] = useRecoilState(showCVPopover);
  const [filterITCompetencies] = useRecoilState(filterITCompetenciesData);
  const [filterFunctionalAndMethodCompetencies] = useRecoilState(
    filterFunctionalAndMethodCompetenciesData
  );
  const [filterIndustryKnowHow] = useRecoilState(filterIndustryKnowHowData);
  const [filterConsultingEmphasis] = useRecoilState(
    filterConsultingEmphasisData
  );
  const [filterLanguages] = useRecoilState(filterLanguagesData);

  const [lng] = useRecoilState(languageCode);
  //  const [hierachieHight, setHierachieHight] = React.useState("0px");
  const [theWidth, setWidth] = React.useState(window.innerWidth);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTemplateChange = (event) => {
    setTemplateID(event.target.value);
  };
  const handleDownloadClick = (event) => {
    getCVs(templateID);
  };

  const EnhancedTableToolbar = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className={classes.selectTemplate}
          value={templateID}
          onChange={handleTemplateChange}
        >
          <MenuItem value={10}>Q_PERIOR</MenuItem>
          <MenuItem value={20}>SBB</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadClick}
          className={classes.buttonDownload}
        >
          DOWNLOAD
        </Button>
      </Toolbar>
    );
  };
  const Row = (props) => {
    const { row } = props;
    let consultingEmphasis = [...row.consultingEmphasis].filter(Boolean);
    let industryKnowHow = [...row.industryKnowHow].filter(Boolean);
    let technicalAndMethodologicalCompetence = [
      ...row.technicalAndMethodologicalCompetence,
    ].filter(Boolean);
    let languages = [...row.languages].filter(Boolean);
    let itCompetence = [...row.itCompetence].filter(Boolean);
    let certificates = [...row.certificates].filter(Boolean);
    const [open, setOpen] = React.useState(false);
    const onSelectRow = (event, rowID) => {
      console.log('row was selected');
      setShowCVPopover(true);
      setCVsDataSelected(
        CVsDataSelectedRaw.map((el) =>
          el.id === rowID
            ? { ...el, isExpanded: !el.isExpanded }
            : { ...el, isExpanded: false }
        )
      );
    };
    const onDelteSelectedRow = (event, rowID) => {
      setCVsData(
        CVsDataRaw.map((el) =>
          el.id === rowID ? { ...el, isSelected: !el.isSelected } : { ...el }
        )
      );
      setCVsDataSelected(CVsDataSelectedRaw.filter((el) => el.id !== rowID));
    };
    return (
      <React.Fragment>
        <TableRow
          // hover
          // onClick={(event) => onSelectRow(event, row.id)}
          key={row.id}
          // style={{ cursor: "pointer" }}
          // selected={row.isExpanded}
        >
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.topicChapter}</TableCell>
          <TableCell>{row.level}</TableCell>
          <TableCell>
            <IconButton
              // size="small"
              // className={classes.collapseIcon}
              color="primary"
              onClick={(event) => onSelectRow(event, row.id)}
              // data-type="DeleteIcon"
            >
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              // size="small"
              // className={classes.collapseIcon}
              color="primary"
              onClick={(event) => onDelteSelectedRow(event, row.id)}
              // data-type="DeleteIcon"
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <div>
        {/* <Box height={theHierachyHeight} className={classes.hierachieTransition}>
          <Hierachie />
        </Box> */}
        <EnhancedTableToolbar />
        <TableContainer className={classes.customTableContainer}>
          {/* <TableContainer style={{ height: theHeight - 120 }}> */}
          <Table stickyHeader className={classes.table}>
            {/* <colgroup>
              <col width="5rem" />
              <col width={theWidth * 0.3} />
              <col width={theWidth * 0.1} />
              <col width={theWidth * 0.1} />
            </colgroup> */}
            <TableHead>
              <TableRow>
                <TableCell>
                  <div className={classes.algiment}>
                    <div className={classes.tableHeader}>
                      {i18n(lng, "CV.tableHeader.employee")}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={classes.algiment}>
                    <div className={classes.tableHeader}>
                      {i18n(lng, "CV.tableHeader.topicChapter")}
                    </div>
                    {/* <FilterDialog dialogKey="topicChapter" /> */}
                  </div>
                </TableCell>

                <TableCell>
                  <div className={classes.algiment}>
                    <div className={classes.tableHeader}>
                      {i18n(lng, "CV.tableHeader.level")}
                    </div>
                    {/* <FilterDialog dialogKey="level" /> */}
                  </div>
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CVsDataSelectedRaw.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row) => (
                <Row key={row.cvFolder} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.footer}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          labelRowsPerPage={i18n(lng, "CV.tableFooter.rowsPerPage")}
          count={CVsDataSelectedRaw.filter((el) => el.isSelected).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      {index > -1 ? (
        <DialogCV
          theCVsDataState={CVsDataSelected}
          index={index}
          modus="write"
        />
      ) : null}
    </div>
  );
}
