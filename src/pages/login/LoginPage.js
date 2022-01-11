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

/*Import constants*/
import TEXT from "../../constants/text";

/*Import style*/
import styles from './LoginPage.module.scss'

/*Import images*/
import background from "../../assets/background/background.jpg";
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";




function LoginPage() {
    /*Text*/
    const text = new TEXT()

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - login`)

    /*States*/
    const [wrongPassword, setWrongPassword] = useState(false);

    /*Context*/
    const {login} = useContext(AuthContext)

    /*Variables*/
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regExEmail = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
                           value={regExEmail}
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
                           value={regExPassword}
                           error={errors}
                           label={text.password}
                           name='password'
                           condition='pattern'
                           styleType='long'
                           validate=''
                           type='password'/>
                    {/*Error when password is wrong*/}
                    {wrongPassword && <p className={styles.error}>{text.wrongPassword}</p>}
                    {/*Submit button*/}
                    <Button type='submit' styling='long'>
                        Login
                    </Button>
                </Form>
                <Helper>

                </Helper>
            </Container>
        </>
    );
}

export default LoginPage;
