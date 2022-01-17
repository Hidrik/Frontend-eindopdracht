/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
/*Import style*/
import styles from './Input.module.scss';


/*Import assets*/

/*Import components*/


/*Import helpers*/


/*Import images*/


function Input({
                   label,
                   register,
                   name,
                   error,
                   condition,
                   value,
                   message,
                   required,
                   styleType,
                   type,
                   validate,
                   placeholder,
                   typedIn,
               }) {
    /*Variables*/


    /*Context*/
    const {visualMode} = useContext(VisualContext)

    /*Imports*/


    /*Return*/
    return (<>
        <div className={styles[`form__container-${styleType}`]}>
            {label && <label className={styles[`text-${styleType}`]}>{label}</label>}
            <input
                name={name}
                placeholder={placeholder}
                type={type}
                defaultValue={typedIn}
                className={`${styles.input} ${styles[`form__container__input-${styleType}`]} ${styles[visualMode]} ${styleType}`} {...register ? {...register(name, {
                    [condition]: {
                        value: value,
                        message: message,
                    },
                    required: required,
                    validate: validate,
                }
            )} : ''}/>
        </div>
        {error ? <p className={`${styles.error} ${styles[styleType]}`}>{error[name] && error[name].message}</p> : ''}
    </>);
}

export default Input;
