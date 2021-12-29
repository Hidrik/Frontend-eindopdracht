/*Dependencies*/
import React, {useContext, useState} from "react"

/*Context*/
import {LanguageContext} from "../../../../../context/LanguageContext"
import {VisualContext} from "../../../../../context/VisualContext"

/*Compontents*/

/*Styles*/
import styles from './Dropdown.module.scss'


function Dropdown({style, button, children, toggleShowMenu, showMenu}) {
    /*States*/

    /*Context*/
    const {visualMode} = useContext(VisualContext)

    return (
        <div className={`${styles.dropdown} ${styles[visualMode]}  ${styles[style]}`}>
            <p onClick={() => toggleShowMenu(!showMenu)} className={`${styles.dropdown__text} ${styles[style]}`}>
                {button}
            </p>
            {children}

        </div>);
}

export default Dropdown;

