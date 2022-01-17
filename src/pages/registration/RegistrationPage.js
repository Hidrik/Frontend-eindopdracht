/*Import from dependencies*/
import {useContext, useRef, useState} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {AuthContext} from "../../context/AuthContext";
/*Import assets*/

/*Import constants*/
import Text from "../../constants/Text";

/*Import components*/
import Title from "../../components/title/Title";
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import Form from "../../components/form/form/Form";
import Helper from "../../components/helper/Helper";
import Success from "../../components/success/Success";

/*Import helpers*/

/*Import style*/
import styles from './RegistrationPage.module.scss'

/*Import images*/
import background from "../../assets/background/background.jpg";
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";

/*Constants*/
import ErrorStates from "../../constants/ErrorStates";


function RegistrationPage() {
    /*Text*/
    const text = new Text()

    /*Error*/
    const state = new ErrorStates()

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - ${text.register}`)

    /*States*/
    /*Initial and ok: 0, Username already taken: 1, Email already taken: 2, Unknown error: 3*/
    const [success, setSuccess] = useState(state.noError)
    /*Variables*/
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const regExEmail = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    /*Context*/
    const {register: registerUser} = useContext(AuthContext)

    /*Imports*/
    const {handleSubmit, formState: {errors}, register, watch} = useForm();
    const password = useRef({});

    password.current = watch("password", "");

    /*Functions*/

    /*Return*/
    return (<>
            <Background image={background} styling='image'/>
            <Container width='small'>
                <Title>{text.register}</Title>
                {/*Register form*/}
                <Form onSubmit={handleSubmit((data) => {
                    registerUser(data.username, data.email, data.password, setSuccess)
                })}>
                    {/*Username*/}
                    <Input required={text.required}
                           register={register}
                           message=''
                           value=''
                           error={errors}
                           label={text.username}
                           name='username'
                           condition=''
                           styleType='long'
                           validate=''
                           type='text'/>
                    {/*Email*/}
                    <Input required={text.required}
                           register={register}
                           message={text.email}
                           value={regExEmail}
                           error={errors}
                           label='Email:'
                           name='email'
                           condition='pattern'
                           styleType='long'
                           validate=''
                           type='email'/>
                    {/*Password*/}
                    <Input required={text.required}
                           register={register}
                           message={text.passwordMessage}
                           value={regExPassword}
                           error={errors}
                           label={text.password}
                           name='password'
                           condition='pattern'
                           styleType='long'
                           validate=''
                           type='password'/>
                    {/*Password repeat*/}
                    <Input required={text.required}
                           register={register}
                           message=''
                           value=''
                           validate={value =>
                               value === password.current || text.passwordMatch}
                           error={errors}
                           label={text.repeat}
                           name='repeat'
                           condition=''
                           styleType='long'
                           type='password'/>
                    {/*Submit button*/}
                    <Button type='submit' styling='long'>
                        {text.register}
                    </Button>
                </Form>
                {(success !== state.noError) && <Success
                    succes={
                    success === state.failedUsername
                        ? state.failedUsername
                        : success === state.failedEmail
                            ? state.failedEmail
                            : state.failedUnknown}/>}
                <Helper page='registration'/>
            </Container>
        </>
    );
}

export default RegistrationPage;
