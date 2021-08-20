import { useRecoilState } from "recoil";
import { contentListsState } from "../../store/statesRef";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex;",
    "flex-direction": "row;",
    borderSpacing: "1rem",
  },
  contentStyle: {
    "border-width": "0rem;",
    "background-color": "white;",
    color: "#3f50b5;",
    margin:"2px",
    select: {
      '&:before': {
          borderColor: "#32a852",
      },
      '&:after': {
          borderColor: "#32a852",
      }
  }}
}));

export default function ContentItem({ title, item }) {
  const classes = useStyles();

  const [language, setLanguage] = useState("DE");
  const [category, setCategory] = useState("technical");

  const [contentList, setContentList] = useRecoilState(
    contentListsState(title)
  );

  const index = contentList.findIndex((listItem) => listItem.id === item.id);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(contentList, index, {
      ...item,
      content: value,
    });

    setContentList(newList, title);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(contentList, index);

    setContentList(newList, title);
  };

  const handleChosenLanguage = (event, newLanguage) => {
    const newList = replaceItemAtIndex(contentList, index, {
      ...item,
      language: newLanguage,
    });

    setContentList(newList, title);
    setLanguage(newLanguage);
  };

  const handleCategory = (event, newCategory) => {
    const newList = replaceItemAtIndex(contentList, index, {
      ...item,
      category: newCategory,
    });

    setContentList(newList, title);
    setCategory(newCategory);
  };

  return (
    <div className={classes.root}>
      
      <input
        type="text"
        style={{ width: 450, "border-width": 0}}
        value={item.content}
        onChange={editItemText}
      />

      <button className={classes.contentStyle} onClick={deleteItem}>
        <DeleteIcon  />
      </button>

      <div  >
        <ToggleButtonGroup 
          value={language}
          exclusive
          
          onChange={handleChosenLanguage}
          aria-label="text alignment"
        >
          <ToggleButton className={classes.contentStyle}  value="DE" aria-label="german">
            DE
          </ToggleButton>
          <ToggleButton className={classes.contentStyle} value="EN" aria-label="english">
            EN
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div>
        <ToggleButtonGroup 
          value={category}
          exclusive
          onChange={handleCategory}
          aria-label="text alignment"
        >
          <ToggleButton className={classes.contentStyle} value="technical" aria-label="technical">
            technical
          </ToggleButton>
          <ToggleButton className={classes.contentStyle}  value="business" aria-label="business">
            business
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
