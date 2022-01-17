/*TO DO*/
/*Add functionality to the forms, make them communicate with the backend.*/

/*Import from dependencies*/
import {useContext, useRef, useState} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from "../../context/LanguageContext";
import {AuthContext} from "../../context/AuthContext";

/*Import constants*/
import Text from "../../constants/Text";

/*Import assets*/

/*Import components*/
import Container from "../../components/container/Container";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import Form from "../../components/form/form/Form";
import Success from "../../components/success/Success";
import Helper from "../../components/helper/Helper";

/*Import helpers*/

/*Import style*/
import styles from './ProfilePage.module.scss'
import Background from "../../components/background/Background";

/*Import images*/
import background from '../../assets/background/background.jpg';
import flagEnglish from '../../assets/languages/united-kingdom.png';
import flagDutch from '../../assets/languages/netherlands.png';
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";
import ErrorStates from "../../constants/ErrorStates";



function ProfilePage() {
    /*Text*/
    const text = new Text()
    const state = new ErrorStates()

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - ${text.profile}`)

    /*States*/
    /*State 0: no text, State 1: success, State 2: failed*/
    const [successEmail, setSuccessEmail] = useState(state.noError)
    /*State 0: no text, State 1: success, State 2: failed old password, State 3: failed same passwords, State 4: Cant update password*/
    const [successPassword, setSuccessPassword] = useState(state.noError)

    /*Context*/
    const {setDarkMode, setLightMode} = useContext(VisualContext)
    const {setDutch, setEnglish} = useContext(LanguageContext)
    const {user, update, updatePassword} = useContext(AuthContext)

    /*Variables*/
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const regExEmail = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    /*Destructured*/

    /*Imports*/
    const {
        handleSubmit: handleSubmitEmail,
        formState: {errors: errorsEmail},
        register: registerEmail,
    } = useForm();

    const {
        handleSubmit: handleSubmitPassword,
        formState: {errors: errorsPassword},
        register: registerPassword,
        watch,
        reset: resetPasswordInput
    } = useForm();

    /*Watch for password*/
    const password = useRef({});
    password.current = watch("newPassword", "");

    /*Functions*/
    function changePassword(data) {
        setSuccessPassword(state.noError)
        if (data.oldPassword === data.newPassword) {
            setSuccessPassword(state.failedOldPassword)
        } else {
            updatePassword(data.oldPassword, data.newPassword, setSuccessPassword)
            resetPasswordInput()
        }
    }

    function changeEmail(data) {
        update('email', data.email, setSuccessEmail)
    }

    /*Return*/
    return (<>
        <Background image={background} styling='image'/>
        <Container width='small'>
            {/*Showing username*/}
            <Title>{`${text.welcome} ${user.username}`}</Title>
            {/*Changing username success*/}
            {successEmail === state.success && <Success succes={state.success}/>}
            {/*Form for changing email*/}
            <Form onSubmit={handleSubmitEmail(changeEmail)}>

                <Input required={text.required}
                       register={registerEmail}
                       message={text.emailMessage}
                       value={regExEmail}
                       error={errorsEmail}
                       label={text.changeEmail}
                       name='email'
                       condition='pattern'
                       styleType='long'
                       validate=''
                       type='email'/>

                <Button type='submit' styling='None'>
                    {text.change}
                </Button>

            </Form>
            {successEmail === state.failedEmail && <Success succes={state.failedEmail}/>}
            {/*Form for changing password*/}
            {/*Changing username success*/}
            {successPassword === state.success && <Success succes={state.success}/>}
            <Form onSubmit={handleSubmitPassword(changePassword)}>
                <p className={styles.text}>{text.changePassword}</p>

                <Input required={text.required}
                       register={registerPassword}
                       message=''
                       value=''
                       error={errorsPassword}
                       label={text.old}
                       name='oldPassword'
                       condition=''
                       styleType='short'
                       validate=''
                       type='password'/>

                <Input required={text.required}
                       register={registerPassword}
                       message={text.passwordMessage}
                       value={regExPassword}
                       error={errorsPassword}
                       label={text.new}
                       name='newPassword'
                       condition='pattern'
                       styleType='short'
                       validate=''
                       type='password'/>


                <Input required={text.required}
                       register={registerPassword}
                       message={text.passwordMatch}
                       value=''
                       validate={value =>
                           value === password.current || text.passwordMatch}
                       error={errorsPassword}
                       label={text.repeat}
                       name='newRepeat'
                       condition=''
                       styleType='short'
                       type='password'/>
                {/*If new and old password are the same*/}
                {successPassword === state.failedOldPassword && <Success succes={state.failedOldPassword}/>}
                {successPassword === state.failedSamePassword && <Success succes={state.failedSamePassword}/>}
                {successPassword === state.failedUpdatePassword && <Success succes={state.failedUpdatePassword}/>}
                <Button type='submit' styling='None'>
                    {text.change}
                </Button>
            </Form>

            {/*Buttons for choosing between dark/light mode*/}
            <div className={styles['mode-container']}>
                <Button onClick={setDarkMode} styling='mode-button-left' type='button'>
                    {text.dark}
                </Button>
                <Button onClick={setLightMode} styling='mode-button-right' type='button'>
                    {text.light}
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
            <Helper page='profile'/>
        </Container>

    </>);
}

export default ProfilePage;
