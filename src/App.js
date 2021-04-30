import './App.css';
import { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button';
import {getDeck, token} from './services/slidedeck/slideDeckServ.js'
import {fetchAllReferenceData, fetchReferenceDatabyName, fetchReferenceDatabyParam, fetchReferenceDatabyParamArrays} from './services/referenceService.js'
import Dashboard from './components/dashboard'

import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
   
  const [references, setReferences] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);   //  {val : "", param: ""}
  const [searchQueryTag, setSearchQueryTag] = useState([]);

 

  useEffect(() => {
    setIsLoading(true);
    console.log('query name before use', searchQuery);
    console.log(' searchQueryTag', searchQueryTag);

    if(searchQuery) {
      fetchReferenceDatabyParam(searchQuery).then((res)=> {
        console.log('result by query ', res);
        setReferences(res)
      });

    } else if(searchQueryTag.length>0) {

      fetchReferenceDatabyParamArrays(searchQueryTag, "technologyTag").then((res)=> {
        console.log('result by tag ', res);
        setReferences(res)
      })
    }
    else {
      fetchAllReferenceData().then((res)=> {
        console.log('result by default ',res);
        setReferences(res)
      });

    }

    
    setIsLoading(false);
  }, [searchQuery, searchQueryTag]);
  
  
  
  
  //create api methods for different calls
  //pass the methods to dashboard 
  //
  if(isLoading) {
    return (
      <div>Loading</div>
      )
    } else {
      console.log('references in ap', references);
      return (
        <div className="App">
       
        {//  <header className="App-header"></header> 
        }
        <Dashboard references={references}  setReferences = {setReferences}
        setQuery = {setSearchQuery} searchQuery= {searchQuery}
        setSearchQueryTag= {setSearchQueryTag} searchQueryTag={searchQueryTag}
        
        >
  
        </Dashboard>
        
  
        <Button onClick={getDeck} variant="contained" color="primary" download>
          Download Slides</Button>
      </div>
    );
    }
    
    
}

export default App;
