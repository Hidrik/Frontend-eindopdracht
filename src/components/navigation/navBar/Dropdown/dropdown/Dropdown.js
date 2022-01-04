/*Dependencies*/
import React, {useContext} from "react"

/*Context*/
import {VisualContext} from "../../../../../context/VisualContext"

/*Compontents*/
/*Styles*/
import styles from './Dropdown.module.scss'


function Dropdown({styling, button, children, toggleShowMenu, showMenu}) {
    /*States*/

    /*Context*/
    const {visualMode} = useContext(VisualContext)

    return (
        <div className={`${styles.dropdown} ${styles[visualMode]}  ${styles[styling]}`}>
            <p onClick={() => toggleShowMenu(!showMenu)} className={`${styles.dropdown__text} ${styles[styling]}`}>
                {button}
            </p>
            {children}

        </div>);
}

export default Dropdown;

