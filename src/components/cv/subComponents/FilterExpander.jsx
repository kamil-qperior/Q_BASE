import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FilterExpanderContent from "./FilterExpanderContent";
import Collapse from "@material-ui/core/Collapse";
import Badge from "@material-ui/core/Badge";
import GeneriyHierachie from "./GenericHierachie";
import DeleteIcon from "@material-ui/icons/Delete";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  filterLevelData,
  filterTopicChapterData,
  filterCertificationData,
  filterConsultingEmphasisData,
  filterITCompetenciesData,
  filterLanguagesData,
  filterFunctionalAndMethodCompetenciesData,
  filterIndustryKnowHowData,
  filterEmployeeNamesData,
} from "../../../store/states";

import { filterStatusData } from "../../../store/filter";

import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing(3),
    // overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  div: {
    "text-align": "center;",
  },
  searchBoxRowItemLable: {
    "align-self": "center;",
    "font-size": "large;",
    color: "darkslategray;",
  },
  expandHeader: {
    display: "flex",
    "justify-content": "space-between",
  },
  FilterExpanderContentWrapper: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  collapseIcon: {
    "margin-right": "1rem",
  },
  listItemStyle: {
    // height: "65px",
  },
}));

export default function FilterExpander({
  title,
  theRightState,
  customSwitchOn,
  isHierarchie,
  theHierachieState,
}) {
  
  const [filteredArray, setFilteredArray] = useRecoilState(theRightState);
  
  const countSelectedFilter = filteredArray?.filter((el) => el.selected).length;
  
  const [collapseFirst, setCollapseFirst] = React.useState(false);


  const handleCollapseClick = (event) => {
    !(
      event.target.parentElement.dataset.type === "DeleteIcon" ||
      event.target.dataset.type === "DeleteIcon"
    ) && setCollapseFirst(!collapseFirst);
  };

  const onHandleDeleteSelections = () => {
    let setSelection = filteredArray.map((el) => {
      return { data: el.data, selected: false, visible: el.visible };
    });
    setFilteredArray(setSelection);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ListItem
        button
        className={classes.listItemStyle}
        onClick={handleCollapseClick}
      >
        <ListItemText primary={title} />
        {countSelectedFilter > 0 ? (
          <IconButton
            size="small"
            className={classes.collapseIcon}
            color="primary"
            onClick={onHandleDeleteSelections}
            data-type="DeleteIcon"
          >
            <Badge
              badgeContent={countSelectedFilter}
              data-type="DeleteIcon"
              color="primary"
            >
              <DeleteIcon data-type="DeleteIcon" />
            </Badge>
          </IconButton>
        ) : null}
        {collapseFirst ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </ListItem>
      {/* <div className={classes.expandHeader}>
        <div className={classes.searchBoxRowItemLable}>{title}</div>
        <div className={classes.expandHeader}>
          {countSelectedFilter > 0 ? (
            <div>
              <IconButton
                className={classes.collapseIcon}
                color="primary"
                onClick={onHandleDeleteSelections}
              >
                <Badge badgeContent={countSelectedFilter} color="primary">
                  <DeleteIcon />
                </Badge>
              </IconButton>
            </div>
          ) : null}
          <div>
            <IconButton
              className={classes.collapseIcon}
              color="primary"
              onClick={handleCollapseClick}
            >
              {collapseFirst ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div> */}
      <Collapse
        className={classes.FilterExpanderContentWrapper}
        in={collapseFirst}
        timeout="auto"
        unmountOnExit
      >
        {isHierarchie ? (
          <GeneriyHierachie
            theState={theRightState}
            theHierachieState={theHierachieState}
          />
        ) : (
          <FilterExpanderContent
            theState={theRightState}
            customSwitchOn={customSwitchOn}
          />
        )}
      </Collapse>
      {/* <IconButton color="primary" onClick={handleClick}>
          <Badge badgeContent={countSelectedFilter} color="primary">
            <FilterListIcon />
          </Badge>
        </IconButton> */}

      {/* <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            // {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <FilterDialogList
              theState={theRightState}
              customSwitchOn={customSwitchOn}
            />
          </Popover> */}
    </div>
  );
}
