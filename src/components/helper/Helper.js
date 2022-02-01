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
import TextClass from "../../constants/TextClass";

/*Import images*/


function Helper({page}) {
    /*Text*/
    const text = new TextClass()

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
                        <p>Op deze pagina kunnen producten met houdbaarheidsdatum worden toegevoegd.</p>
                        <p>De producten worden op basis van houdbaarheidsdatum gesorteerd.</p>
                        <p>Er moet een product en datum ingevoerd worden, anders wordt het product niet opgeslagen.</p>
                        <p>Producten kunnen verwijderd worden door op 'Verwijder' te klikken.</p>
                        <p>Door op de knop rechts naast de 'verwijder' knop te klikken, kunnen producten geselecteerd worden.
                        Deze geselecteerde producten kunnen vervolgens gebruikt worden om een recept mee te zoeken door op 'Zoeken' te klikken.</p>
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
                        {/*Not used yet*/}
                    </article>
                case 'login'            :
                    return <article className={styles.text}>
                        <p>Op deze pagina kan ingelogd worden.</p>
                        <p>Ter herinnering: het wachtwoord dient minimaal 8 cijfers langs te zijn en een cijfer te bevatten.</p>
                    </article>
                case 'profile'          :
                    return <article className={styles.text}>
                        <p>Op deze pagina is het profiel te vinden.</p>
                        <p>Het emailadres kan aangepast worden.</p>
                        <p>Het wachtwoord kan hier ook aangepast worden. Let op: dit mag niet dezelfde zijn als de vorige keer.
                        Daarnaast moet het wachtwoord minimaal acht tekens lang zijn en één cijfer bevatten.</p>
                        <p>Er kan op deze pagina een keus gemaakt worden tussen een donkere of lichte weergave van de pagina's.</p>
                        <p>Op deze pagina kan ook een keus gemaakt worden tussen Nederlandse of Engelse taal.</p>
                    </article>
                case 'recipe'           :
                    return <article className={styles.text}>
                        {/*Not used yet*/}
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
                    return <article className={styles.text}>
                        <p>Products with their expiration date could be added on this page.</p>
                        <p>Products are sorted on expiration date.</p>
                        <p>A product name and date must be entered, otherwise no product can be added.</p>
                        <p>Products could be removed by pressing 'Remove'.</p>
                        <p>By pressing the button right of the 'remove' button, products could be selected.
                            These selected products could then be used to search recipes by pressing 'Search'.</p>
                    </article>
                case 'grocery'          :
                    return <article className={styles.text}>
                        <p>A grocery list can be made on this page.</p>
                        <p>Products can be typed in the input bars.</p>
                        <p>New input bars could be added by pressing <AiOutlinePlusCircle/>.</p>
                        <p>The list can be printed by pressing <AiOutlinePrinter/>.</p>
                    </article>
                case 'home'             :
                    return <article className={styles.text}>
                        {/*Not used yet*/}
                    </article>
                case 'login'            :
                    return <article className={styles.text}>
                        <p>You may login on this page if an account is made.</p>
                        <p>Reminder: The passwords must be at least 8 characters long and contain at least one number.</p>
                    </article>
                case 'profile'          :
                    return <article className={styles.text}>
                        <p>The profile is shown on this page.</p>
                        <p>The email address could be changed here.</p>
                        <p>The password could also be changed. Be aware: This may not be the same password as before.
                            Also, the password needs to be at least eight characters long and need to contain at least one number. </p>
                        <p>On this page could the visual mode be switched between light and dark.</p>
                        <p>On this page could the language setting be changed to English or Dutch.</p>
                    </article>
                case 'recipe'           :
                    return <article className={styles.text}>
                        {/*Not used yet*/}
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
