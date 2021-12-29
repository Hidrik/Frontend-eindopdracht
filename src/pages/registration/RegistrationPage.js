/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './RegistrationPage.module.css'
import Background from "../../components/background/Background";
import background from "../../assets/background/background.jpg";
import Container from "../../components/container/Container";





function RegistrationPage({}) {
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    /*Return*/
    return ( <><Background image={background} style='image'/>
            <Container width='small'>
                Register
            </Container>
            </>
    );
}

export default RegistrationPage;
