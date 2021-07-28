import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { i18n } from "../../../utils/i18n/i18n";
import { languageCode, filterLanguagesData } from "../../../store/states";
import { useRecoilState } from "recoil";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Checkbox from "@material-ui/core/Checkbox";
var objectPath = require("object-path");

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // width: "100%",
    // position: "relative",
    // minHeight: 200,
    "text-align-last": "start",
    "overflow-x": "scroll",
  },
  treeItem: {
    width: "max-content",
  },
}));

export default function GenericHierarchie({ theState, theHierachieState }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [filterLanguages] = useRecoilState(filterLanguagesData);
  const [lng] = useRecoilState(languageCode);
  const [theHierarchyInput, setHierarchyInputs] =
    useRecoilState(theHierachieState);
  const [theFilterState, setTheState] = useRecoilState(theState);
  let hierarchyInputs = JSON.parse(JSON.stringify(theHierarchyInput));

  const onLabelClick = (event) => {
    event.target.type === "checkbox" && event.preventDefault();
  };
  const onCheckBoxClick = (event) => {
    console.log(event.target.name);
    console.log(objectPath.get(hierarchyInputs, event.target.name));
    setChildrenSelection(
      objectPath.get(hierarchyInputs, event.target.name),
      !objectPath.get(hierarchyInputs, event.target.name + ".isSelected")
    );
    setHierarchyInputs(hierarchyInputs);
    let selectedLeafs = getSelectedValues(hierarchyInputs);
    let newFiltetState = theFilterState.map((el) => {
      if (selectedLeafs.includes(el.data)) {
        return { data: el.data, selected: true, visible: el.visible };
      }
      return { data: el.data, selected: false, visible: el.visible };
    });
    setTheState(newFiltetState);
  };

  const getSelectedValues = (node) => {
    if (node == null) return null;
    if (typeof node !== "object") {
      return [];
    }
    var arr = [];
    if (node.isLeaf && node.isSelected) {
      arr.push(node.name);
    } else {
      var array_node = Object.keys(node).map(function (key) {
        return node[key];
      });
      for (var i = 0; i < array_node.length; i++) {
        Array.prototype.push.apply(arr, getSelectedValues(array_node[i]));
      }
    }
    return arr;
  };

  const setChildrenSelection = (obj, value) => {
    obj.isSelected = value;
    if (obj.children) {
      obj.children.forEach((item) => {
        setChildrenSelection(item, value);
      });
    }
  };

  const isSelected = (obj) => {
    if (obj.isSelected) {
      return true;
    } else {
      if (obj.children) {
        return obj.children.map((item) => {
          return isSelected(item);
        });
      } else {
        return false;
      }
    }
  };

  if (
    theFilterState.filter((el) => el.selected).length === 0 &&
    hierarchyInputs
      .map((el) => isSelected(el))
      .flat(Infinity)
      .includes(true)
  ) {
    hierarchyInputs.forEach((item) => {
      setChildrenSelection(item, false);
    });

    setHierarchyInputs(hierarchyInputs);
  }
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      className={classes.treeItem}
      onLabelClick={onLabelClick}
      label={
        nodes.isRoot ? (
          <div>{nodes.name}</div>
        ) : (
          <div>
            <Checkbox
              checked={nodes.isSelected}
              onClick={onCheckBoxClick}
              name={nodes.path}
              color="primary"
            />
            {nodes.name}
          </div>
        )
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {hierarchyInputs.map((el) => renderTree(el))}
      {/* {renderTree(hierarchyInputs)} */}
    </TreeView>
  );
}
