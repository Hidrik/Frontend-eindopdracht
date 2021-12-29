/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './GroceryListPage.module.css'
import background from "../../assets/background/background.jpg";
import Background from "../../components/background/Background";





function GroceryListPage({}) {
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    /*Return*/
    return ( <>
            <Background image={background} style='image'/>
            Grocerylist</>
    );
}

export default GroceryListPage;
