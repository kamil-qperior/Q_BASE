import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { refTextFieldsState, contentListsState, chosenRefsState } from "../../store/statesRef";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const chosenRefs = useRecoilValue(chosenRefsState);
  const goals  = useRecoilValue(contentListsState("goals"));
  const results  = useRecoilValue(contentListsState("results"));
  const procedures  = useRecoilValue(contentListsState("procedures"));

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
 

  return (
    <div className={classes.root}>
        <Paper maxW>

      <FormControl  component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{`Pick ${props.title}`}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
            />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
            label="Jason Killian"
            />
          <FormControlLabel
            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
            />
        </FormGroup>
        <FormHelperText>Pick content to be displayed</FormHelperText>
      </FormControl>
        </Paper>
    
    </div>
  );
}
