
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import {
  useRecoilState
} from 'recoil';
import { contentListsState } from "../../store/statesRef";




const useStyles = makeStyles((theme) => ({
  root: {
      width: '70%',
      margin: 10
  },
  button: {
      marginRight: theme.spacing(1),
      color: "blue",
      margin: 15
  },}))


  let id = 0;
export default function ContentCreator(props) {

  const classes = useStyles()
  /* const [id, setId] = useState(0); */
  const [inputValue, setInputValue] = useState('');
  const title = props.title

  //TODO language is not used here currently
  const [contentLists, setContentLists] = useRecoilState(contentListsState(title));

  

  const addItem = () => {

    if(props.single) {
      
      setContentLists([{
        id:getId(),
        content: inputValue ?? "",
        language: props.language,
        category: props.category

      }], title)
      
    } else {

      setContentLists( prev => [
        ...prev,
        {
          id:getId(),
          content: inputValue,
          language: props.language,
          category: props.category
        }
      ], title)
    }
    
    
    
    function getId() {
      return id++;
    }
   
      
    setInputValue('');   


  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>

      <TextField
        autoFocus
        /* className={classes.root} */
        value={inputValue}
        onChange={onChange}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            addItem(ev.target.value)
          }
        }}
        id="content"
        label="Content"
        style = {{ width: 450 }}
        xs={6}
      />  
      <Button onClick={addItem} className={classes.button}>Add</Button>
    
      
    </div>
  );
}

// utility for creating unique Id
