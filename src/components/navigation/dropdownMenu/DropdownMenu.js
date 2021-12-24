/*Dependencies*/
import {NavLink} from "react-router-dom"
import React, {useContext, useState} from "react"

/*Context*/
import {LanguageContext} from "../../../context/LanguageContext"
import {VisualContext} from "../../../context/VisualContext"

/*Compontents*/
import NavLinkDropdown from "../navLinkDropdown/NavLinkDropdown";

/*Styles*/
import styles from './DropdownMenu.module.scss'

function DropdownMenu() {
    /*States*/
    const [showMenu, toggleShowMenu] = useState(false)
    /*Context*/
    const {language} = useContext(LanguageContext)
    const {visualMode} = useContext(VisualContext)

    return (
        <div className={`${styles.dropdown} ${styles[visualMode]}`}>
            <p onClick={() => toggleShowMenu(!showMenu)}>Menu</p>
            <NavLinkDropdown to='/login' showMenu={showMenu} toggleShowMenu={toggleShowMenu}>
                login
            </NavLinkDropdown>
            <NavLinkDropdown to={language === 'NL' ? 'registreer' : 'register'} showMenu={showMenu} toggleShowMenu={toggleShowMenu}>
                {language === 'NL' ? 'Registreer' : 'Register'}
            </NavLinkDropdown>
            <NavLinkDropdown to={language === 'NL' ? 'profiel' : 'profile'} showMenu={showMenu} toggleShowMenu={toggleShowMenu}>
                {language === 'NL' ? 'Profiel' : 'Profile'}
            </NavLinkDropdown>
        </div>);
}

export default DropdownMenu;

