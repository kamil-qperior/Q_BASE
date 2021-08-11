import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ApartmentIcon from "@material-ui/icons/Apartment";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PersonIcon from "@material-ui/icons/Person";
import SaveIcon from "@material-ui/icons/Save";
// import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import TimelineIcon from "@material-ui/icons/Timeline";
import WorkIcon from "@material-ui/icons/Work";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import faceImage from "./Adac.png";
import PaperRefItem from "./PaperRefItem";
import { languageCode } from "../../store/states";

import {
  refTextFieldsState,
  formOpenState,
  contentListsState,
  chosenVariantLanguageState,
} from "../../store/statesRef";

import { i18n } from "../../utils/i18n/i18n";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    height: "auto",
    "justify-content": "center",
  },
  rootPaper: {
    minHeight: "45rem",
    height: "auto",
    width: "10%",
    "min-width": "84rem",
    display: "flex",
  },
  leftPaper: {
    width: "30%",
    "background-color": "aliceblue",
  },
  leftList: {
    width: "100%",
    maxWidth: 360,
    display: "inline-block",
  },
  rightPaper: {
    width: "70%",
  },
  imageContainer: {
    "text-align-last": "center",
    padding: "10px"
  },
  faceImage: {
    width: "7rem",
    height: "7rem",
    "border-radius": "5px",
  },
  fontName: {
    // "font-weight": "bolder",
    "font-weight": 600,
    "font-size": "1rem",
    "font-family": "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "line-height": 1.5,
    "letter-spacing": "0.00938em",
  },
  hAlgin: {
    display: "flex",
  },
  listItems: {
    "list-style": "disc",
    "font-weight": 400,
    "font-size": "1rem",
    "font-family": "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "line-height": 1.5,
    "letter-spacing": "0.00938em",
  },
  innerList: {
    width: "100%",
  },
  innerListNumeration: {
    width: "fit-content",
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
  languageToggle: {
    "text-align-last": "center;"
  },
  clientName: {
    "font-weight": "800"
  },
}));

export default function PaperRef(data) {
  const index = 123;
  const classes = useStyles();
  const [collapseAll, setCollapseAll] = React.useState(false);
  const [collapseFirst, setCollapseFirst] = React.useState(true);
  const [lng] = useRecoilState(languageCode);

  const [chosenVariantLanguge, setChosenVariantLanguageState] = useRecoilState(
    chosenVariantLanguageState
  );
  const [open, setOpen] = useRecoilState(formOpenState);
  
  //metadata
  const [refState, setRefState] = useRecoilState(refTextFieldsState);

  const title = useRecoilValue(contentListsState("title"));
  const goals = useRecoilValue(contentListsState("goal"));
  const procedures = useRecoilValue(contentListsState("procedure"));
  const results = useRecoilValue(contentListsState("result"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //TODO add more clean  up
    setOpen(false);
  };

  console.log("what we got title", title);
  console.log("what we refState", refState);

  const handleChosenLanguage = (event, newLanguage) => {
    setChosenVariantLanguageState(newLanguage);
  };

  const handleEditClick = (event) => {};
  const handleCollapseClick = (event) => {
    setCollapseFirst(!collapseFirst);
  };

  //TODO do language dependence
  return (
    <div className={classes.root}>
      <Paper className={classes.rootPaper} elevation={3}>
        <div className={classes.leftPaper}>
          <div className={classes.imageContainer}>
            <img src={faceImage} className={classes.faceImage} alt="fireSpot" />
          </div>
          <List className={classes.leftList}>
            <ListItem >
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.listItems}  >
              <div className={classes.fontName}>{refState.clientName}</div>
              </ListItemText  >
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={refState.name} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ApartmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={refState.industry} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ApartmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"more meta data to come"} />
            </ListItem>
          </List>

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
        </div>
        <div className={classes.rightPaper}>
          <PaperRefItem
            titel={i18n(lng, "PaperRef.expanderTitel.title")}
            content={title}
            index={index}
            propertyKey={"title"}
          />
          <PaperRefItem
            titel={i18n(lng, "PaperRef.expanderTitel.goals")}
            content={goals}
            index={index}
            propertyKey={"goals"}
          />

          <PaperRefItem
            titel={i18n(lng, "PaperRef.expanderTitel.procedures")}
            content={procedures}
            index={index}
            propertyKey={"procedures"}
          />
          <PaperRefItem
            titel={i18n(lng, "PaperRef.expanderTitel.results")}
            content={results}
            index={index}
            propertyKey={"results"}
          />
        </div>
      </Paper>
    </div>
  );
}
