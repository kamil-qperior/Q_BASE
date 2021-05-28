import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ImageUploadCard from "../imageUpload";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { contentListsState } from "../../store/statesRef";

import ContentItem from "../stepperUtil/contentItem";
import ContentCreator from "../stepperUtil/contentCreator";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 10,
  },
  button: {
    marginRight: theme.spacing(1),
    color: "blue",
    margin: 15,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  appBarSpacer: theme.mixins.toolbar,
  textField: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

export default function ContentTitleForm(props) {
  const classes = useStyles();
  const title = props.title
  
  const currentList  = useRecoilValue(contentListsState(title));
 
  const [language, setLanguage] = useState("DE");


  return (
    <div className={classes.root}>
      <ContentCreator title={title} single={true} language={language} ></ContentCreator>
      <Grid container>
        <FormControl component="legend">
          <FormLabel component="legend">Language</FormLabel>
          <RadioGroup onChange={handleChangeRadioLang}  aria-label="language" name="language">
            <FormControlLabel value="EN" control={<Radio />} label="english" />
            <FormControlLabel value="DE" control={<Radio />} label="german" />
          </RadioGroup>
        </FormControl>

      </Grid>

      <div className={classes.demo}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <List>
          {currentList.map((item) => {
            return <ContentItem title={title} key={item.id} item={item} />;
          })}
        </List>
      </div>
    </div>
  );


  
function handleChangeRadioLang(e) {
  console.log('setLanguage in radio',e.target.value);
  setLanguage(e.target.value);
}



}



function handleChange(setContent, content) {
  return (e, newValue) => {
    console.log("in handle", content);
    console.log("in newValue", newValue);
    console.log(" newValue", e);
    setContent(content);
  };
}
