/*Import from dependencies*/
import {useContext} from "react";


/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './Button.module.scss'

/*Import images*/



function ProfilePage({onClick, styling, type, children, disabled}) {
    /*Variables*/

    /*Context*/
    const {visualMode} = useContext(VisualContext)

    /*Imports*/



    /*Return*/
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[styling]} ${styles[visualMode]}`}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
}

export default ProfilePage;
