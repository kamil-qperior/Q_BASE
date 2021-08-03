import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { useState, Suspense } from "react";
import { green } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useRecoilState } from "recoil";
import { filterLanguagesData, languageCode } from "../../store/states";
import { filterClientData, clientFilterHolder, filterNameData, filterNameDataHolder} from "../../store/filter";
import { i18n } from "../../utils/i18n/i18n";
import CertificationTableInside from "../cv/CertificationTableInside";
import SearchBarLeftRefs from "./SearchBarLeftRefs";
import PaperCV from "../cv/subComponents/PaperCV";
import ReferenceResultTable from "./referenceResultTable";
import sharedSearchBoxView from "../../styles/reusableStyles";
import SlideDialog from "../variant/slideDialog"

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
    display: "initial  !important",
    
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
  searchAndResultContainer: {
    // width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "initial",
    display: "flex",
  },
}));

//v3 of the dashboard
export default function MyReferenceDashboard() {
  //export to style classes
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [filterLanguages] = useRecoilState(filterLanguagesData);
  const [filterClient, setFilterClient] = useRecoilState(filterClientData);
  const [clientFilterH, setFilterClientH] = useRecoilState(clientFilterHolder);

  const [filterName, setFilterNameData] = useRecoilState(filterNameData);
  const [filterNameDataH, setFilterNameDataH] = useRecoilState(filterNameDataHolder);

  const [lng] = useRecoilState(languageCode);


  
  //is necessery for preloading of filterdata into the filers!!
  //once per first render you set your data into the holder
  if(counter===0) {

    setFilterClientH(filterClient)
    setFilterNameDataH(filterName) 
    setCounter(1)
  
    console.log('rerender my reference dashborad in if');
  }


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
          <Tab label={i18n(lng, "ReferenceSearch.header.searchRef")} />
          <Tab label={i18n(lng, "ReferenceSearch.header.selectedRefs")} />
        </Tabs>
      </AppBar>¨

      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.tabContentTableView}
        >
        <TabPanel className={classes.tabContentTable} value={value} index={0}>
          {/* {i18n(lng, "MyCV.header.test")} */}
          {/* TODO change the reference table to new searchbar left standard*/}
          {/* 
          <CertificationTableInside /> */}

          <div className={classes.searchAndResultContainer}> 
          <Suspense>
            <Box >
              <SearchBarLeftRefs></SearchBarLeftRefs>
            </Box>
          </Suspense>

            
          <Suspense>
              <ReferenceResultTable />
        </Suspense>

          </div>
        </TabPanel>

        <TabPanel
          className={classes.tabContent}
          value={value}
          index={1}
          dir={theme.direction}
          >
          {/*
            TODO create new design for variant selection, from paperCV 
          <PaperCV theCVsDataState={CVsData} index={123} /> */}
              <SlideDialog></SlideDialog>
        </TabPanel>
      </SwipeableViews>
    </div>
       
  );
}
