/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './RecipePage.module.css'





function RecipePage({}) {
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    /*Return*/
    return ( <>Profile</>
    );
}

export default RecipePage;
