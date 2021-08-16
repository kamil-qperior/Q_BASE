/* eslint-disable no-undef */
import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CheckboxesGroup from "./checkboxgroup";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Typography,
  TextField,
  FormLabel,
  List,
  ListItem,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { useRecoilState } from "recoil";
import PaperRefItem from "../referencemanager/PaperRefItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import { i18n } from "../../utils/i18n/i18n";
import {
  filteredReferenceContents,
  variantNameState,
} from "../../store/statesRef";
import {
  languageCode
} from "../../store/states";
import faceImage from "../referencemanager/Adac.png";

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
    padding: "10px",
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
    "text-align-last": "center;",
  },
  clientName: {
    "font-weight": "800",
  },
}));


//OUTDATED FOR REFERENCE AND AS BASE FOR PREVIEW OPTION
export default function StepFormVariant(props) {
  const classes = useStyles();
  const step = props.step;
  //shows content for currently selected ref id
  const [refContents] = useRecoilState(filteredReferenceContents);
  //has to be unique with current implementation
  const [variantName, setVariantName] = useRecoilState(variantNameState(step));
  const [lng] = useRecoilState(languageCode);
  //make editable later
  //const [variantTitle, setVariantTitle] = useRecoilState(variantTitleState(step));

  //collapse state
  const [open, setOpen] = useState(false);

  const placeHolderVariantName = `Reference variant ${step}`;

  if (refContents.length === 0) {
    return (
      <Typography wrap="true">
        {" "}
        No Content Found add references from the list.
      </Typography>
    );
  }

  const handleChange = (event) => {
    setVariantName(event.target.value, step);
  };

  //TODO make language dependent
  //TODO handle variant name on this level instead of checkbox level
  const rcTitle = refContents.find((rc) => rc.type === "title"); // TODO is being passed to goals als temp solution
  const referenceId = refContents[0]?.referenceId;
  const goals = refContents.filter((rc) => rc.type === "goal");
  const procedures = refContents.filter((rc) => rc.type === "procedure");
  const results = refContents.filter((rc) => rc.type === "result");

  console.log('refContents', refContents);

  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.rootPaper} elevation={3}>
      <div className={classes.leftPaper}>
          <div className={classes.imageContainer}>
            <img src={faceImage} className={classes.faceImage} alt="fireSpot" />
          </div>
          <List className={classes.leftList}>
            <ListItem >
              <ListItemAvatar>
              
              </ListItemAvatar>
              <ListItemText className={classes.listItems}  >
              <div className={classes.fontName}>{variantName ?? placeHolderVariantName}</div>
              </ListItemText  >
            </ListItem>
            <ListItem>
              <ListItemAvatar>
              
              </ListItemAvatar>
              <ListItemText primary={referenceId} />
            </ListItem>
  
          </List>

     
        </div>
          <div className={classes.rightPaper}>
            <PaperRefItem
              title={i18n(lng, "PaperRef.expanderTitel.title")}
              contentTitle={[rcTitle]}
              content={[rcTitle]}
              variantName={variantName}
              propertyKey={"title"}
              refId={referenceId}
              />
            <PaperRefItem
              title={i18n(lng, "PaperRef.expanderTitel.goals")}
              contentTitle={[rcTitle]}
              content={goals}
              refId={referenceId}
              propertyKey={"goals"}
              />

            <PaperRefItem
              title={i18n(lng, "PaperRef.expanderTitel.procedures")}
              content={procedures}
              refId={referenceId}
              contentTitle={[rcTitle]}
              propertyKey={"procedures"}
              />
            <PaperRefItem
              title={i18n(lng, "PaperRef.expanderTitel.results")}
              contentTitle={[rcTitle]}
              content={results}
              refId={referenceId}
              propertyKey={"results"}
            />
          </div>
        </Paper>
      </div>

      <div>
        {/* old below new above */}

        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid style={{ width: 250, margin: 20 }} item>
              <Typography variant="h8" wrap="true">
                {" "}
                Title{" "}
              </Typography>
              <Typography wrap="true">
                {rcTitle?.content ?? "No title found in reference contents."}
              </Typography>
            </Grid>
            <Grid style={{ width: 250, margin: 20 }} item>
              <TextField
                id={"variantName"}
                name={"variantName"}
                //     value={refState[param]} this lock the whole field with onBlur
                defaultValue={placeHolderVariantName} //this may not work properly
                key={variantName}
                //on focusing away from field
                onBlur={handleChange}
                label={"Variant Name"}
              />
            </Grid>
          </Grid>

          <CheckboxesGroup
            title="Goals"
            rcTitle={rcTitle}
            content={goals}
            variantName={chooseName()}
            refId={referenceId}
          />
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <CheckboxesGroup
              title="Procedures"
              content={procedures}
              variantName={chooseName()}
              refId={referenceId}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxesGroup
              title="Results"
              content={results}
              variantName={chooseName()}
              refId={referenceId}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );

  function chooseName() {
    return variantName === null ? placeHolderVariantName : variantName;
  }
}
