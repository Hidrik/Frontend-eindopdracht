/*Dependencies*/
import React, {useContext} from "react";
import {Route, Switch} from "react-router-dom";

/*Context*/
import {VisualContext} from "./context/VisualContext";
import {LanguageContext} from "./context/LanguageContext";

/*Components*/
import NavBar from "./components/navigation/navBar/NavBar";

/*Styles*/
import styles from './App.scss';

/*Pages*/
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import FridgePage from "./pages/fridge/FridgePage";
import GroceryListPage from "./pages/groceryList/GroceryListPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RecipePage from "./pages/recipe/RecipePage";
import Background from "./components/background/Background";

function App() {
    const {visualMode, setDarkMode, setLightMode} = useContext(VisualContext)

    return (<>
        <NavBar/>
        <Switch>
            <Route exact path='/'>
                <HomePage></HomePage>
            </Route>
            <Route exact path='/login'>
                <LoginPage></LoginPage>
            </Route>
            <Route exact path='/fridge'>
                <FridgePage></FridgePage>
            </Route>
            <Route exact path='/grocery-list'>
                <GroceryListPage></GroceryListPage>
            </Route>
            <Route exact path='/register'>
                <RegistrationPage></RegistrationPage>
            </Route>
            <Route exact path='/profile'>
                <ProfilePage></ProfilePage>
            </Route>
            <Route path='/recipe:id'>
                <RecipePage></RecipePage>
            </Route>
        </Switch>
        <br/>
    </>)
}

export default App;
