/*Import from dependencies*/
import {useContext} from "react";
import {AiOutlineQuestionCircle} from "react-icons/ai";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from "../../context/LanguageContext";
/*Import assets*/

/*Import components*/
import Title from "../title/Title";

/*Import helpers*/

/*Import style*/
import styles from './Helper.module.scss'

/*Import constants*/
import TEXT from "../../constants/text";

/*Import images*/


function Helper({page}) {
    /*Text*/
    const text = new TEXT()

    /*States*/

    /*Variables*/

    /*Context*/
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)
    /*Imports*/


    /*Functions*/
    const textSelector = () => {
        /*When site in Dutch:*/
        if (language === 'NL') {
            switch (page) {
                case 'fridge'           : return<>
                </>
                case 'grocery'          : return<>
                </>
                case 'home'             : return<>
                </>
                case 'login'            : return<>
                </>
                case 'profile'          : return<>
                </>
                case 'recipe'           : return<>
                </>
                case 'registration'     : return<>
                    Op deze pagina kan het profiel aangepast worden.
                    <br/>
                    Het emailadres moet geldig zijn.
                    <br/>
                    Het wachtwoord moet minimaal 1 hoofdletter, cijfer en 8 characters bevatten.
                </>;
                default: return <>Er is een fout opgetreden...</>
            }
        } else {
            /*When site in English:*/
            switch (page) {
                case 'fridge'           : return<>
                </>
                case 'grocery'          : return<>
                </>
                case 'home'             : return<>
                </>
                case 'login'            : return<>
                </>
                case 'profile'          : return<>
                </>
                case 'recipe'           : return<>
                </>
                case 'registration'     : return<>
                    On this page you can change your profile settings.
                    <br/>
                    The e-mailaddress needs to be valid.
                    <br/>
                    The password must contain 1 capital letter, number and 8 characters.
                </>;
                default: return <>An error has occurred...</>
            }
        }

    }

    /*Return*/
    return (<>
            <AiOutlineQuestionCircle className={`${styles['manual-icon']} ${styles[visualMode]}`}/>
            <div className={styles.manual}>
                <Title styling='helper'>
                    {text.manual}
                </Title>
                {textSelector()}
            </div>
        </>
    );
}

export default Helper;
