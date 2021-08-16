import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ApartmentIcon from "@material-ui/icons/Apartment";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { default as React } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { saveReferenceVariant } from "../../services/referenceService";
import { languageCode } from "../../store/states";
import {
  chosenVariantLanguageState,
  contentListsState,
  chosenRefsState,
  formOpenState,
  variantNameState,
  referenceVariantSelectionState,
  refTextFieldsState,
  referenceVariantIdsFromResult,
} from "../../store/statesRef";
import { i18n } from "../../utils/i18n/i18n";
import faceImage from "./Adac.png";
import PaperRefItem from "./PaperRefItem";

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
  saveButton: {
    padding: "1rem",
    "text-align-last": "center;",
  },
  clientName: {
    "font-weight": "800",
  },
  variantNameTextField: {
    "text-align-last": "center;",
    "padding-top": "30px;"
  },
}));

export default function PaperRef() {
  //const [collapseAll, setCollapseAll] = React.useState(false);
 
  const classes = useStyles();
  const [collapseFirst, setCollapseFirst] = React.useState(true);
  const [lng] = useRecoilState(languageCode);

  const [chosenVariantLanguge, setChosenVariantLanguageState] = useRecoilState(
    chosenVariantLanguageState
  );
  const [open, setOpen] = useRecoilState(formOpenState);

  //metadata but used for basic info, use with caution
  const [refState, setRefState] = useRecoilState(refTextFieldsState);

  //also here is the data for which refId we are using
  const title = useRecoilValue(contentListsState("title"));
  const goals = useRecoilValue(contentListsState("goal"));
  const procedures = useRecoilValue(contentListsState("procedure"));
  const results = useRecoilValue(contentListsState("result"));

  const [chosenRefs, setChosenRefs] = useRecoilState(chosenRefsState);

  const indexOfTheCurrentlySelectedRef = chosenRefs.findIndex(cf => (cf.referenceID === title[0]?.referenceId) )
  const readableIndex = indexOfTheCurrentlySelectedRef + 1;

  //varaint name 
  const [variantName, setVariantName] = useRecoilState(variantNameState(readableIndex));

  const placeHolderVariantName = variantName +readableIndex//`Reference variant ${indexOfTheCurrentlySelectedRef+1}`; //for readable numbers


  //use for saving variant
  const referenceVariantSelection = useRecoilValue(
    referenceVariantSelectionState
  );
  const [referenceVariantIds, setReferenceVariantIds] = useRecoilState(
    referenceVariantIdsFromResult
  );

  const handleSaveVariant = async () => {
    const resultingIds = [];

    for await (const referenceVariant of referenceVariantSelection) {
      
      console.log("referenceVariant we saving ", referenceVariant);
      const res = await saveReferenceVariant(referenceVariant);
      console.log("referenceVariantSelection res", res);
      
      
      resultingIds.push(res?.id);
      
      //mark that changes has been made
      const configuredRef = { ...chosenRefs[indexOfTheCurrentlySelectedRef], configured: true, chosenLanguage: chosenVariantLanguge ?? "DE" };
  

      const updatedChosenRefs = [...chosenRefs];
      updatedChosenRefs.splice(indexOfTheCurrentlySelectedRef, 1, configuredRef)
      
      setChosenRefs(updatedChosenRefs)
    }
    setReferenceVariantIds(resultingIds);

    //do alternative iteration with index and order of chosen refs
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  ///////////////////

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleVariantNameChange = (event, newName) => {
  
    
    setVariantName(event.target.value, readableIndex)
    
  };

  const handleChosenLanguage = (event, newLanguage) => {
    setChosenVariantLanguageState(newLanguage);
  };

  const handleEditClick = (event) => {};
  const handleCollapseClick = (event) => {
    setCollapseFirst(!collapseFirst);
  };

  //TODO do language dependence
  return (
    <div className={classes.root}>
      <Paper className={classes.rootPaper} elevation={3}>
        <div className={classes.leftPaper}>
          <div className={classes.imageContainer}>
            <img src={faceImage} className={classes.faceImage} alt="fireSpot" />
          </div>
          <List className={classes.leftList}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.listItems}>
                <div className={classes.fontName}>{refState.clientName}</div>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={refState.name} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ApartmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={refState.industry} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ApartmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"more meta data to come"} />
            </ListItem>
          </List>

          <div className={classes.variantNameTextField}>
          <TextField 
                id={"variantName"}
                name= {variantName}
                //     value={refState[param]} this lock the whole field with onBlur
                defaultValue={placeHolderVariantName} //this may not work properly
                 key={variantName}
                
                
                onBlur={handleVariantNameChange} 
                label={"Variant Name"}
              />
          </div>
          <div className={classes.saveButton}>
            <Button
              variant="outlined"
              onClick={(e) => {
                console.log("refState", refState);
                handleSaveVariant();
              }}
              color="primary"
            >
              Save variant
            </Button>
          </div>
        </div>
        <div className={classes.rightPaper}>
{/*      wiht the current implementaiton its probably not needed
     <PaperRefItem
            title={i18n(lng, "PaperRef.expanderTitel.title")}
            content={title}
            contentTitle={title}
            variantName={placeHolderVariantName}
            propertyKey={"title"}
            index={1}
            refId={refState.referenceId}
          /> */}
          <PaperRefItem
            title={i18n(lng, "PaperRef.expanderTitel.goals")}
            content={goals}
            contentTitle={title}
            index={1}
            propertyKey={"goals"}
            variantName={placeHolderVariantName}
            refId={refState.referenceId}
          />

          <PaperRefItem
            title={i18n(lng, "PaperRef.expanderTitel.procedures")}
            content={procedures}
            contentTitle={title}
            index={1}
            propertyKey={"procedures"}
            variantName={placeHolderVariantName}
            refId={refState.referenceId}
          />
          <PaperRefItem
            title={i18n(lng, "PaperRef.expanderTitel.results")}
            content={results}
            contentTitle={title}
            index={1}
            propertyKey={"results"}
            variantName={placeHolderVariantName}
            refId={refState.referenceId}
          />
        </div>
      </Paper>
    </div>
  );
}



