/*Import from dependencies*/

/*Import context*/

/*Import assets*/

/*Import components*/


/*Import helpers*/

/*Import style*/
import styles from './Form.module.scss'

/*Import images*/

function Form({children, onSubmit}) {
    /*Context*/

    /*Imports*/

    /*Return*/
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {children}
        </form>
    );
}

export default Form;
