import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  languageCode,
  hierachyHeight,
  filterEmployeeNamesData,
  filterTopicChapterData,
  filterCertificationData,
  filterConsultingEmphasisData,
  filterIndustryKnowHowData,
  filterFunctionalAndMethodCompetenciesData,
  filterLanguagesData,
  filterITCompetenciesData,
  hierarchyInput,
} from "../../../store/states";
import FilterDialog from "./FilterDialog";
import FilterExpander from "./FilterExpander";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { i18n } from "../../../utils/i18n/i18n";
import GeneriyHierachie from "./GenericHierachie";
import Collapse from "@material-ui/core/Collapse";

import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme) => ({
  root: {},
  searchBox: {
    padding: "16px",
    width: "23rem",
  },
  searchBoxRow: {
    "justify-content": "center",
  },
  searchBoxRowItem: {
    display: "flex",
  },
  searchBoxRowItemLable: {
    "align-self": "center;",
    "font-size": "large;",
    color: "darkslategray;",
  },
}));

export default function PopoverPopupState() {
  const [lng] = useRecoilState(languageCode);
  const [theFilterEmployeeNamesData, setFilterEmployeeNamesData] =
    useRecoilState(filterEmployeeNamesData);
  const [theHierachyHeight, setHierachyHeight] = useRecoilState(hierachyHeight);
  const classes = useStyles();
  const handleClick = () => {
    // setHierachyHeight(theHierachyHeight === "0px" ? "472px" : "0px");
  };
  return (
    <div className={classes.searchBox}>
      <div className={classes.searchBoxRow}>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.employee")}
            theRightState={filterEmployeeNamesData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        {/* <Divider /> */}
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.topicChapter")}
            theRightState={filterTopicChapterData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        {/* <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.certificate")}
            theRightState={filterCertificationData}
            customSwitchOn={true}
            isHierarchie={false}
          />
        </div> */}
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.certificate")}
            theRightState={filterCertificationData}
            theHierachieState={hierarchyInput}
            customSwitchOn={true}
            isHierarchie={true}
          />
        </div>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.consultingEmphasis")}
            theRightState={filterConsultingEmphasisData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.industryKnowHow")}
            theRightState={filterIndustryKnowHowData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.functionalAndMethodCompetencies")}
            theRightState={filterFunctionalAndMethodCompetenciesData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.languages")}
            theRightState={filterLanguagesData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "CV.tableHeader.ITCompetencies")}
            theRightState={filterITCompetenciesData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
      </div>
    </div>
  );
}
