/*Import from dependencies*/
import {NavLink} from 'react-router-dom'
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../../../context/VisualContext";

/*Import assets*/

/*Import components*/

/*Import helpers*/


/*Import style*/
import styles from './NavLinkItems.module.scss'





function NavLinkItems({children, to}) {
    const {visualMode} = useContext(VisualContext)
    /*Return*/
    return (
        <NavLink to={to} className={`${styles.navlink} ${styles[visualMode]} ${styles.mobile}`} activeClassName={`${styles.navlink} ${styles.active}  ${styles.mobile}`}>
            {children}
        </NavLink>
    );
}

export default NavLinkItems;
