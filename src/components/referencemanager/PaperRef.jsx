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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PersonIcon from "@material-ui/icons/Person";
import SaveIcon from "@material-ui/icons/Save";
// import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import TimelineIcon from "@material-ui/icons/Timeline";
import WorkIcon from "@material-ui/icons/Work";
import React from "react";
import { useRecoilState,useRecoilValue } from "recoil";
import faceImage from "./businessman.jpg";
import PaperRefItem from "./PaperRefItem";
import {
  languageCode,
  CVsData
} from "../../store/states";

import {
  refTextFieldsState,
  formOpenState,
  contentListsState,
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
    minHeight: "500rem",
    "justify-content": "center",
  },
  rootPaper: {
    minHeight: "100rem",
    width: "10%",
    "min-width": "94rem",
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
    paddingTop: "2rem",
  },
  faceImage: {
    paddingLeft: "5rem",
    width: "10rem",
    height: "10rem",
    "border-radius": "200px",
  },
  fontName: {
    // "font-weight": "bolder",
    "font-weight": 400,
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
    "padding-left": "77px",
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
}));

export default function PaperRef( data) {
  const index = 123;
  const classes = useStyles();
  const [collapseAll, setCollapseAll] = React.useState(false);
  const [collapseFirst, setCollapseFirst] = React.useState(true);
  const [lng] = useRecoilState(languageCode);
  
  
  const [CVsDataRaw, setCVsData] = useRecoilState(CVsData);
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

  console.log('what we got goals', goals);
  console.log('what we refState', refState);

  const handleEditClick = (event) => {};
  const handleCollapseClick = (event) => {
    setCollapseFirst(!collapseFirst);
  };
  return (
    <div className={classes.root}>
    <Paper className={classes.rootPaper} elevation={3}>
      <div className={classes.leftPaper}>
        <div className={classes.imgageContainer}>
          <img src={faceImage} className={classes.faceImage} alt="fireSpot" />
        </div>
        <List className={classes.leftList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <div className={classes.fontName}>{CVsDataRaw[index].name}</div>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Dipl. Ingeneur" secondary="" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ApartmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={CVsDataRaw[index].level}
              secondary={CVsDataRaw[index].topicChapter}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <div className={classes.innerList}>
              <div className={classes.hAlgin}>
                <ListItemAvatar>
                  <Avatar>
                    <TimelineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={i18n(
                    lng,
                    "PaperCV.leftSide.professionalBackground"
                  )}
                />
              </div>
              <div className={classes.innerListNumeration}>
                <ul className={classes.listItems}>
                  <li>
                    <ListItemText
                      primary="Q_PERIOR"
                      secondary="seit Juni 2017"
                    />
                  </li>
                  <li>
                    <ListItemText
                      primary="Allianz"
                      secondary="Oktober 2012 - Mai 2016"
                    />
                  </li>
                  <li>
                    <ListItemText
                      primary="Helsana"
                      secondary="Juni 2009 - Mai 2012"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </ListItem>
        </List>
      </div>
      <div className={classes.rightPaper}>
        <PaperRefItem
          titel={i18n(lng, "PaperCV.expanderTitel.consultingEmphasis")}
          theState={theCVsDataState}
          index={index}
          propertyKey={"consultingEmphasis"}
        />

        <PaperRefItem
          titel={i18n(lng, "PaperCV.expanderTitel.industryKnowHow")}
          theState={theCVsDataState}
          index={index}
          propertyKey={"industryKnowHow"}
        />

        <PaperRefItem
          titel={i18n(
            lng,
            "PaperCV.expanderTitel.functionalAndMethodCompetencies"
          )}
          theState={theCVsDataState}
          index={index}
          propertyKey={"technicalAndMethodologicalCompetence"}
        />

        <PaperRefItem
          titel={i18n(lng, "PaperCV.expanderTitel.languages")}
          theState={theCVsDataState}
          index={index}
          propertyKey={"languages"}
        />

        <PaperRefItem
          titel={i18n(lng, "PaperCV.expanderTitel.ITCompetencies")}
          theState={theCVsDataState}
          index={index}
          propertyKey={"itCompetence"}
        />

        <PaperRefItem
          titel={i18n(lng, "PaperCV.expanderTitel.certificate")}
          theState={theCVsDataState}
          index={index}
          propertyKey={"certificates"}
        />
        <PaperRefItem
          titel={i18n(lng, "PaperCV.expanderTitel.projects")}
          theState={theCVsDataState}
          index={index}
          propertyKey={"projectexperience"}
        />
      </div>
    </Paper>
  </div>
  );
}
