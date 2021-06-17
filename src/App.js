import './App.css';


import Dashboard from './components/dashboard'
import Header from './components/Header'
import CertificationTable from './components/cv/CertificationTable';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import {
  RecoilRoot
} from 'recoil';
import { Typography,Paper } from '@material-ui/core';
import { Card, CardContent, CardMedia } from "@material-ui/core";




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
            <Route path="/refs">
              <Dashboard />
            </Route>
            <Route path="/">
              <Paper >
                <Typography variant="h5">
                  Welcome to Q_BASE, please choose an app from the menu.
                </Typography>
              </Paper>

{/*               <Card  >
                    <CardContent  >
                      <div style={{position: 'relative'}} >
                        <CardMedia
                            component="img"
                            image="https://www.w3schools.com/css/img_lights.jpg"
                        />
                        <div style={{
                          position: 'absolute', 
                          color: 'white', 
                          top: 8, 
                          left: '50%', 
                          transform: 'translateX(-50%)'
                        }} >Your text</div>
                      </div>
                    </CardContent>
            </Card>   */}      
            </Route>
          </Switch>
        </div>
      </Router>

    </RecoilRoot>
  );
}




export default App;
