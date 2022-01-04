/*Dependencies*/
import React from "react";
import {Route, Switch} from "react-router-dom";

/*Context*/

/*Components*/
import NavBar from "./components/navigation/navBar/NavBar";

/*Styles*/

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

    return (<>
        <Background image='None' styling=' '>

            <NavBar/>
            <Switch>
                <Route exact path='/'>
                    <HomePage/>
                </Route>
                <Route exact path='/login'>
                    <LoginPage/>
                </Route>
                <Route exact path='/fridge'>
                    <FridgePage/>
                </Route>
                <Route exact path='/grocery-list'>
                    <GroceryListPage/>
                </Route>
                <Route exact path='/register'>
                    <RegistrationPage/>
                </Route>
                <Route exact path='/profile'>
                    <ProfilePage/>
                </Route>
                <Route path='/recipes/:id'>
                    <RecipePage/>
                </Route>
            </Switch>
        </Background>
        <br/>
    </>)
}

export default App;
