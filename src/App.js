import './App.css';
import { useEffect, useState } from 'react'


import { fetchAllReferenceData, fetchReferenceDatabyParam, fetchReferenceDatabyParamArrays } from './services/referenceService.js'
import Dashboard from './components/dashboard'
import Header from './components/Header'
import CertificationTable from './components/cv/CertificationTable';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  RecoilRoot
} from 'recoil';





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

  }, [searchQueryTag]);


  if (isLoading) {
    return (
      <div>Loading</div>
    )
  } else {
    console.log('references in ap', references);
    return (
      <RecoilRoot>

        <Router>

          <div className="App">
            <Header />
            <Switch>

              <Route path="/cv">
                <CertificationTable />
              </Route>
              <Route path="/">
                <Dashboard references={references} setReferences={setReferences}
                  setQuery={setSearchQuery} searchQuery={searchQuery}
                  setSearchQueryTag={setSearchQueryTag} searchQueryTag={searchQueryTag}
                >
                </Dashboard>

              </Route>
            </Switch>




          </div>
        </Router>
      </RecoilRoot>
    );
  }


}

export default App;
