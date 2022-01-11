/*Dependencies*/
import React, {useContext} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

/*Context*/
import {AuthContext} from "./context/AuthContext";

/*Components*/
import NavBar from "./components/navigation/navBar/NavBar";
import Background from "./components/background/Background";
/*Styles*/

/*Helpers*/

/*Pages*/
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import FridgePage from "./pages/fridge/FridgePage";
import GroceryListPage from "./pages/groceryList/GroceryListPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import RecipePage from "./pages/recipe/RecipePage";





function App() {
    const {user} = useContext(AuthContext)
    return (<>
        <Background image='None' styling=' '>

            <NavBar/>
            <Switch>
                <Route exact path='/'>
                    <HomePage/>
                </Route>
                <Route exact path='/login'>
                    {user === null ?  <LoginPage/> : <Redirect to='/'/>}
                </Route>
                <Route exact path='/fridge'>
                    {user === null ? <Redirect to='/'/> : <FridgePage/>}
                </Route>
                <Route exact path='/grocery-list'>
                    <GroceryListPage/>
                </Route>
                <Route exact path='/register'>
                    {user === null ?  <RegistrationPage/> : <Redirect to='/'/>}
                </Route>
                <Route exact path='/profile'>
                    {user === null ? <Redirect to='/'/> : <ProfilePage/>}
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
