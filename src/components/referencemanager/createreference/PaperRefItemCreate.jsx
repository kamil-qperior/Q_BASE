import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { default as React } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { languageCode } from "../../../store/states";
import {
  chosenVariantLanguageState,
  contentListsState,
  referenceVariantSelectionState
} from "../../../store/statesRef";
import ContentCreator from "../../stepperUtil/contentCreator";
import ContentItem from "../../stepperUtil/contentItem";

const useStyles = makeStyles((theme) => ({

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

  const titleHeader = title;

  const chosenVariantLanguage = useRecoilValue(chosenVariantLanguageState);

  const [referenceVariantSelection, setReferenceVariantSelection] =
    useRecoilState(referenceVariantSelectionState);

  const [contentList, setContentList] = useRecoilState(
    contentListsState(propertyKey)
  ); //title is "goals"  etc

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
          {contentList.map((el) => (
            <ListItem>
              <ContentItem  title={propertyKey} item={el} />
            </ListItem>
          ))}
          <div>
            <ContentCreator
              titleHeader={titleHeader}
              title={propertyKey}
              language={"DE"}
              category={"business"}
            />{" "}
            
          </div>
        </List>
      </Collapse>
    </div>
  );
}


