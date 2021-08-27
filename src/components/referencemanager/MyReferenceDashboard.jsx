import { MenuItem, Select } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Popover from "@material-ui/core/Popover";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PopupState from "material-ui-popup-state";
import PropTypes from "prop-types";
import React, { Suspense } from "react";
import { useRecoilState } from "recoil";
import { getDeck } from "../../services/slidedeck/slideDeckServ";
import {
  clientFilterHolder,
  filterClientData,
  filterNameData,
  filterNameDataHolder,
} from "../../store/filter";
import { languageCode } from "../../store/states";
import {
  chosenRefsState,
  chosenVariantLanguageState,
  filteredReferenceContentsForEdit,
  formOpenState,
  referenceVariantIdsFromResult,
  selectedTemplateState,
} from "../../store/statesRef";
import { i18n } from "../../utils/i18n/i18n";
import OverviewDialog from "../variant/oerviewDialog";
import PaperRef from "./PaperRef";
import ReferenceResultTable from "./referenceResultTable";
import SearchBarLeftRefs from "./SearchBarLeftRefs";

export function TabPanel(props) {
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

    "justify-content": "center",
    display: "flex",
  },
  footer: {
    left: 0,
    bottom: 0, // <-- KEY
    zIndex: 2,
    position: "sticky",
    "background-color": "aliceblue",
  },
  generateSlideButton: {
    padding: "1rem",
    "background-color": "primary",
  },
  languageToggle: {
    "text-align-last": "center;",
    margin: "1rem",
  },
  languageToggleText: {
    display: "contents;",
  },
  languageToggleTextTypo: {
    margin: "1rem",
    "padding-bottom": "1rem",
  },
  selectTemplate: {
    marginRight:"2rem",
    width: "9rem",
  },
  buttonContainer: {
    display: "flex",

    "align-items": "baseline;",
    justifyContent: "center",
  },
}));

//v3 of the dashboard
export default function MyReferenceDashboard() {
  //export to style classes
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [chosenRefs] = useRecoilState(chosenRefsState);
  const [filterClient, setFilterClient] = useRecoilState(filterClientData);
  const [open, setOpen] = useRecoilState(formOpenState);
  const [clientFilterH, setFilterClientH] = useRecoilState(clientFilterHolder);
  const [selectedTemplate, setSelectedTemplate] = useRecoilState(
    selectedTemplateState
  );

  const [chosenVariantLanguge, setChosenVariantLanguageState] = useRecoilState(
    chosenVariantLanguageState
  );

  const [filterName, setFilterNameData] = useRecoilState(filterNameData);
  const [filterNameDataH, setFilterNameDataH] =
    useRecoilState(filterNameDataHolder);

  //data for popup content also containers referenceID
  const [filteredReferenceContents, setFilteredReferenceContentsForEdit] =
    useRecoilState(filteredReferenceContentsForEdit);

  const [lng] = useRecoilState(languageCode);

  //use for generation of slides from chosen variants, ist set by save variant
  const [referenceVariantIds, setReferenceVariantIds] = useRecoilState(
    referenceVariantIdsFromResult
  );

  //is necessery for preloading of filterdata into the filers!!
  //once per first render you set your data into the holder
  if (counter === 0) {
    setFilterClientH(filterClient);
    setFilterNameDataH(filterName);
    setCounter(1);

    console.log("rerender my reference dashborad in if");
  }

  const handleClose = (event, newValue) => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleChosenLanguage = (event, newLanguage) => {
    setChosenVariantLanguageState(newLanguage);
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
          <Tab
            label={
              i18n(lng, "ReferenceSearch.header.selectedRefs") +
              " (" +
              chosenRefs?.length +
              ")"
            }
          />

          <Tab label={i18n(lng, "ReferenceSearch.header.generateSlides")} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.tabContentTableView}
      >
        <TabPanel className={classes.tabContentTable} value={value} index={0}>
          <div className={classes.searchAndResultContainer}>
            <Suspense>
              <Box>
                <SearchBarLeftRefs></SearchBarLeftRefs>
              </Box>
            </Suspense>

            <Suspense>
              <ReferenceResultTable onlySelection={false} />

              {/* does it need to be here because of prerender, popup does not work otherwise */}

              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Popover
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <PaperRef />
                    </Popover>
                  </div>
                )}
              </PopupState>
              {/*  <PaperRef data={filteredReferenceContents}></PaperRef> */}
            </Suspense>
          </div>
        </TabPanel>

        {/*  selection tab*/}
        <TabPanel className={classes.tabContentTable} value={value} index={1}>
          <div spacing={3} className={classes.buttonContainer}>
            <div className={classes.languageToggleText}>
              <Typography className={classes.languageToggleTextTypo}>
                {i18n(lng, "ReferenceSearch.languageToggle.contentLanguage")}
                Inhaltssprache:
              </Typography>
            </div>
            <div className={classes.languageToggle}>
              <ToggleButtonGroup
                value={chosenVariantLanguge}
                exclusive
                onChange={handleChosenLanguage}
                aria-label="text alignment"
              >
                <ToggleButton value="DE" aria-label="german">
                  DE
                </ToggleButton>
                <ToggleButton value="EN" aria-label="english">
                  EN
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className={classes.generateSlideButton}>
              <Select
                labelId="select-template"
                id="select-template"
                className={classes.selectTemplate}
                value={selectedTemplate}
                onChange={handleTemplateChange}
              >
                <MenuItem value={"green"}>Q_PERIOR</MenuItem>
                <MenuItem value={"blue"}>Alternative</MenuItem>
              </Select>
              <Button
                variant="contained"
                onClick={(e) => {
                  console.log(
                    "referenceVariantIds for slides generation",
                    referenceVariantIds
                  );
                  getDeck(referenceVariantIds, selectedTemplate);
                }}
                color="primary"
              >
                generate documents
              </Button>
            </div>
          </div>
          <div className={classes.searchAndResultContainer}>
            <Suspense>
              <ReferenceResultTable onlySelection={true} />

              {/* does it need to be here because of prerender, popup does not work otherwise */}

              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Popover
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <PaperRef />
                    </Popover>
                  </div>
                )}
              </PopupState>
              {/*  <PaperRef data={filteredReferenceContents}></PaperRef> */}
            </Suspense>
          </div>
        </TabPanel>

        {/*  currently used as overview page*/}
        <TabPanel
          className={classes.tabContent}
          value={value}
          index={2}
          dir={theme.direction}
        >
          <OverviewDialog></OverviewDialog>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
