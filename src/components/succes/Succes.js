/*Import from dependencies*/


/*Import context*/

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/
import styles from './Succes.module.scss'
import TEXT from "../../constants/text";

/*Import images*/

/*Import constants*/

function Succes({succes}) {
    /*Text*/
    const text = new TEXT

/*    const succesText = useLanguageChooser('Gelukt!', 'Succes')
    const failedPasswordText = useLanguageChooser('Wachtwoorden zijn hetzelfde', 'Password is the same')
    const failedUsernameText = useLanguageChooser('Gebruiker bestaat al', 'User already exists')
    const failedEmailText = useLanguageChooser('Email al in gebruik', 'Email already in use')
    const failedUnknownText = useLanguageChooser('Er is een fout opgetreden', 'An error has occurred')*/
    /*Context*/

    /*Imports*/

    /*Functions*/
    const switchText = () => {
        switch (succes) {
            case 'succes'           :
                return text.succes;
            case 'failedPassword'   :
                return text.failedPassword;
            case 'failedUsername'   :
                return text.failedUsername;
            case 'failedEmail'      :
                return text.failedEmail;
            default                 :
                return text.failedUnknown;
        }
    }


    /*Return*/
    return ( <p className={`${styles[succes]} ${styles[succes === 'succes' ? 'succes' : 'failed']}`}>
            {switchText()}
        </p>
    );
}

export default Succes;
