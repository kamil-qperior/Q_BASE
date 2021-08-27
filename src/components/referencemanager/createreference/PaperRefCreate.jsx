import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ApartmentIcon from "@material-ui/icons/Apartment";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import { default as React } from "react";
import { useRecoilState } from "recoil";
import { languageCode } from "../../../store/states";
import {
  chosenVariantLanguageState,
  contentListsState,
  formOpenState, refTextFieldsState
} from "../../../store/statesRef";
import { i18n } from "../../../utils/i18n/i18n";
import logoImage from "../Adac.png";
import projectImage from "../adac_gross.jpg";
import PaperRefItemCreate from "./PaperRefItemCreate";

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
  bottomImageContainer: {
    "text-align-last": "center",
    marginTop: "4rem",
    padding: "10px",
    width: "11rem",
    height: "8rem",
  },
  imageContainer: {
    "text-align-last": "center",
    padding: "10px",
    width: "7rem",
    height: "7rem",
    marginTop: "1rem;",
  },
  faceImage: {
    marginTop: "3rem;",
    width: "7rem",
    height: "7rem",
    "border-radius": "5px",
  },
  projectImage: {
    marginTop: "4rem;",
    width: "22rem",
    height: "12rem",
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
    "padding-top": "30px;",
  },
}));

//for reference creation needs to replace content form
export default function PaperRefCreate() {
  const classes = useStyles();
  const [lng] = useRecoilState(languageCode);

  const [chosenVariantLanguge, setChosenVariantLanguageState] = useRecoilState(
    chosenVariantLanguageState
  );
  const [open, setOpen] = useRecoilState(formOpenState);

  //metadata but used for basic info, use with caution
  const [refState, setRefState] = useRecoilState(refTextFieldsState);

  //also here is the data for which refId we are using
  const [title, setTitle] = useRecoilState(contentListsState("title"));

  ///////////////////


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleTitleChange = (event) => {
    const newName = event.target.value;

    console.log("event.target.value", newName);
    console.log("title", title);
    //TOOD make language variable

    //setTitle([{...title[0], content: newName}], "title");
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  //TODO do language dependence
  return (
    <div className={classes.root}>
      <Paper className={classes.rootPaper} elevation={10}>
        <div className={classes.leftPaper}>
          <div className={classes.imageContainer}>
          <label htmlFor="contained-button-file"> 
          
            <Fab component="span">
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />
              <img
                src={logoImage}
                className={classes.faceImage}
                alt="fireSpot"
              />
            </Fab>
          </label>
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
              id={"title"}
              name={title[0].content}
              //     value={refState[param]} this lock the whole field with onBlur
              defaultValue={title[0].content} //this may not work properly
              key={title[0].content}
              onBlur={handleTitleChange}
              label={"Project Title "}
            />
          </div>

          <div className={classes.bottomImageContainer}>
          <label htmlFor="contained-button-file"> 
          
            <Fab component="span">
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
              />
              <img
                src={projectImage}
                className={classes.projectImage}
                alt="fireSpot"
              />
            </Fab>
          </label>
          </div>


        </div>
        <div className={classes.rightPaper}>
          <PaperRefItemCreate
            title={i18n(lng, "PaperRef.expanderTitel.goals")}
            /*   content={goals} */
            contentTitle={title}
            propertyKey={"goals"}
            refId={refState.referenceId}
          />

          <PaperRefItemCreate
            title={i18n(lng, "PaperRef.expanderTitel.procedures")}
            /*  content={procedures} */
            contentTitle={title}
            propertyKey={"procedures"}
            refId={refState.referenceId}
          />
          <PaperRefItemCreate
            title={i18n(lng, "PaperRef.expanderTitel.results")}
            /*       content={results} */
            contentTitle={title}
            propertyKey={"results"}
            refId={refState.referenceId}
          />
        </div>
      </Paper>
    </div>
  );
}
