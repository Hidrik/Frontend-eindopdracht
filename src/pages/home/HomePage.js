/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './HomePage.module.css'





function HomePage({}) {
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    /*Return*/
    return ( <>Home</>
    );
}

export default HomePage;
