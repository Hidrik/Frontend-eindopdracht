/*Import from dependencies*/
import React, {useContext, useState} from "react"

/*Import context*/
import {LanguageContext} from "../../../context/LanguageContext"
import {VisualContext} from "../../../context/VisualContext";
/*Import assets*/
import logo from '../../../assets/logo.png'
import flagDutch from '../../../assets/languages/netherlands.png'
import flagEnglish from '../../../assets/languages/united-kingdom.png'
/*Import components*/
import NavLinkItems from "./Items/NavLinkItems";
import Dropdown from "./Dropdown/dropdown/Dropdown";

/*Import helpers*/
import useLanguageChooser from "../../../helpers/useLanguageChooser";
/*Import style*/
import styles from './NavBar.module.scss'
import NavLinkDropdown from "./Dropdown/navLinkDropdown/NavLinkDropdown";


function NavBar() {
    /*Styling variables*/
    const selector = `${styles.selector__flag} ${styles['mobile-flag']}`
    const selectorDown = `${styles.selector__flag__down} ${styles['mobile-flag']}`
    /*States*/
    const [showMobileMenu, toggleShowMobileMenu] = useState(false)
    const [showProfile, toggleShowProfile] = useState(false)
    /*Context*/
    const {language, setDutch, setEnglish} = useContext(LanguageContext)
    const {visualMode} = useContext(VisualContext)

    /*Navigation*/

    /*Functions*/
    const setLanguage = () => {
        if (language === 'NL') {
            setEnglish()
        } else if (language === 'EN') {
            setDutch()
        }
    }


    /*Return*/
    return (<>
            <nav className={`${styles.navbar} ${styles[visualMode]} ${styles.mobile}`}>
                {/*Link to homepage when on desktop*/}
                <NavLinkItems to='/'>
                    <img src={logo} alt='logo' className={styles.logo}/>
                </NavLinkItems>

                {/*Dropdown menu when on mobile*/}
                <Dropdown styling='mobile' showMenu={showMobileMenu} toggleShowMenu={toggleShowMobileMenu}
                          button={<img src={logo} alt='logo' className={styles['logo-mobile']}/>}>
                    <NavLinkDropdown to='/' showMenu={showMobileMenu} toggleShowMenu={toggleShowMobileMenu}>
                        Home
                    </NavLinkDropdown>
                    <NavLinkDropdown to='/fridge' showMenu={showMobileMenu} toggleShowMenu={toggleShowMobileMenu}>
                        {useLanguageChooser('Koelkast', 'Fridge')}
                    </NavLinkDropdown>
                    <NavLinkDropdown to='/grocery-list' showMenu={showMobileMenu} toggleShowMenu={toggleShowMobileMenu}>
                        {useLanguageChooser(`Boodschappen`, 'Grocery list')}
                    </NavLinkDropdown>
                </Dropdown>


                {/*Links*/}
                <>
                    {/*Link to fridge*/}
                    <NavLinkItems to='/fridge'>
                        {useLanguageChooser('Koelkast', 'Fridge')}
                    </NavLinkItems>
                    {/*Link to grocery list*/}
                    <NavLinkItems to='/grocery-list'>
                        {useLanguageChooser('Boodschappenlijst', 'Grocery list')}
                    </NavLinkItems>
                </>
                {/*selector flag menu to choose language*/}

                <picture className={styles.selector}>
                    {language === 'NL' ?
                        <img src={flagDutch} alt='dutch-flag' className={selector}/> :
                        <img src={flagEnglish} alt='english-flag' className={selector}/>}
                    {language === 'NL' ?
                        <img src={flagEnglish} alt='english-flag' className={selectorDown}
                             onClick={setLanguage}/> :
                        <img src={flagDutch} alt='dutch-flag' className={selectorDown}
                             onClick={setLanguage}/>
                    }
                </picture>

                {/*Dropdown for login*/}
                <Dropdown styling='profile' showMenu={showProfile} toggleShowMenu={toggleShowProfile}
                          button={useLanguageChooser('Menu', 'Menu')}>
                    <NavLinkDropdown to='/login' showMenu={showProfile} toggleShowMenu={toggleShowProfile}>
                        {useLanguageChooser('Login', 'Login')}
                    </NavLinkDropdown>
                    <NavLinkDropdown to='/register' showMenu={showProfile} toggleShowMenu={toggleShowProfile}>
                        {useLanguageChooser('Registreer', 'Register')}
                    </NavLinkDropdown>
                    <NavLinkDropdown to='/profile' showMenu={showProfile} toggleShowMenu={toggleShowProfile}>
                        {useLanguageChooser('Profiel', 'Profile')}
                    </NavLinkDropdown>
                </Dropdown>


            </nav>

        </>

    );
}

export default NavBar;
