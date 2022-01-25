/*Import from dependencies*/


/*Import context*/

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './Success.module.scss'
import TextClass from "../../constants/TextClass";
import ErrorStates from "../../constants/ErrorStates";

/*Import images*/

/*Import constants*/

function Success({succes: success}) {
    /*Text*/
    const text = new TextClass()

    /*error*/
    const error = new ErrorStates()

/*    const succesText = useLanguageChooser('Gelukt!', 'Succes')
    const failedPasswordText = useLanguageChooser('Wachtwoorden zijn hetzelfde', 'Password is the same')
    const failedUsernameText = useLanguageChooser('Gebruiker bestaat al', 'User already exists')
    const failedEmailText = useLanguageChooser('Email al in gebruik', 'Email already in use')
    const failedUnknownText = useLanguageChooser('Er is een fout opgetreden', 'An error has occurred')*/
    /*Context*/

    /*Imports*/


    /*Functions*/
    const switchText = () => {
        console.log(success)
        switch (success) {
            case error.success:
                return text.success

            case error.failedOldPassword:
                return text.failedOldPassword

            case error.failedUsername:
                return text.failedUsername

            case error.failedEmail:
                return text.failedEmail

            case error.failedSamePassword:
                return text.failedSamePassword

            case error.failedUpdatePassword:
                return text.failedUpdatePassword

            default:
                return text.failedUnknown
        }
    }


    /*Return*/
    return ( <p className={`${styles[success]} ${styles[success === error.success ? 'success' : 'failed']}`}>
            {switchText()}
        </p>
    );
}

export default Success;
