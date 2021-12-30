/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {VisualContext} from "../../../context/VisualContext";
/*Import style*/
import styles from './Input.module.scss';


/*Import assets*/

/*Import components*/


/*Import helpers*/


/*Import images*/


function Input({label, register, name, error, condition, value, message, required, styleType, type, validate, placeholder, typedIn, key}) {
    /*Variables*/


    /*Context*/
    const {visualMode} = useContext(VisualContext)

    /*Imports*/


    /*Return*/
    return (<>
        <div key={key} className={styles[`form__container-${styleType}`]}>
            <label key={key}  className={styles[`text-${styleType}`]}>{label}</label>
            <input key={key}
                   name={name}
                   placeholder={placeholder}
                   type={type}
                   value={typedIn}
                        className={`${styles.input} ${styles[`input-${styleType}`]} ${styles[visualMode]} grocery`} {...register(name, {
                    [condition]: {
                        value: value,
                        message: message,
                    },
                    required: required,
                    validate: validate,
                }
            )}/>
        </div>
        <p className={`${styles.error} ${styles[styleType]}`}>{error[name] && error[name].message}</p>
    </>);
}

export default Input;
