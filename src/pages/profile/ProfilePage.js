/*TO DO*/
/*Add functionality to the forms, make them communicate with the backend.*/

/*Import from dependencies*/
import {useContext, useRef, useState} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from "../../context/LanguageContext";

/*Import assets*/
/*Import components*/
import Container from "../../components/container/Container";
import Input from "../../components/form/Input/Input";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import Form from "../../components/form/form/Form";
import Succes from "../../components/form/succes/Succes";

/*Import helpers*/
import useLanguageChooser from "../../helpers/useLanguageChooser";

/*Import style*/
import styles from './ProfilePage.module.scss'
import Background from "../../components/background/Background";

/*Import images*/
import background from '../../assets/background/background.jpg';
import flagEnglish from '../../assets/languages/united-kingdom.png';
import flagDutch from '../../assets/languages/netherlands.png';




function ProfilePage({}) {
    /*States*/
    const [succesUsername, setSuccesUsername] = useState(false)
    const [succesPassword, setSuccesPassword] = useState(false)
    const succesText = useLanguageChooser('Gelukt', 'Succes')

    /*Variables*/
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const gebruiker = 'Hidrik'

    /*Context*/
    const {setDarkMode, setLightMode} = useContext(VisualContext)
    const {setDutch, setEnglish} = useContext(LanguageContext)

    /*Imports*/
    const {
        handleSubmit: handleSubmitUsername,
        formState: {errors: errorsUsername},
        register: registerUsername
    } = useForm();

    const {
        handleSubmit: handleSubmitPassword,
        formState: {errors: errorsPassword},
        register: registerPassword,
        watch: watch
    } = useForm();

    const password = useRef({});
    password.current = watch("newPassword", "");

    const log = (data) => {
        setSuccesUsername(true)
        console.log(data)
    }

    const log2 = (data) => {
        setSuccesPassword(true)
        console.log(data)
    }

    /*Return*/
    return (<>
        <Background image={background} styling='image'/>
        <Container width='small' background='true'>
            {/*Showing username*/}
            <Title>{`${useLanguageChooser('Welkom', 'Welcome')} ${gebruiker}`}</Title>
            {/*Changing username succes*/}
            {succesUsername && <Succes/>}
            {/*Form for changing username*/}
            <Form onSubmit={handleSubmitUsername(log)}>

                <Input required={useLanguageChooser(
                    'Moet ingevoerd worden',
                    'Must be filled in')}
                       register={registerUsername}
                       message=''
                       value=''
                       error={errorsUsername}
                       label={useLanguageChooser(
                           'Gebruikersnaam wijzigen:',
                           'Change username:')}
                       name='userName'
                       condition=''
                       styleType='long'
                       validate=''
                       type='text'/>

                <Button type='submit' styling='None'>
                    {useLanguageChooser('Wijzigen', 'Change')}
                </Button>

            </Form>
            {/*Form for changing password*/}
            {/*Changing username succes*/}
            {succesPassword && <Succes/>}
            <Form onSubmit={handleSubmitPassword(log2)}>

                <p className={styles.text}>{useLanguageChooser('Wijzig wachtwoord:', 'Change password:')}</p>

                <Input required={useLanguageChooser(
                    'Moet ingevoerd worden',
                    'Must be filled in')}
                       register={registerPassword}
                       message=''
                       value=''
                       error={errorsPassword}
                       label={useLanguageChooser(
                           'Oud:',
                           'Old:')}
                       name='old'
                       condition=''
                       styleType='short'
                       validate=''
                       type='password'/>

                <Input required='Moet ingevoerd worden'
                       register={registerPassword}
                       message={useLanguageChooser(
                           'Moet minimaal 1 hoofdletter, cijfer en 8 characters bevatten',
                           'Must contain 1 capital letter, number and 8 characters')}
                       value={regExPassword}
                       error={errorsPassword}
                       label={useLanguageChooser(
                           'Nieuw:',
                           'New:')}
                       name='newPassword'
                       condition='pattern'
                       styleType='short'
                       validate=''
                       type='password'/>


                <Input required='Moet ingevoerd worden'
                       register={registerPassword}
                       message={useLanguageChooser(
                           'Wachtwoord is niet gelijk',
                           "The passwords do not match")}
                       value=''
                       validate={value =>
                           value === password.current || "The passwords do not match"}
                       error={errorsPassword}
                       label={useLanguageChooser(
                           'Herhaald:',
                           'Repeat:')}
                       name='new_repeat'
                       condition=''
                       styleType='short'
                       type='password'/>
                <Button type='submit' styling='None'>
                    {useLanguageChooser('Wijzigen', 'Change')}
                </Button>


            </Form>
            {/*Buttons for choosing between dark/light mode*/}
            <div className={styles['mode-container']}>
                <Button onClick={setDarkMode} styling='mode-button-left' type='button'>
                    {useLanguageChooser('Donker', 'Dark')}
                </Button>
                <Button onClick={setLightMode} styling='mode-button-right' type='button'>
                    {useLanguageChooser('Light', 'Licht')}
                </Button>

            </div>
            {/*Buttons for choosing between English/Dutch*/}
            <div className={styles['mode-container']}>
                <Button onClick={setEnglish} styling='mode-button-left' type='button'>
                    <img src={flagEnglish} alt='flag-English' className={styles.flag}/>
                </Button>
                <Button onClick={setDutch} styling='mode-button-right' type='button'>
                    <img src={flagDutch} alt='flag-Dutch' className={styles.flag}/>
                </Button>

            </div>
        </Container>

    </>);
}

export default ProfilePage;
