/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './Container.module.scss'


function ProfilePage({children, width, background}) {
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    /*Return*/
    return ( <div className={`${styles.container} ${styles[visualMode]} ${styles[width]} ${styles[background]} `}>
        {children}
        </div>
    );
}

export default ProfilePage;
