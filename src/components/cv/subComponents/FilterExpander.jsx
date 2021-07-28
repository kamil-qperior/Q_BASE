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
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
  const countSelectedFilter = filteredArray.filter((el) => el.selected).length;

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
    </div>
  );
}
