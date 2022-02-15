/*Import dependencies*/
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";

/*Import components*/
import App from './App';

/*Import styling*/
import './index.css';

/*Import context providers*/
import VisualContextProvider from "./context/VisualContext";
import LanguageContextProvider from "./context/LanguageContext";
import AuthContextProvider from "./context/AuthContext";

/*Render DOM*/
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <LanguageContextProvider>
                    <VisualContextProvider>
                        <App/>
                    </VisualContextProvider>
                </LanguageContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
