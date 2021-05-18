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
import { CVsDataWithFilter } from "../../store/states";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
}));

export default function SpanningTable() {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [employees] = useRecoilState(CVsDataWithFilter);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
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
                  <FilterDialog />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> Position </div>
                  <FilterDialog dialogKey="level" />
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> Basis </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.algiment}>
                  <div className={classes.tableHeader}> KnowHow </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.cv_folder}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.topic_chapter}</TableCell>
                  <TableCell>
                    {row.certificates.map((zerti, index) => (
                      <>
                        {zerti.name},<br />
                      </>
                    ))}
                  </TableCell>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.level}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
