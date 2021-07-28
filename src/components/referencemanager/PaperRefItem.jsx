import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import faceImage from "../../../data/businessman1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
// import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import TimelineIcon from "@material-ui/icons/Timeline";
import ApartmentIcon from "@material-ui/icons/Apartment";
import { i18n } from "../../../utils/i18n/i18n";

import { languageCode } from "../../../store/states";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    minHeight: "500rem",
    "justify-content": "center",
  },
  rootPaper: {
    minHeight: "500rem",
    width: "10%",
    "min-width": "94rem",
    display: "flex",
  },
  leftPaper: {
    width: "30%",
    "background-color": "aliceblue",
  },
  rightPaper: {
    width: "100%",
  },
  listItems: {
    "list-style": "disc",
    "padding-left": "77px",
    "font-weight": 400,
    "font-size": "1rem",
    "font-family": "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "line-height": 1.5,
    "letter-spacing": "0.00938em",
  },
  collapseHeader: {
    "align-self": "center;",
    "font-size": "large;",
    "padding-left": "3rem",
    // color: "darkslategray;",
  },
  collapseIcon: {
    "padding-right": "1rem",
  },
  fixedIcon: {
    bottom: theme.spacing(2),
  },
  rightList: {
    width: "35rem",
    "padding-left": "5rem",
    display: "inline-grid",
  },
  boderBottom: {
    "justify-content": "space-between",
    display: "flex",
    width: "100%",
    "border-bottom": "aliceblue",
    "border-width": "3px",
    "border-bottom-style": "inset",
  },
  collapseStyle: {
    display: "flex",
  },
  listItemStyle: {
    fontWeight: "100",
  },
  collapseListItem: {
    padding: "0rem",
  },
}));

export default function PaperCVItem({ titel, theState, index, propertyKey }) {
  const classes = useStyles();
  const [collapseFirst, setCollapseFirst] = React.useState(true);
  const [CVsDataRaw, setCVsData] = useRecoilState(theState);
  const [lng] = useRecoilState(languageCode);

  const handleEditClick = (event) => {};
  const handleCollapseClick = (event) => {
    setCollapseFirst(!collapseFirst);
  };
  return (
    <div className={classes.rightPaper}>
      <ListItem
        button
        className={classes.collapseListItem}
        onClick={handleCollapseClick}
      >
        <div className={classes.boderBottom}>
          <div className={classes.collapseHeader}>{titel}</div>
          <div>
            {collapseFirst ? (
              <IconButton
                className={classes.collapseIcon}
                color="primary"
                onClick={handleEditClick}
              >
                <EditIcon />
              </IconButton>
            ) : (
              <div />
            )}
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
      </ListItem>

      <Collapse
        className={classes.collapseStyle}
        in={collapseFirst}
        timeout="auto"
        unmountOnExit
      >
        <List className={classes.rightList} dense={true}>
          {CVsDataRaw[index][propertyKey].map((el) => (
            <ListItem>
              <ListItemText primary={el} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem>
            <TextField
              id="standard-full-width"
              placeholder="Weiterer Beratungsschwerpunkt"
              style={{ width: "20rem" }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <SaveIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}
