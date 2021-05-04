import './App.css';
import { useEffect, useState } from 'react'


import { fetchAllReferenceData, fetchReferenceDatabyParam, fetchReferenceDatabyParamArrays } from './services/referenceService.js'
import Dashboard from './components/dashboard'



function App() {

  const [references, setReferences] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);   
  


  useEffect(() => {
    setIsLoading(true);
    console.log('query name before use', searchQuery);
    console.log(' searchQueryTag', searchQueryTag);

    if (searchQuery) {
      fetchReferenceDatabyParam(searchQuery).then((res) => {
        console.log('result by query ', res);
        setReferences(res)
      });
    }
    else {
      fetchAllReferenceData().then((res) => {
        console.log('result by default ', res);
        setReferences(res)
      });

    }
    setIsLoading(false);
  
  }, [searchQuery]);

  const [searchQueryTag, setSearchQueryTag] = useState([]);

  useEffect(() => {
    setIsLoading(true);

      console.log('query name before use', searchQuery);
      console.log(' searchQueryTag', searchQueryTag);

     if (searchQueryTag.length > 0) {

      fetchReferenceDatabyParamArrays(searchQueryTag, "technologyTag").then((res) => {
        console.log('result by tag ', res);
        setReferences(res)
      })
    }
    else {
      fetchAllReferenceData().then((res) => {
        console.log('result by default ', res);
        setReferences(res)
      });

    }
    setIsLoading(false);
  
  }, [ searchQueryTag]);


  if (isLoading) {
    return (
      <div>Loading</div>
    )
  } else {
    console.log('references in ap', references);
    return (
      <div className="App">

        {//  <header className="App-header"></header> 
        }
        <Dashboard references={references} setReferences={setReferences}
          setQuery={setSearchQuery} searchQuery={searchQuery}
          setSearchQueryTag={setSearchQueryTag} searchQueryTag={searchQueryTag}
        >
        </Dashboard>


      </div>
    );
  }


}

export default App;
