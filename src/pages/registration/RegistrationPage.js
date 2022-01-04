/*Import from dependencies*/
import {useRef} from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
/*Import context*/
/*Import assets*/
/*Import components*/
import Title from "../../components/title/Title";
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import Form from "../../components/form/form/Form";
import Helper from "../../components/helper/Helper";

/*Import helpers*/
import useLanguageChooser from "../../helpers/useLanguageChooser";

/*Import style*/
/*Import images*/
import background from "../../assets/background/background.jpg";


function RegistrationPage() {
    /*States*/

    /*Variables*/
    const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordMatchText = useLanguageChooser(
        'Wachtwoord is niet gelijk',
        "The passwords do not match")

    /*Context*/

    /*Imports*/
    const {handleSubmit, formState: {errors}, register, watch} = useForm();
    const password = useRef({});
    const history = useHistory();

    password.current = watch("password", "");

    /*Functions*/
    const log = (data) => {
        console.log(data)
        history.push('/login')
    }

    /*Return*/
    return (<>
            <Background image={background} styling='image'/>
            <Container width='small' background='true'>
                <Title>{useLanguageChooser('Registreer', 'Register')}</Title>
                {/*Register form*/}
                <Form onSubmit={handleSubmit(log)}>
                    {/*Username*/}
                    <Input required={useLanguageChooser(
                        'Moet ingevoerd worden',
                        'Must be filled in')}
                           register={register}
                           message=''
                           value=''
                           error={errors}
                           label={useLanguageChooser(
                               'Gebruikersnaam:',
                               'Username:')}
                           name='userName'
                           condition=''
                           styleType='long'
                           validate=''
                           type='text'/>
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
                    <Input required={useLanguageChooser(
                        'Moet ingevoerd worden',
                        'Must be filled in')}
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
                    {/*Password repeat*/}
                    <Input required='Moet ingevoerd worden'
                           register={register}
                           message=''
                           value=''
                           validate={value =>
                               value === password.current || passwordMatchText}
                           error={errors}
                           label={useLanguageChooser(
                               'Herhaald:',
                               'Repeat:')}
                           name='repeat'
                           condition=''
                           styleType='long'
                           type='password'/>
                    {/*Submit button*/}
                    <Button type='submit' styling='long'>
                        {useLanguageChooser('Registreren', 'Register')}
                    </Button>
                </Form>
                <Helper>
                    {useLanguageChooser(
                        'Op deze pagina kan het profiel aangepast worden. ',
                        'On this page you can change your profile settings'
                    )}
                    <br/>
                    {useLanguageChooser(
                        'Het emailadres moet geldig zijn.',
                        'The emailaddress needs to be valid.'
                    )}
                    <br/>
                    {useLanguageChooser(
                        'Het wachtwoord moet minimaal 1 hoofdletter, cijfer en 8 characters bevatten.',
                        ' The password must contain 1 capital letter, number and 8 characters.'
                    )}
                </Helper>
            </Container>
        </>
    );
}

export default RegistrationPage;
