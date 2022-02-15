/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './Title.module.scss'



function Title({children, styling}) {
    /*Context*/
    const {visualMode} = useContext(VisualContext)

    /*Return*/
    return (<h1 className={`${styles.title} ${styles[styling]} ${styles[visualMode]}`}>{children}</h1>
    );
}

export default Title;
