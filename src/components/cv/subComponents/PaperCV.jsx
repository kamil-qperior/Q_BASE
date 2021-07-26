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
import PaperCVItem from "./PaperCVItem";

import {
  languageCode,
  CVsData,
  CVsDataWithFilter,
  filterCertificationData,
  hierachyHeight,
  filterITCompetenciesData,
  filterFunctionalAndMethodCompetenciesData,
  filterIndustryKnowHowData,
  filterConsultingEmphasisData,
  filterLanguagesData,
} from "../../../store/states";
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
  leftList: {
    width: "100%",
    maxWidth: 360,
    display: "inline-block",
  },
  rightPaper: {
    width: "70%",
  },
  imgageContainer: {
    paddingTop: "2rem",
  },
  faceImage: {
    width: "10rem",
    height: "10rem",
    "border-radius": "100px",
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

export default function PaperCV({ theCVsDataState, index }) {
  const classes = useStyles();
  const [collapseAll, setCollapseAll] = React.useState(false);
  const [collapseFirst, setCollapseFirst] = React.useState(true);
  const [CVsDataRaw, setCVsData] = useRecoilState(theCVsDataState);
  const [lng] = useRecoilState(languageCode);

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
          <PaperCVItem
            titel={i18n(lng, "PaperCV.expanderTitel.consultingEmphasis")}
            theState={theCVsDataState}
            index={index}
            propertyKey={"consultingEmphasis"}
          />
          <ListItem
            button
            className={classes.collapseListItem}
            onClick={handleCollapseClick}
          >
            <div className={classes.boderBottom}>
              <div className={classes.collapseHeader}>
                {i18n(lng, "PaperCV.expanderTitel.consultingEmphasis")}
              </div>
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
              {CVsDataRaw[index].consultingEmphasis.map((el) => (
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
            {/* <div>
              <Fab
                className={classes.fixedIcon}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div> */}
          </Collapse>
          <div className={classes.boderBottom}>
            <div className={classes.collapseHeader}>Branchenkompetenz</div>
            <div>
              {collapseAll ? (
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
                {collapseAll ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
          </div>
          <Collapse
            className={classes.collapseStyle}
            in={collapseAll}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.rightList} dense={true}>
              {CVsDataRaw[0].consultingEmphasis.map((el) => (
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
                  placeholder="Weitere Branchenkompetenz"
                  style={{ width: "20rem" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <SaveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/* <div>
              <Fab
                className={classes.fixedIcon}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div> */}
          </Collapse>
          <div className={classes.boderBottom}>
            <div className={classes.collapseHeader}>
              Fach- und Methodenkompetenz
            </div>
            <div>
              {collapseAll ? (
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
                {collapseAll ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
          </div>
          <Collapse
            className={classes.collapseStyle}
            in={collapseAll}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.rightList} dense={true}>
              {/* {CVsDataRaw[0].consultingEmphasis.map((el) => (
                <ListItem>
                  <ListItemText primary={el} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))} */}
              <ListItem>
                <TextField
                  id="standard-full-width"
                  placeholder="Weitere Branchenkompetenz"
                  style={{ width: "20rem" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <SaveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/* <div>
              <Fab
                className={classes.fixedIcon}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div> */}
          </Collapse>
          <div className={classes.boderBottom}>
            <div className={classes.collapseHeader}>Sprachen</div>
            <div>
              {collapseAll ? (
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
                {collapseAll ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
          </div>
          <Collapse
            className={classes.collapseStyle}
            in={collapseAll}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.rightList} dense={true}>
              {/* {CVsDataRaw[0].consultingEmphasis.map((el) => (
                <ListItem>
                  <ListItemText primary={el} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))} */}
              <ListItem>
                <TextField
                  id="standard-full-width"
                  placeholder="Weitere Branchenkompetenz"
                  style={{ width: "20rem" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <SaveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/* <div>
              <Fab
                className={classes.fixedIcon}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div> */}
          </Collapse>

          <div className={classes.boderBottom}>
            <div className={classes.collapseHeader}>IT-Kompetenz</div>
            <div>
              {collapseAll ? (
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
                {collapseAll ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
          </div>
          <Collapse
            className={classes.collapseStyle}
            in={collapseAll}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.rightList} dense={true}>
              {/* {CVsDataRaw[0].consultingEmphasis.map((el) => (
                <ListItem>
                  <ListItemText primary={el} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))} */}
              <ListItem>
                <TextField
                  id="standard-full-width"
                  placeholder="Weitere Branchenkompetenz"
                  style={{ width: "20rem" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <SaveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/* <div>
              <Fab
                className={classes.fixedIcon}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div> */}
          </Collapse>
          <div className={classes.boderBottom}>
            <div className={classes.collapseHeader}>Zertifikate</div>
            <div>
              {collapseAll ? (
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
                {collapseAll ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </div>
          </div>
          <Collapse
            className={classes.collapseStyle}
            in={collapseAll}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.rightList} dense={true}>
              {/* {CVsDataRaw[0].consultingEmphasis.map((el) => (
                <ListItem>
                  <ListItemText primary={el} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))} */}
              <ListItem>
                <TextField
                  id="standard-full-width"
                  placeholder="Weitere Branchenkompetenz"
                  style={{ width: "20rem" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <SaveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/* <div>
              <Fab
                className={classes.fixedIcon}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div> */}
          </Collapse>
        </div>
      </Paper>
    </div>
  );
}
