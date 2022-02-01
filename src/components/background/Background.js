/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/
/*Import components*/
/*Import helpers*/
/*Import style*/
import styles from './Background.module.scss'


function Background({children, image, styling}) {
    /*Context*/
    const {visualMode} = useContext(VisualContext)

    /*Return*/
    return (
<div className={`${styles.background} ${styles[styling]} ${styles[visualMode]}`}>
    <img src={image} className={styles.background} alt='background'/>
    {children}
</div>
    );
}

export default Background;
