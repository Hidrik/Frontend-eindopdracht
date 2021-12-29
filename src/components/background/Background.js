/*Import from dependencies*/
import {useContext} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './Background.module.scss'







function Background({children, image, style}) {
    /*Context*/
    const {visualMode} = useContext(VisualContext)


    /*Imports*/


    /*Return*/
    return (
<div className={`${styles.background} ${styles[style]} ${styles[visualMode]}`}>
    <img src={image} className={styles.background} alt='background'/>
    {children}
</div>
    );
}

export default Background;
