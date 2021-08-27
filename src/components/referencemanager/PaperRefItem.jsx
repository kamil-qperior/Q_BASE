import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { default as React } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { languageCode } from "../../store/states";
import {
  chosenVariantLanguageState,
  referenceVariantSelectionState,
  variantContentListsState,
} from "../../store/statesRef";

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

export default function PaperRefItem({
  contentTitle,
  variantName,
  index,
  title,
  content,
  propertyKey,
}) {
  const classes = useStyles();
  const [collapseFirst, setCollapseFirst] = React.useState(false);

  const [lng] = useRecoilState(languageCode);

  //TODO use the one with chosenref index

  const handleCollapseClick = (event) => {
    setCollapseFirst(!collapseFirst);
  };

  //TODO second selected title is not finding content
  const rcTitle = contentTitle[0]; //if its bilangual we only take on for now
  const referenceId = rcTitle.referenceId; //warning this is the refid first title

  const titleHeader = title;
  const boxId = `${variantName + title}`;

  const [loadedBefore, setLoadedBefore] = React.useState([]);

  const chosenVariantLanguage = useRecoilValue(chosenVariantLanguageState);
  const languageFilteredContent = content.filter(
    (c) => c.language === chosenVariantLanguage
  );

  const [boxState, setBoxState] = useRecoilState(
    variantContentListsState(boxId)
  );

  const [referenceVariantSelection, setReferenceVariantSelection] =
    useRecoilState(referenceVariantSelectionState);

  //makes sure we initiate the state properly and once with full state
  if (
    loadedBefore.findIndex((alreadyLoadedBox) => alreadyLoadedBox === boxId) < 0
  ) {
    const initialState = languageFilteredContent.reduce(
      (o, key) => Object.assign(o, { [key.id]: true }),
      {}
    );
    setBoxState(initialState, boxId);
    updateVariantSelection(
      propertyKey,
      initialState,
      chosenVariantLanguage,
      referenceId,
      rcTitle
    );
    setLoadedBefore(loadedBefore.concat(boxId));
  }

  const handleChange = (event, propertyKey) => {
    const newState = { ...boxState, [event.target.name]: event.target.checked };
    setBoxState(newState, boxId); //since setState call back does not work properly here and does not wait for change to state, i pass newState to recoil update method
    updateVariantSelection(
      propertyKey,
      newState,
      chosenVariantLanguage,
      referenceId,
      rcTitle
    );
  };

  return (
    <div className={classes.rightPaper}>
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
          {languageFilteredContent.map((el) => (
            <ListItem>
              <ListItemText primary={el.content} />
              <Checkbox
                checked={boxState[el.id] ?? true}
                onChange={(e) => {
                  handleChange(e, titleHeader);
                }}
                name={el.id}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  function updateVariantSelection(
    propertyKey,
    newState,
    chosenVariantLanguage,
    referenceId,
    rcTitle
  ) {
    setReferenceVariantSelection((prev) => {
      const variantForUpdate = prev.find(
        (variant) => variant.name === variantName
      );

      //done once
      if (!variantForUpdate) {
        return [
          ...prev,
          {
            name: variantName,
            referenceContents: {
              title: rcTitle?.content ?? "",
              [propertyKey.toLowerCase()]: getSelectedCheckboxes(newState),
            },
            language: chosenVariantLanguage,
            creator: {
              name: "Kamil",
              id: "1337",
            },
            referenceId: referenceId,
            creationDate: new Date(),
            updateDate: new Date(),
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
          updateDate: new Date(),
          referenceContents: updateRefContentsObject(
            newState,
            propertyKey,
            variantForUpdate.referenceContents
          ),
        },
      ];
    });
  }
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
