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
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>

    </RecoilRoot>
  );
}




export default App;
