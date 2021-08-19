import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { default as React } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { languageCode } from "../../store/states";
import {
  chosenVariantLanguageState,
  contentListsState,
  referenceVariantSelectionState
} from "../../store/statesRef";
import ContentCreator from "../stepperUtil/contentCreator";
import ContentItem from "../stepperUtil/contentItem";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    minHeight: "500rem",
    "justify-content": "center",
  },
  rootPaper: {
    minHeight: "500rem",
    width: "10%",
    "min-width": "94rem",
    display: "flex",
  },
  leftPaper: {
    width: "30%",
    "background-color": "aliceblue",
  },
  rightPaper: {
    width: "100%",
  },
  listItems: {
    "list-style": "disc",
    "padding-left": "77px",
    "font-weight": 400,
    "font-size": "1rem",
    "font-family": "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "line-height": 1.5,
    "letter-spacing": "0.00938em",
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
    width: "45rem",
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
}));

//nees to replace content item
export default function PaperRefItemCreate({
  contentTitle,
  index,
  title,
  content,
  propertyKey,
}) {
  const classes = useStyles();
  const [collapseFirst, setCollapseFirst] = React.useState(false);

  const [lng] = useRecoilState(languageCode);

  const handleEditClick = (event) => {};
  const handleCollapseClick = (event) => {
    setCollapseFirst(!collapseFirst);
  };

  //props needed for edit of variant properties

  //TODO second selected title is not finding content
  /*   const rcTitle = contentTitle[0]; //if its bilangual we only take on for now
  const referenceId = rcTitle.referenceId; //warning this is the refid first title */
  const titleHeader = title;
  /* 
  const boxId = `${contentTitle + title}`; */

/*   const [stringHolder, setStringHolder] = React.useState("");
  const [loadedBefore, setLoadedBefore] = React.useState([]); */

  const chosenVariantLanguage = useRecoilValue(chosenVariantLanguageState);

  //const languageFilteredContent = content.filter(c => c.language===chosenVariantLanguage)

  /*   const [boxState, setBoxState] = useRecoilState(
    variantContentListsState(boxId)
  ); */

  const [referenceVariantSelection, setReferenceVariantSelection] =
    useRecoilState(referenceVariantSelectionState);

  const [contentList, setContentList] = useRecoilState(
    contentListsState(propertyKey)
  ); //title is "goals"  etc

  //update this functionality since its not really makes sense right now
  //const indexFromContentForm = contentList.findIndex((listItem) => listItem === content); //content is an array of goals or results etc

  //changed replace to add
/*   const editItemText = ({ target: { value } }) => {
    const newList = [...contentList, { content: value }];

    console.log("new list after replacement inside array", newList);
    console.log("content saved under ", propertyKey);
    setContentList(newList, propertyKey);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(contentList, 0); //TODO FIX

    setContentList(newList, propertyKey);
  }; */


  //////////////
  return (
    <div className={classes.rightPaper}>
      {/* {enabledEdit ? "enabled edit" : "not enabled edit"} */}
      <ListItem
        button
        className={classes.collapseListItem}
        onClick={handleCollapseClick}
      >
        <div className={classes.boderBottom}>
          <div className={classes.collapseHeader}>{titleHeader}</div>
          <div>
            <IconButton
              className={classes.collapseIcon}
              color="primary"
              onClick={handleCollapseClick}
            >
              {collapseFirst ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </div>
        </div>
      </ListItem>

      <Collapse
        className={classes.collapseStyle}
        in={collapseFirst}
        timeout="auto"
        unmountOnExit
      >
        <List className={classes.rightList} dense={true}>

          {contentList.map((el) => (
            <ListItem>
              <div>
              <ContentItem title={propertyKey} item={el} />
               
                
              </div>
            </ListItem>
          ))}
          <div>
          <ContentCreator title={propertyKey} language={"DE"} category={"business"} /> {/* add radio buttons */}

          </div>
{/*           <div>
            
            <input
              type="text"
              style={{ width: 550 }}
              label={"sest"}
              defaultValue={"teest"}
              value={stringHolder}
              onChange={(e, newValue) => {
                setStringHolder(e.target.value);
              }}
              onKeyDown={(e, newValue) => {
                if (e.key === "Enter") {
                  editItemText(e);

                  setStringHolder("");
                }
              }}
            />
          </div> */}
        </List>
      </Collapse>
    </div>
  );

  
}

function updateRefContentsObject(newState, propertyKey, oldVariantRefContent) {
  const selectedContent = getSelectedCheckboxes(newState);

  const newRefContent = {
    ...oldVariantRefContent,
    //remove content with false flag since those are not selected
    [propertyKey.toLowerCase()]: selectedContent,
  };

  return newRefContent;
}

function getSelectedCheckboxes(state) {
  return Object.entries(state)
    .filter((contentEntry) => contentEntry[1] === true)
    .map((contentEntry) => contentEntry[0]);
}

//NEEDED FOR CREATE PAGE
/* function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
} */

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
