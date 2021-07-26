import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import FilterDialog from "./subComponents/FilterDialog";
import {
  languageCode,
  CVsData,
  CVsDataWithFilter,
  filterCertificationData,
  hierachyHeight,
  filterITCompetenciesData,
  filterFunctionalAndMethodCompetenciesData,
  filterIndustryKnowHowData,
  filterConsultingEmphasisData,
  filterLanguagesData,
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
}));

export default function SpanningTable() {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [employes] = useRecoilState(CVsDataWithFilter);
  let [CVsDataRaw, setCVsData] = useRecoilState(CVsData);

  const [theHierachyHeight] = useRecoilState(hierachyHeight);

  const [filteredCertificates] = useRecoilState(filterCertificationData);
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
  // const handleClick = () => {
  //   setHierachieHight(hierachieHight === "0px" ? "472px" : "0px");
  // };
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
    const checkValeInArray = (theArray, val) => {
      return theArray
        .filter((el) => {
          return el.selected === true;
        })
        .map((el) => el.data)
        .includes(val);
    };
    return (
      <React.Fragment>
        <TableRow key={row.cvFolder}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() =>
                setCVsData(
                  CVsDataRaw.map((el) => {
                    return {
                      ...el,
                      isExpanded: el === row ? !el.isExpanded : el.isExpanded,
                    };
                  })
                )
              }
            >
              {row.isExpanded ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.topicChapter}</TableCell>
          <TableCell>
            {certificates
              .sort((a, b) => {
                return a.name.toUpperCase().trim() > b.name.toUpperCase().trim()
                  ? 1
                  : -1;
              })
              .map((zerti) => (
                <Chip
                  className={classes.smallMargin}
                  color={
                    checkValeInArray(filteredCertificates, zerti.name)
                      ? "primary"
                      : ""
                  }
                  deleteIcon={<DoneIcon />}
                  label={zerti.name}
                  onDelete={
                    checkValeInArray(filteredCertificates, zerti.name)
                      ? (val) => {
                          console.log(val);
                        }
                      : ""
                  }
                ></Chip>
              ))}
          </TableCell>
          <TableCell>{row.level}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={row.isExpanded} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table>
                  <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {i18n(lng, "CV.tableHeader.consultingEmphasis")}
                      </TableCell>
                      <TableCell>
                        {i18n(lng, "CV.tableHeader.industryKnowHow")}
                      </TableCell>
                      <TableCell>
                        {i18n(
                          lng,
                          "CV.tableHeader.functionalAndMethodCompetencies"
                        )}
                      </TableCell>
                      <TableCell>
                        {i18n(lng, "CV.tableHeader.languages")}
                      </TableCell>
                      <TableCell>
                        {i18n(lng, "CV.tableHeader.ITCompetencies")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {[...new Set(consultingEmphasis)].sort().map((el) => (
                          <ShortChip
                            input={el}
                            classes={classes}
                            isSelected={checkValeInArray(
                              filterConsultingEmphasis,
                              el
                            )}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        {[...new Set(industryKnowHow)].sort().map((el) => (
                          <ShortChip
                            input={el}
                            classes={classes}
                            isSelected={checkValeInArray(
                              filterIndustryKnowHow,
                              el
                            )}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        {[...new Set(technicalAndMethodologicalCompetence)]
                          .sort()
                          .map((el) => (
                            <ShortChip
                              input={el}
                              classes={classes}
                              isSelected={checkValeInArray(
                                filterFunctionalAndMethodCompetencies,
                                el
                              )}
                            />
                          ))}
                      </TableCell>
                      <TableCell>
                        {[...new Set(languages)].sort().map((el) => (
                          <ShortChip
                            input={el}
                            classes={classes}
                            isSelected={checkValeInArray(filterLanguages, el)}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        {[...new Set(itCompetence)].sort().map((el) => (
                          <ShortChip
                            input={el}
                            classes={classes}
                            isSelected={checkValeInArray(
                              filterITCompetencies,
                              el
                            )}
                          />
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Box className={classes.leftSearchBar}>
        <SearchBarLeft></SearchBarLeft>
      </Box>
      <div>
        <Box height={theHierachyHeight} className={classes.hierachieTransition}>
          <Hierachie />
        </Box>
        <TableContainer className={classes.customTableContainer}>
          {/* <TableContainer style={{ height: theHeight - 120 }}> */}
          <Table stickyHeader className={classes.table}>
            <colgroup>
              <col width="5rem" />
              <col width={theWidth * 0.1} />
              <col width={theWidth * 0.1} />
              <col width={theWidth * 0.6} />
              <col width={theWidth * 0.1} />
              {/* <col width={theWidth * 0.1} /> */}
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
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
                      {i18n(lng, "CV.tableHeader.certificate")}
                    </div>
                    {/* <FilterDialog
                    dialogKey="certification"
                    customSwitchOn="switchFilterLogic"
                  /> */}
                    {/* <IconButton color="primary" onClick={handleClick}>
                    <Badge color="primary">
                    <ImportContactsIcon />
                    </Badge>
                  </IconButton> */}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {employes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
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
          count={employes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
