/*Import from dependencies*/
import {useContext, useState} from "react"
import {NavLink, useHistory} from "react-router-dom";
/*Import context*/
import {LanguageContext} from "../../../context/LanguageContext"
import {VisualContext} from "../../../context/VisualContext";
/*Import assets*/
import logo from '../../../assets/logo.png'
import flagDutch from '../../../assets/languages/netherlands.png'
import flagEnglish from '../../../assets/languages/united-kingdom.png'
/*Import components*/
import NavLinkItems from "../navLinkItems/NavLinkItems";
/*Import helpers*/
/*Import style*/
import styles from './NavBar.module.scss'
import DropdownMenu from "../dropdownMenu/DropdownMenu";









function NavBar() {
    /*States*/

    /*Context*/
    const {language, setDutch, setEnglish} = useContext(LanguageContext)
    const {visualMode} = useContext(VisualContext)

    /*Navigation*/
    const history = useHistory()

    const setLanguage = () => {
        if (language === 'NL') {
            setEnglish()
        } else if (language === 'EN') {
            setDutch()
        }
    }



    /*Return*/
    return (<>
        <nav className={`${styles.navbar} ${styles[visualMode]}`}>
            {/*Link to homepage*/}
            <NavLinkItems to='/'>
                <img src={logo} alt='logo' className={styles.logo}/>
            </NavLinkItems>

            {/*Link depends on language*/}
            {language === 'NL' ?
                /*Dutch links*/
                <>
                    {/*Link to koelkast*/}
                    <NavLinkItems to='/koelkast'>
                        Koelkast
                    </NavLinkItems>
                    {/*Link to boodschappenlijst*/}
                    <NavLinkItems to='/boodschappenlijst'>
                        Boodschappenlijst
                    </NavLinkItems>
                </> :
                /*English links*/
                <>
                    {/*Link to fridge*/}
                    <NavLinkItems to='/fridge'>
                        Fridge
                    </NavLinkItems>
                    {/*Link to grocery list*/}
                    <NavLinkItems to='/grocery-list'>
                        Grocery list
                    </NavLinkItems>
                </>}
            {/*selector flag menu to choose language*/}

            <picture className={styles.selector}>
                {language === 'NL' ?
                    <img src={flagDutch} alt='dutch-flag' className={styles.selector__flag}/> :
                    <img src={flagEnglish} alt='english-flag' className={styles.selector__flag}/>}
                {language === 'NL' ?
                    <img src={flagEnglish} alt='english-flag' className={styles.selector__flag__down}
                         onClick={setLanguage}/> :
                    <img src={flagDutch} alt='dutch-flag' className={styles.selector__flag__down}
                         onClick={setLanguage}/>
                }
            </picture>

            {/*Dropdown for login*/}
            <DropdownMenu/>




        </nav>

    </>

    );
}

export default NavBar;
