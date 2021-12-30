/*Import from dependencies*/
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {useState} from "react";

/*Import context*/

/*Import assets*/

/*Import components*/
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import Form from "../../components/form/form/Form";
import Input from "../../components/form/Input/Input";
import Button from "../../components/button/Button";

/*Import helpers*/
import useLanguageChooser from "../../helpers/useLanguageChooser";

/*Import style*/
import styles from './LoginPage.module.scss'

/*Import images*/
import background from "../../assets/background/background.jpg";

function LoginPage({}) {
    /*States*/
    const [wrongPassword, setWrongPassword] = useState(false);

    /*Context*/

    /*Variables*/
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const wrongPasswordText = useLanguageChooser('Wachtwoord is verkeerd', 'Wrong password');

    /*Imports*/
    const { handleSubmit, formState: {errors}, register } = useForm();
    const history = useHistory();

    /*Functions*/
    const log = (data) => {
        console.log(data)
        history.push('/fridge')
    }

    /*Return*/
    return ( <>
            <Background image={background} styling='image'/>
            <Container width='small' background='true'>
                <Title>Login</Title>
                {/*Register form*/}
                <Form onSubmit={handleSubmit(log)}>
                    {/*Email*/}
                    <Input required={useLanguageChooser(
                        'Moet ingevoerd worden',
                        'Must be filled in')}
                           register={register}
                           message={useLanguageChooser(
                               'Voer een juist email-adres in',
                               'Email address is not correct')}
                           value={regExEmail}
                           error={errors}
                           label='Email:'
                           name='email'
                           condition='pattern'
                           styleType='long'
                           validate=''
                           type='email'/>
                    {/*Password*/}
                    <Input required='Moet ingevoerd worden'
                           register={register}
                           message={useLanguageChooser(
                               'Moet minimaal 1 hoofdletter, cijfer en 8 characters bevatten',
                               'Must contain 1 capital letter, number and 8 characters')}
                           value={regExPassword}
                           error={errors}
                           label={useLanguageChooser(
                               'Wachtwoord:',
                               'Password:')}
                           name='password'
                           condition='pattern'
                           styleType='long'
                           validate=''
                           type='password'/>
                    {/*Error when password is wrong*/}
                    {wrongPassword && <p className={styles.error}>{wrongPasswordText}</p>}
                    {/*Submit button*/}
                    <Button type='submit' styling='long'>
                        Login
                    </Button>
                </Form>

            </Container>
        </>
    );
}

export default LoginPage;
