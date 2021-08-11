import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useRecoilState } from "recoil";
import {
  clientFilterHolder, filterCountryData, filterIndustryData, filterNameDataHolder
} from "../../store/filter";
import {
  languageCode
} from "../../store/states";
import { i18n } from "../../utils/i18n/i18n";
import FilterExpander from "../cv/subComponents/FilterExpander";

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

  console.log("rerender searchbar");
  const classes = useStyles();
  const handleClick = () => {
    // setHierachyHeight(theHierachyHeight === "0px" ? "472px" : "0px");
  };
  return (
    <div className={classes.searchBox}>
      <div className={classes.searchBoxRow}>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "Reference.tableHeader.name")}
            theRightState={filterNameDataHolder}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        {/* <Divider /> */}
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "Reference.tableHeader.client")}
            theRightState={clientFilterHolder}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>

        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "Reference.tableHeader.industry")}
            theRightState={filterIndustryData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
        <div className={classes.searchBoxRowItem}>
          <FilterExpander
            title={i18n(lng, "Reference.tableHeader.country")}
            theRightState={filterCountryData}
            customSwitchOn={false}
            isHierarchie={false}
          />
        </div>
      </div>
    </div>
  );
}
