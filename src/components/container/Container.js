/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './Container.module.scss'


function Container({children, width, background}) {
    const {visualMode} = useContext(VisualContext)

    /*Return*/
    return ( <div className={`${styles.container} ${styles[visualMode]} ${styles[width]} ${styles[background]} `}>
        {children}
        </div>
    );
}

export default Container;
