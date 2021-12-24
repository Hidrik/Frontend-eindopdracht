import styles from './App.scss';
import React, {useContext} from "react";
import {Route, Switch} from "react-router-dom";
import NavBar from "./components/navigation/navBar/NavBar";
import {VisualContext} from "./context/VisualContext";


function App() {
    const {setDarkMode, setLightMode} = useContext(VisualContext)
  return (<>
      <NavBar/>
      <Switch>
          <Route exact path='/'>
          </Route>
      </Switch>
      <br/>
      <button type='button' onClick={setDarkMode}>Dark</button>
      <button type='button' onClick={setLightMode}>Light</button>
  </>);
}

export default App;
