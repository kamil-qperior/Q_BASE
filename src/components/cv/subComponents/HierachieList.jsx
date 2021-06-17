import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useRecoilState } from "recoil";
import {
  filterTopicChapterDataLevel1,
  filterTopicChapterDataLevel2,
  filterTopicChapterDataLevel3,
} from "../../../store/states";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: 300,
    overflow: "auto",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  rootNew: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  xxx: {
    scrollbarWidth: "none" /* Firefox */,

    // "&::-webkit-scrollbar": {
    //   width: 12,
    // } /* Chrome */,
    "&::-webkit-scrollbar": {
      width: 5,
      height: 8,
      // "background-color": "#aaa",
      /* or add it to the track */
    },
    "&::-webkit-scrollbar-thumb": { background: "#3f51b5" },
  },
  aligmentSubHeader: {
    "text-align": "left;",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function HierachieList({ stateKey, title }) {
  const classes = useStyles();
  let theStateName;
  if (stateKey === "filterTopicChapterDataLevel1") {
    theStateName = filterTopicChapterDataLevel1;
  } else if (stateKey === "filterTopicChapterDataLevel2") {
    theStateName = filterTopicChapterDataLevel2;
  } else {
    theStateName = filterTopicChapterDataLevel3;
  }

  const [filteredArray, setFilteredArray] = useRecoilState(theStateName);

  const handleToggle = (value) => () => {
    setFilteredArray(value);
  };
  const [open, setOpen] = React.useState([false, false, false]);

  if (stateKey === "filterTopicChapterDataLevel1") {
    const handleClick = (val) => () => {
      const newOpen = [...open];
      newOpen[val] = !open[val];
      setOpen(newOpen);
    };
    return (
      <div className={classes.rootNew}>
        <Typography variant="h6">{title + " (3)"}</Typography>
        <List
          subheader={<ListSubheader></ListSubheader>}
          className={[classes.root, classes.xxx].join(" ")}
        >
          <ListItem button onClick={handleClick(0)}>
            <ListItemText primary="Projektmanagement" />
            {open[0] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[0]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {filteredArray.map((value) => {
                return (
                  <ListItem
                    key={value.value}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={value.selected}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={value.value} />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          <ListItem button onClick={handleClick(1)}>
            <ListItemText primary="SAP" />
            {open[1] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[1]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {filteredArray.map((value) => {
                return (
                  <ListItem
                    key={value.value}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={value.selected}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={value.value} />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          <ListItem button onClick={handleClick(2)}>
            <ListItemText primary="Versicherungen" />
            {open[2] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[2]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {filteredArray.map((value) => {
                return (
                  <ListItem
                    key={value.value}
                    role={undefined}
                    dense
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={value.selected}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={value.value} />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </List>
      </div>
    );
  } else {
    return (
      <div className={classes.rootNew}>
        <Typography variant="h6">
          {title + " (" + filteredArray.length + ")"}
        </Typography>
        <List
          subheader={<ListSubheader></ListSubheader>}
          className={[classes.root, classes.xxx].join(" ")}
        >
          {filteredArray.map((value) => {
            return (
              <ListItem
                key={value.value}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.selected}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={value.value} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}
