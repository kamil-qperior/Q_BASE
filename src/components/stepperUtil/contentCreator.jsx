
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { contentListsState, goalsListsState } from "../../store/statesRef"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



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


export default function ContentCreator(props) {


  const classes = useStyles()
  const [inputValue, setInputValue] = useState('');
  const title = props.title

  const [contentLists, setContentLists] = useRecoilState(contentListsState(title));

  

  const addItem = () => {

    if(props.single) {
      setContentLists([{
        id:getId(),
        text: inputValue,
        language: props.language,

      }], title)
      
    } else {

      setContentLists( prev => [
        ...prev,
        {
          id:getId(),
          text: inputValue,
          language: props.language,
          category: props.category
        }
      ], title)
    }


    
    console.log('contentListsAccess after adding item', contentLists);
      
    setInputValue('');   


  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>

      <TextField
        autoFocus
        className={classes.root}
        value={inputValue}
        onChange={onChange}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            addItem(ev.target.value)
          }
        }}


        id="content"
        label="Content"

        fullWidth
        xs={6}
      />  
      <Button onClick={addItem} className={classes.button}>Add</Button>
    
      
    </div>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}