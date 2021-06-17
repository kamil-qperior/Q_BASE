import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  useRecoilState
} from "recoil";
import {
  chosenVariantLanguageState
} from "../../store/statesRef";


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

  const [chosenVariantLanguage, setChosenVariantLanguageState] = useRecoilState(
    chosenVariantLanguageState
  );

  const handleChange = (event) => {
      console.log('saving variant language ', event.target.value);
    setChosenVariantLanguageState(event.target.value);
  };

  //default state needs to match the one from store
  return (
    <div className={classes.formControl}>
      <Grid justify="center" container>
        <Grid item>
          <FormControl component="legend">
            <FormLabel component="legend">Language</FormLabel>
            <RadioGroup
              defaultValue="DE"
              onChange={handleChange}
              aria-label="language"
              name="language"
            >
              <FormControlLabel
                value="DE"
                control={<Radio />}
                label="Deutsch"
              />
              <FormControlLabel
                value="EN"
                control={<Radio />}
                label="English"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
