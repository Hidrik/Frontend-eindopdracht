/*Import from dependencies*/
import {useContext} from "react";
/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/
import manual from '../../assets/icons/manual.svg'


/*Import components*/
import Title from "../title/Title";

/*Import helpers*/
import useLanguageChooser from "../../helpers/useLanguageChooser";

/*Import style*/
import styles from './Helper.module.scss'



/*Import images*/


function Helper({children}) {
    /*States*/

    /*Variables*/

    /*Context*/
    const {visualMode} = useContext(VisualContext)
    /*Imports*/


    /*Functions*/


    /*Return*/
    return (<>
            <img className={`${styles['manual-icon']} ${styles[visualMode]}`} src={manual} alt='question-mark'/>
            <div className={styles.manual}>
                <Title styling='helper'>
                    {useLanguageChooser('Gebruiksaanwijzing', 'Manual')}
                </Title>
                {children}
            </div>
        </>
    );
}

export default Helper;
