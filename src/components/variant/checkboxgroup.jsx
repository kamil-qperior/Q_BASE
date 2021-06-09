import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  useRecoilState,
  useRecoilValue
} from "recoil";
import {
  chosenVariantLanguageState, referenceVariantSelectionState,
  variantContentListsState
} from "../../store/statesRef";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const contentList = props.content;
  const title = props.title;
  const refId = props.refId;
  const rcTitle = props.rcTitle; //TEMP SOLUTION
  const variantName = props.variantName;
  const boxId = `${variantName + title}`
  
  const [loadedBefore, setLoadedBefore] = React.useState([]);

  const chosenVariantLanguage = useRecoilValue(chosenVariantLanguageState);
  const [boxState, setBoxState] = useRecoilState(variantContentListsState(boxId));

  const [referenceVariantSelection, setReferenceVariantSelection] =
    useRecoilState(referenceVariantSelectionState);
  

       //makes sure we initiate the state properly and once with full state
  if( loadedBefore.findIndex(alreadyLoadedBox => alreadyLoadedBox === boxId) < 0)  {
    const initialState = contentList.reduce((o, key) => Object.assign(o, { [key.id]: true }), {});
    console.log('we initialState xxx', initialState, chosenVariantLanguage );
    setBoxState(initialState, boxId)
    updateVariantSelection(title, initialState, chosenVariantLanguage, refId, rcTitle)
    setLoadedBefore(loadedBefore.concat(boxId))
  }

       
      
  const handleChange = (event, title) => {
    const newState = { ...boxState, [event.target.name]: event.target.checked };

    setBoxState(newState, boxId);  //since setState call back does not work properly here and does not wait for change to state, i pass newState to recoil update method
    updateVariantSelection(title, newState, chosenVariantLanguage, refId)
   
  };

  return (
    <div className={classes.root}>
      <Paper maxW>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{`Pick ${props.title}`}</FormLabel>
          <FormGroup>
            {contentList.map((contentItem) => (
              <FormControlLabel 
                control={
                  <Checkbox
                    
                    checked={boxState[contentItem.id] ?? true}
                    onChange={(e) =>{
                      handleChange(e, title)
                    } }
                    name={contentItem.id}
                  />
                }
                style={{ width:700}}
                label={contentItem.content}
              />
            ))}
          </FormGroup>
          <FormHelperText>Pick content to be displayed on slides.</FormHelperText>
        </FormControl>
 {/*        <Button onClick={e => {
                       console.log('LOG CURRENT SELECTION', referenceVariantSelection);
                      }}
          color="primary">
          LOG SELECTION
        </Button> */}
      </Paper>
    </div>
  );

  function updateVariantSelection(title, newState, chosenVariantLanguage, refId, rcTitle) {
   
    setReferenceVariantSelection((prev) => {
      const variantForUpdate = prev.find(
        (variant) => variant.name === variantName
      );
        
      console.log('newStatenewState', newState);
      
      //done once
      if (!variantForUpdate) {
        return [
          ...prev,
          {
            "name": variantName,
            "referenceContents": {
              "title": rcTitle?.id ?? "",  //set once since we can only have one title
              [title.toLowerCase()]: getSelectedCheckboxes(newState),
            },
            "language": chosenVariantLanguage,
            "creator": {
              "name":"Kamil",
              "id":"1337"
            },
            "referenceId": refId, 
            "creationDate": new Date(), 
            "updateDate": new Date(), 
          },
        ];
      }
  
      //remove the one set previously
      prev = prev.filter((variant) => variant.name !== variantName);
  
      //add to existing one
      return [
        ...prev,
        {
          ...variantForUpdate,
          "updateDate": new Date(), 
          "referenceContents": updateRefContentsObject(
            newState,
            title,
            variantForUpdate.referenceContents
          ),
        },
      ];
    });

  }
}

function updateRefContentsObject(newState, title, oldVariantRefContent) {
  const selectedContent = getSelectedCheckboxes(newState);

  const newRefContent = {
    ...oldVariantRefContent,
    //remove content with false flag since those are not selected
    [title.toLowerCase()]: selectedContent,
  };

  return newRefContent;
}

function getSelectedCheckboxes(state) {
  return Object.entries(state).filter(contentEntry => contentEntry[1] === true).map(contentEntry => contentEntry[0]);
}

