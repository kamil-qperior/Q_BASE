import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {  contentListsState } from "../../store/statesRef" 

export default function ContentItem({title, item}) {

  const [contentList, setContentList] = useRecoilState(contentListsState(title));
  const index = contentList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(contentList, index, {
      ...item,
      text: value,
    });


    setContentList(newList, title);
  };


  const deleteItem = () => {
    const newList = removeItemAtIndex(contentList, index);
    
    
    setContentList(newList, title);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />

      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}