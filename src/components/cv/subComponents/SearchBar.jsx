import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { languageCode, hierachyHeight } from "../../../store/states";
import FilterDialog from "../subComponents/FilterDialog";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { i18n } from "../../../utils/i18n/i18n";

import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {},
  searchBox: {
    padding: "16px",
  },
  searchBoxRow: {
    display: "flex",
    "justify-content": "center",
  },
  searchBoxRowItem: {
    display: "flex",
    "padding-right": "32px",
  },
  searchBoxRowItemLable: {
    "align-self": "center;",
    "font-size": "large;",
    color: "darkslategray;",
  },
}));

export default function PopoverPopupState() {
  const [lng] = useRecoilState(languageCode);
  const [theHierachyHeight, setHierachyHeight] = useRecoilState(hierachyHeight);
  const classes = useStyles();
  const handleClick = () => {
    setHierachyHeight(theHierachyHeight === "0px" ? "472px" : "0px");
  };
  return (
    <div className={classes.searchBox}>
      <div className={classes.searchBoxRow}>
        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.employee")}
          </div>
          <FilterDialog dialogKey="employeeNames" />
        </div>
        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.topicChapter")}
          </div>
          <FilterDialog dialogKey="topicChapter" />
        </div>
        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.certificate")}
          </div>
          <FilterDialog
            dialogKey="certification"
            customSwitchOn="switchFilterLogic"
          />
          <IconButton color="primary" onClick={handleClick}>
            <Badge color="primary">
              <ImportContactsIcon />
            </Badge>
          </IconButton>
        </div>

        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.consultingEmphasis")}
          </div>
          <FilterDialog dialogKey="consultingEmphasis" />
        </div>
      </div>
      <div className={classes.searchBoxRow}>
        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.industryKnowHow")}
          </div>
          <FilterDialog dialogKey="industryKnowHow" />
        </div>
        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.functionalAndMethodCompetencies")}
          </div>
          <FilterDialog dialogKey="functionalAndMethodCompetencies" />
        </div>
        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.languages")}
          </div>
          <FilterDialog dialogKey="languages" />
        </div>
        <div className={classes.searchBoxRowItem}>
          <div className={classes.searchBoxRowItemLable}>
            {i18n(lng, "CV.tableHeader.ITCompetencies")}
          </div>
          <FilterDialog dialogKey="ITCompetencies" />
        </div>
      </div>
    </div>
  );
}
