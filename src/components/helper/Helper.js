/*Import from dependencies*/
import {useContext} from "react";
import {AiOutlineQuestionCircle, AiOutlinePlusCircle, AiOutlinePrinter} from "react-icons/ai";

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
import Text from "../../constants/Text";

/*Import images*/


function Helper({page}) {
    /*Text*/
    const text = new Text()

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
                case 'fridge'           :
                    return <article className={styles.text}>

                    </article>
                case 'grocery'          :
                    return <article className={styles.text}>
                        <p>Op deze pagina kan een boodschappenlijst gemaakt worden.</p>
                        <p>Producten kunnen ingevoerd worden in de invoerbalken.</p>
                        <p>Een nieuwe invoerbalk kan worden toegevoegd door op <AiOutlinePlusCircle/> te drukken.</p>
                        <p>Een printopdracht kan gegeven worden door op <AiOutlinePrinter/> te drukken.</p>
                    </article>
                case 'home'             :
                    return <article className={styles.text}>
                    </article>
                case 'login'            :
                    return <article className={styles.text}>
                    </article>
                case 'profile'          :
                    return <article className={styles.text}>
                    </article>
                case 'recipe'           :
                    return <article className={styles.text}>
                    </article>
                case 'registration'     :
                    return <article className={styles.text}>
                        <p>Op deze pagina kan een account aangemaakt worden.</p>
                        <p>Het emailadres moet geldig zijn.</p>
                        <p>Het wachtwoord moet minimaal 1 hoofdletter, cijfer en 8 characters bevatten.</p>
                    </article>;
                default:
                    return <>Er is een fout opgetreden...</>
            }
        } else {
            /*When site in English:*/
            switch (page) {
                case 'fridge'           :
                    return <>
                    </>
                case 'grocery'          :
                    return <article className={styles.text}>
                        <p>A grocery list can be made on this page.</p>
                        <p>Products can be typed in the input bars.</p>
                        <p>New input bars could be added by pressing <AiOutlinePlusCircle/></p>
                        <p>The list can be printed by pressing <AiOutlinePrinter/></p>
                    </article>
                case 'home'             :
                    return <article className={styles.text}>
                    </article>
                case 'login'            :
                    return <article className={styles.text}>
                    </article>
                case 'profile'          :
                    return <article className={styles.text}>
                    </article>
                case 'recipe'           :
                    return <article className={styles.text}>
                    </article>
                case 'registration'     :
                    return <article className={styles.text}>
                        <p>On this page you can register an account.</p>
                        <p>The e-mailaddress needs to be valid.</p>
                        <p>The password must contain 1 capital letter, number and 8 characters.</p>
                    </article>;
                default:
                    return <article className={styles.text}>
                        <p>An error has occurred...</p>
                    </article>
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
