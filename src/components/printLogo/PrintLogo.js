/*Import from dependencies*/
import {useContext} from "react";

import {AiOutlinePrinter} from 'react-icons/ai'

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './PrintLogo.module.scss'




function PrintLogo() {
    /*Data*/
    const {visualMode} = useContext(VisualContext)

    /*Return*/
    return <AiOutlinePrinter className={`${styles.print__logo} ${styles[visualMode]}`}/>;
}

export default PrintLogo;
