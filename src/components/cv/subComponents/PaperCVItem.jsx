import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import SaveIcon from "@material-ui/icons/Save";
import { i18n } from "../../../utils/i18n/i18n";

import Checkbox from "@material-ui/core/Checkbox";
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
  bulltetPointHeader: {
    fontWeight: "700",
  },
  bulltetPoints: {
    "list-style-type": "disc",
  },
  saveButton: {
    "padding-right": "24px",
  },
}));

export default function PaperCVItem({
  titel,
  theState,
  index,
  propertyKey,
  modus,
}) {
  const classes = useStyles();
  const [collapseFirst, setCollapseFirst] = React.useState(false);
  const [CVsDataRaw, setCVsData] = useRecoilState(theState);
  const [lng] = useRecoilState(languageCode);

  const handleEditClick = (event) => {};
  const handleCollapseClick = (event) => {
    setCollapseFirst(!collapseFirst);
  };
  const handleItemChange = (event, index, propertyKey, ix) => {
    // setCVsData()
    if (modus === "write") {
      let newValue = JSON.parse(JSON.stringify(CVsDataRaw));
      newValue[index].isEdited = !newValue[index][propertyKey + "Selection"][ix]
        ? newValue[index].isEdited - 1
        : newValue[index].isEdited + 1;
      newValue[index][propertyKey + "Selection"][ix] =
        !newValue[index][propertyKey + "Selection"][ix];
      setCVsData(newValue);
    }
    if (modus === "edit") {
      console.log("edit");
      let newValue = JSON.parse(JSON.stringify(CVsDataRaw));
      newValue[index][propertyKey] = newValue[index][propertyKey].filter(
        (el, indexo) => ix !== indexo
      );
      setCVsData(newValue);
    }
  };

  const handleAddNewItem = (event, index, propertyKey, ix) => {
    if (
      modus === "edit" &&
      document.getElementById(propertyKey).value.length > 0
    ) {
      console.log("newItem");
      let newValue = JSON.parse(JSON.stringify(CVsDataRaw));
      newValue[index][propertyKey].push(
        document.getElementById(propertyKey).value
      );
      setCVsData(newValue);
      document.getElementById(propertyKey).value = "";
    }
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
          {CVsDataRaw[index][propertyKey].map((el, ix) =>
            el.length > 0 || el.rawName?.length > 0 || el.name?.length > 0 ? (
              <ListItem
                button={modus !== "read"}
                onClick={(event) =>
                  handleItemChange(event, index, propertyKey, ix)
                }
              >
                {typeof el === "string" ? (
                  <ListItemText primary={el} />
                ) : el.name ? (
                  <ListItemText primary={el.name} /> // Zertifikate
                ) : (
                  // Projekte
                  <div>
                    <div class={classes.bulltetPointHeader}>
                      {el.rawName.split(" (")[0]}
                    </div>
                    <div class={classes.bulltetPointHeader}>
                      {el.rawName.split(" (")[1]?.length > 0 ? "(" : null}
                      {el.rawName.split(" (")[1]}
                    </div>

                    <ul class={classes.bulltetPoints}>
                      {el.details.map((el) => (
                        <li>{el}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {modus === "write" ? (
                  <Checkbox
                    checked={CVsDataRaw[index][propertyKey + "Selection"][ix]}
                    onClick={(event) =>
                      handleItemChange(event, index, propertyKey, ix)
                    }
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                ) : null}

                {modus === "edit" ? (
                  <IconButton
                    color="primary"
                    onClick={(event) =>
                      handleItemChange(event, index, propertyKey, ix)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </ListItem>
            ) : null
          )}
          {modus === "edit" ? (
            <ListItem>
              <TextField
                id={propertyKey}
                placeholder="Weiterer Beratungsschwerpunkt"
                style={{ width: "20rem" }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  className={classes.saveButton}
                  color="primary"
                  edge="end"
                  onClick={(event) =>
                    handleAddNewItem(event, index, propertyKey)
                  }
                  aria-label="delete"
                >
                  <SaveIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ) : null}
        </List>
      </Collapse>
    </div>
  );
}
