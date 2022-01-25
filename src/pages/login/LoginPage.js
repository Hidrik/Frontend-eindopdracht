/*Import from dependencies*/
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";

/*Import context*/
import {AuthContext} from "../../context/AuthContext";

/*Import assets*/

/*Import components*/
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import Form from "../../components/form/form/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import Helper from "../../components/helper/Helper";

/*Import helpers*/
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";

/*Import constants*/
import TextClass from "../../constants/TextClass";
import ErrorStates from "../../constants/ErrorStates";
import RegExpr from '../../constants/RegExpr'

/*Import style*/
import styles from './LoginPage.module.scss'

/*Import images*/
import background from "../../assets/background/background.jpg";






function LoginPage() {
    /*Constants*/
    const text = new TextClass()
    const state = new ErrorStates()
    const regEx = new RegExpr()

    /*States*/
    const [wrongPassword, setWrongPassword] = useState(state.noError);

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - login`)

    /*Context*/
    const {login} = useContext(AuthContext)

    /*Imports*/
    const {handleSubmit, formState: {errors}, register} = useForm();

    /*Functions*/

    /*Return*/
    return (<>
            <Background image={background} styling='image'/>
            <Container width='small'>
                <Title>Login</Title>
                {/*Register form*/}
                <Form onSubmit={handleSubmit((data) => {
                    login(data.username, data.password, setWrongPassword)})}>
                    {/*Email*/}
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
                    {/*Error when password is wrong*/}
                    {wrongPassword === state.failedOldPassword && <p className={styles.error}>{text.wrongPassword}</p>}
                    {/*Submit button*/}
                    <Button type='submit' styling='long'>
                        Login
                    </Button>
                </Form>
                <Helper page='login'/>
            </Container>        </>
    );
}

export default LoginPage;
