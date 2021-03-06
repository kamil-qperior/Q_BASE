import './App.css';
import { Suspense } from "react";

import ReferenceDashboard from './components/referencemanager/referenceDashboard'
import MyReferenceDashboard from './components/referencemanager/MyReferenceDashboard'

import Header from './components/Header'
import CreateRefFormDialog from './components/referencemanager/createreference/createRefFormDialog'
import CertificationTable from './components/cv/CertificationTable';
import MyCv from './components/cv/MyCv';
import MyPaperCv from './components/cv/MyPaperCv';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import {
  RecoilRoot
} from 'recoil';
import { Typography, Paper } from '@material-ui/core';



function App() {


  return (
    <RecoilRoot>

      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/cv">
              <CertificationTable />
            </Route>
            <Route path="/mycv">
              <MyCv />
            </Route>
            <Route path="/myPaperCV">
              <MyPaperCv />
            </Route>
            <Route path="/referenceSearch">
              <Suspense fallback={null}>
                <MyReferenceDashboard />
              </Suspense >
            </Route>
            <Route path="/createReference">
              <CreateRefFormDialog />
            </Route>
            <Route path="/">
              <Paper >
                <Typography variant="h5">
                  Welcome to Q_BASE, please choose an app from the menu.
                </Typography>
              </Paper>
            </Route>
          </Switch>
        </div>
      </Router>

    </RecoilRoot>
  );
}




export default App;
