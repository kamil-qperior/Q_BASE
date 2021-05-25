import React, { useEffect, useState } from "react";
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
import { CVsDataWithFilter, filterCertificationData } from "../../store/states";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import { useRecoilState } from "recoil";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  algiment: {
    display: "flex;",
  },
  tableHeader: {
    "align-self": "center;",
    "font-size": "large;",
    color: "darkslategray;",
  },
  customTableContainer: {
    // overflowX: "initial",
    // padding: 5,
  },
}));

export default function SpanningTable() {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [employes] = useRecoilState(CVsDataWithFilter);
  const [filteredCertificates] = useRecoilState(filterCertificationData);
  const [open, setOpen] = React.useState(false);
  const [theHeight, setHeight] = useState(window.innerHeight);
  const [theWidth, setWidth] = React.useState(window.innerWidth);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    // console.log(filteredCertificates);
    const checkValeInArray = (val) => {
      return filteredCertificates
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
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.topicChapter}</TableCell>
          <TableCell>
            {/* {row.certificates.map((zerti, index) => (
        <>
          {zerti.name},<br />
        </>
      ))} */}
            {row.certificates.map((zerti) => (
              <Chip
                color={checkValeInArray(zerti.name) ? "primary" : ""}
                deleteIcon={<DoneIcon />}
                label={zerti.name}
                onDelete={checkValeInArray(zerti.name) ? () => {} : ""}
              ></Chip>
            ))}
          </TableCell>
          <TableCell>{row.level}</TableCell>
          {/* <TableCell>
          {row.consultingEmphasis.map((el) => (
            <Chip label={el}></Chip>
          ))}
        </TableCell>
        <TableCell>
          {row.industryKnowHow.map((el) => (
            <Chip label={el}></Chip>
          ))}
        </TableCell> */}
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table>
                  <colgroup>
                    <col width="30%" />
                    <col width="50%" />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <TableCell>Basis</TableCell>
                      <TableCell>KnowHow</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {row.consultingEmphasis.map((el) => (
                          <Chip label={el}></Chip>
                        ))}
                      </TableCell>
                      <TableCell>
                        {row.industryKnowHow.map((el) => (
                          <Chip label={el}></Chip>
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
    <Paper
      className={classes.customTableContainer}
      style={{ height: theHeight - 120 }}
    >
      <TableContainer style={{ height: theHeight - 120 }}>
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
                  <div className={classes.tableHeader}> Mitarbeiter </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> Topic Chapter </div>
                  <FilterDialog dialogKey="topicChapter" />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> Zertifikate </div>
                  <FilterDialog dialogKey="certification" />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> Position </div>
                  <FilterDialog dialogKey="level" />
                </div>
              </TableCell>
              {/* <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> Basis </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> KnowHow </div>
                </div>
              </TableCell> */}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        labelRowsPerPage="Zeilen pro Seite:"
        count={employes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
