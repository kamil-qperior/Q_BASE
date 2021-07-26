import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import { i18n } from "../../utils/i18n/i18n";
import { languageCode, filterLanguagesData, CVsData } from "../../store/states";
import { useRecoilState } from "recoil";
import PaperCV from "./subComponents/PaperCV";
import CertificationTableInside from "./CertificationTableInside";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Checkbox from "@material-ui/core/Checkbox";
import GeneriyHierachie from "./subComponents/GenericHierachie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    position: "relative",
    minHeight: 200,
    "overflow-x": "initial",
  },
  tabContent: {
    height: "100%",
    "overflow-x": "initial",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    // right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  tabContentTableView: {
    "overflow-x": "initial !important",
    "&>div>div:nth-child(1)": {
      overflow: "initial !important",
    },
    "&>div": {
      display: "initial  !important",
    },
  },
  tabContentTable: {
    "overflow-x": "initial !important",
  },
}));

export default function MyCV() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [filterLanguages] = useRecoilState(filterLanguagesData);
  const [lng] = useRecoilState(languageCode);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="action tabs example"
          centered="true"
        >
          <Tab label={i18n(lng, "SearchCV.header.searchCV")} />
          <Tab label={i18n(lng, "SearchCV.header.selectedCV")} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.tabContentTableView}
      >
        <TabPanel className={classes.tabContentTable} value={value} index={0}>
          {/* {i18n(lng, "MyCV.header.test")} */}
          {/* <GeneriyHierachie /> */}
          <CertificationTableInside />
        </TabPanel>

        <TabPanel
          className={classes.tabContent}
          value={value}
          index={1}
          dir={theme.direction}
        >
          <PaperCV theCVsDataState={CVsData} index={123} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
