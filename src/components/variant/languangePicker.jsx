import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {languageObjects} from "../consts"
import {
  chosenVariantLanguageState,
  variantContentListsState
} from "../../store/statesRef";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function LanguagePicker(props) {
  const classes = useStyles();
  
  const [chosenVariantLanguage, setChosenVariantLanguageState] = useRecoilState(chosenVariantLanguageState);

  const handleChange = (event) => {
    setChosenVariantLanguageState(event.target.value)
  }

  //default state needs to match the one from store
  return (
    <div className={classes.root}>
          <Grid justify="center" container>
          <Grid  item>
        <FormControl component="legend">
          <FormLabel component="legend">Language</FormLabel>
          <RadioGroup  defaultValue="DE" onChange={handleChange}  aria-label="language" name="language"> 
            <FormControlLabel value="DE" control={<Radio />} label="Deutsch" />
            <FormControlLabel value="EN" control={<Radio />} label="English" />
          </RadioGroup>
        </FormControl>
          </Grid  >

      </Grid>
    </div>
  );

              }

  