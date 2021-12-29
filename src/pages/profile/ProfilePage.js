/*Import from dependencies*/
import {useContext, useRef} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/
/*Import components*/
import Container from "../../components/container/Container";

/*Import helpers*/
import useLanguageChooser from "../../helpers/useLanguageChooser";

/*Import style*/
import styles from './ProfilePage.module.scss'
import Background from "../../components/background/Background";

/*Import images*/
import background from '../../assets/background/background.jpg';
import Input from "../../components/form/Input/Input";


function ProfilePage({}) {
    /*Variables*/
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    /*Context*/
    const {visualMode, setDarkMode, setLightMode} = useContext(VisualContext)

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

    const gebruiker = 'Hidrik'

    const log = (data) => {
        console.log(data)
    }

    /*Return*/
    return (<>
        <Background image={background} style='image'/>
        <Container width='small'>

            <h1 className={styles.title}>{`${useLanguageChooser('Welkom', 'Welcome')} ${gebruiker}`}</h1>

            <form className={styles.form} onSubmit={handleSubmitUsername(log)}>

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

                <button type='submit' className={`${styles.button} ${styles[visualMode]}`}>
                    {useLanguageChooser('Wijzigen', 'Change')}
                </button>

            </form>

            <form className={styles.form} onSubmit={handleSubmitPassword(log)}>

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

                <Input required=''
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


                <Input required=''
                       register={registerPassword}
                       message={useLanguageChooser(
                           'Wachtwoord is niet gelijk',
                           "The passwords do not match")}
                       value=''
                       validate={value =>
                           value === password.current || "The passwords do not match"}
                       error={errorsPassword}
                       label={useLanguageChooser(
                           'Nieuw herhaald:',
                           'New repeat:')}
                       name='new_repeat'
                       condition=''
                       styleType='short'
                       type='password'/>
                <button type='submit' className={`${styles.button} ${styles[visualMode]}`}>
                    {useLanguageChooser('Wijzigen', 'Change')}
                </button>

            </form>
            <div className={styles['mode-container']}>
            <button
                className={`${styles.button} ${styles['mode-button-dark']} ${styles[visualMode]}`}
                onClick={setDarkMode}>
                {useLanguageChooser('Donker', 'Dark')}
            </button>

            <button
                className={`${styles.button} ${styles['mode-button-light']} ${styles[visualMode]}`}
                onClick={setLightMode}>
                {useLanguageChooser('Light', 'Licht')}
            </button>
            </div>
        </Container>
    </>);
}

export default ProfilePage;
