/*Import from dependencies*/
import React, {useContext, useState} from "react"

/*Import context*/
import {LanguageContext} from "../../../context/LanguageContext"
import {VisualContext} from "../../../context/VisualContext";
import {AuthContext} from "../../../context/AuthContext";

/*Import assets*/
import logo from '../../../assets/logo.png'
import flagDutch from '../../../assets/languages/netherlands.png'
import flagEnglish from '../../../assets/languages/united-kingdom.png'

/*Import components*/
import NavLinkItems from "./Items/NavLinkItems";
import Dropdown from "./Dropdown/dropdown/Dropdown";
import Button from "../../button/Button";
import NavLinkDropdown from "./Dropdown/navLinkDropdown/NavLinkDropdown";
/*Import helpers*/

/*Import style*/
import styles from './NavBar.module.scss'

/*Import constants*/
import TextClass from "../../../constants/TextClass";


function NavBar() {

    /*Text*/
    const text = new TextClass()

    /*Styling variables*/
    const selector = `${styles.selector__flag} ${styles['mobile-flag']}`
    const selectorDown = `${styles.selector__flag__down} ${styles['mobile-flag']}`
    /*States*/
    const [showMobileMenu, toggleShowMobileMenu] = useState(false)
    const [showProfile, toggleShowProfile] = useState(false)
    /*Context*/
    const {language, setDutch, setEnglish} = useContext(LanguageContext)
    const {visualMode} = useContext(VisualContext)
    const {logout, user} = useContext(AuthContext)

    /*Navigation*/

    /*Functions*/
    /*    const setLanguage = () => {
            if (language === 'NL') {
                setEnglish()
            } else if (language === 'EN') {
                setDutch()
            }
        }*/


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
                    {user === null
                        ? ''
                        : <NavLinkDropdown to='/fridge' showMenu={showMobileMenu} toggleShowMenu={toggleShowMobileMenu}>
                            {text.fridge}
                        </NavLinkDropdown>
                    }

                    <NavLinkDropdown to='/grocery-list' showMenu={showMobileMenu} toggleShowMenu={toggleShowMobileMenu}>
                        {text.grocery}
                    </NavLinkDropdown>
                </Dropdown>


                {/*Links*/}
                <>
                    {/*Link to fridge*/}
                    {user === null
                        ? ''
                        : <NavLinkItems to='/fridge'>
                            {text.fridge}
                        </NavLinkItems>}

                    {/*Link to grocery list*/}
                    <NavLinkItems to='/grocery-list'>
                        {text.grocery}
                    </NavLinkItems>
                </>
                {/*selector flag menu to choose language*/}

                <picture className={styles.selector}>
                    {language === 'NL'
                        ? <img src={flagDutch} alt='dutch-flag' className={selector}/>
                        : <img src={flagEnglish} alt='english-flag' className={selector}/>}
                    {language === 'NL'
                        ? <img src={flagEnglish} alt='english-flag' className={selectorDown} onClick={setEnglish}/>
                        : <img src={flagDutch} alt='dutch-flag' className={selectorDown} onClick={setDutch}/>
                    }
                </picture>

                {/*Dropdown for menu*/}
                <Dropdown styling='profile' showMenu={showProfile} toggleShowMenu={toggleShowProfile}
                          button='Menu'>

                    {user === null
                        ? ''
                        : <NavLinkDropdown to='/profile' showMenu={showProfile} toggleShowMenu={toggleShowProfile}>
                            {text.profile}
                        </NavLinkDropdown>}

                    {user === null
                        ?
                        <NavLinkDropdown to='/login' showMenu={showProfile} toggleShowMenu={toggleShowProfile}>
                            Login
                        </NavLinkDropdown>
                        : <NavLinkDropdown to='/' showMenu={showProfile} toggleShowMenu={toggleShowProfile}>
                            <Button onClick={logout} styling='logout'> Logout </Button>
                        </NavLinkDropdown>}

                    {user === null ?
                        <NavLinkDropdown to='/register' showMenu={showProfile} toggleShowMenu={toggleShowProfile}>
                            {text.register}
                        </NavLinkDropdown> : ''}

                </Dropdown>


            </nav>

        </>

    );
}

export default NavBar;
