/*Import from dependencies*/
import {useContext, useRef, useState} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {AuthContext} from "../../context/AuthContext";
/*Import assets*/

/*Import constants*/
import TextClass from "../../constants/TextClass";

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
import styles from './RegistrationPage.module.scss'   /*Not used but still could be used in further versions*/

/*Import images*/
import background from "../../assets/background/background.jpg";
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";

/*Constants*/
import ErrorStates from "../../constants/ErrorStates";
import RegExpr from "../../constants/RegExpr";


function RegistrationPage() {
    /*Constants*/
    const text = new TextClass()
    const state = new ErrorStates()
    const regEx = new RegExpr()

    /*States*/
    /*Initial and ok: 0, Username already taken: 1, Email already taken: 2, Unknown error: 3*/
    const [success, setSuccess] = useState(state.noError)



    /*Hooks*/
    useDocumentTitle(`${text.homepage} - ${text.register}`)

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
                           message={text.emailMessage}
                           value={regEx.email}
                           error={errors}
                           label={text.email}
                           name='email'
                           condition='pattern'
                           styleType='long'
                           validate=''
                           type='email'/>
                    {/*Password*/}
                    <Input required={text.required}
                           register={register}
                           message={text.passwordMessage}
                           value={regEx.password}
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
