import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { contentListsState } from "../../store/statesRef";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    margin: 10,
  },
  button: {
    marginRight: theme.spacing(1),
    color: "#3f50b5;",
    margin: 15,
  },
  addContentInput: {
    "text-align": "-webkit-left;",
    paddingLeft: "1rem"
  },
}));

let id = 0;
export default function ContentCreator(props) {
  const classes = useStyles();
  /* const [id, setId] = useState(0); */
  const [inputValue, setInputValue] = useState("");
  const title = props.title;

  //TODO language is not used here currently
  const [contentLists, setContentLists] = useRecoilState(
    contentListsState(title)
  );

  const addItem = () => {
    if (props.single) {
      setContentLists(
        [
          {
            id: getId(),
            content: inputValue ?? "",
            language: props.language,
            category: props.category,
          },
        ],
        title
      );
    } else {
      setContentLists(
        (prev) => [
          ...prev,
          {
            id: getId(),
            content: inputValue,
            language: props.language,
            category: props.category,
          },
        ],
        title
      );
    }

    function getId() {
      return id++;
    }

    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div  className={classes.addContentInput} >
      <TextField
        autoFocus
        /* className={classes.root} */
        value={inputValue}
        onChange={onChange}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            addItem(ev.target.value);
          }
        }}
        id="content"
        label="Add content"
        style={{ width: "20rem" }}
        xs={6}
      />
      <Button onClick={addItem} className={classes.button}>
        {" "}
        <SaveIcon />
      </Button>
    </div>
  );
}

// utility for creating unique Id
