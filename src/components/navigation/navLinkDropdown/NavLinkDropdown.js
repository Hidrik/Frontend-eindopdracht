import React, {useContext} from "react";

/*Context*/
import {LanguageContext} from "../../../context/LanguageContext"
import {VisualContext} from "../../../context/VisualContext"
import {NavLink} from "react-router-dom";

/*styles*/
import styles from './NavLinkDropdown.module.scss'

function NavLinkDropdown({to, toggleShowMenu, showMenu, children}) {
    const {language} = useContext(LanguageContext)
    const {visualMode} = useContext(VisualContext)

    return (showMenu && <NavLink to={to}
                     onClick={() => toggleShowMenu(!showMenu)}
                     className={`${styles.dropdown__text} ${styles[visualMode]}`}>
        {children}
    </NavLink>);
}

export default NavLinkDropdown;
