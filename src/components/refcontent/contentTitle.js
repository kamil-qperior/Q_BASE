import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import {
  useRecoilValue
} from "recoil";
import { contentListsState } from "../../store/statesRef";
import ContentCreator from "../stepperUtil/contentCreator";
import ContentItem from "../stepperUtil/contentItem";




const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 20,
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
      <Grid className={classes.root} direction="row" container justify="center" spacing={0} >
      
        <FormControl component="legend">
          <FormLabel component="legend">Language</FormLabel>
          <RadioGroup onChange={handleChangeRadioLang}   value={language} aria-label="language" name="language">
            <FormControlLabel value="DE" control={<Radio />} label="german" />
            <FormControlLabel value="EN" control={<Radio />} label="english" />
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
{/*         <Button onClick={e => {
                       console.log('LOG currentList SELECTION', currentList);
                      }}
          color="primary">
          LOG SELECTION
        </Button>  */}
      </div>
    </div>
  );


  
function handleChangeRadioLang(e) {
  setLanguage(e.target.value);
}



}


