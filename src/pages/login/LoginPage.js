/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './LoginPage.module.css'
import Background from "../../components/background/Background";
import background from "../../assets/background/background.jpg";





function LoginPage({}) {
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    /*Return*/
    return ( <>
            <Background image={background} style='image'/>
            Login</>
    );
}

export default LoginPage;
