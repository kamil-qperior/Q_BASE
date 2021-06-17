import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import HierachieList from "./subComponents/HierachieList";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    margin: "2rem",
  },
  hierachieListStyle: {
    height: "20rem",
  },
  accordionAligment: {
    "justify-content": "flex-end",
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "23.5rem",
    color: theme.palette.text.secondary,
  },
  aligmentIcons: {
    "align-self": "center",
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.accordionAligment}>
            <Typography className={classes.heading}>
              Zertifikate Details
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails> */}
      <Grid container spacing={0}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <HierachieList
              stateKey="filterTopicChapterDataLevel1"
              title="Übersicht"
            />
          </Paper>
        </Grid>
        <Grid item xs={1} className={classes.aligmentIcons}>
          <ArrowForwardIosIcon />
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <HierachieList
              stateKey="filterTopicChapterDataLevel2"
              title="Details"
            />
          </Paper>
        </Grid>
        <Grid item xs={1} className={classes.aligmentIcons}>
          <ArrowForwardIosIcon />
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <HierachieList
              stateKey="filterTopicChapterDataLevel3"
              title="Zertifikate"
            />
          </Paper>
        </Grid>
      </Grid>
      {/* </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
