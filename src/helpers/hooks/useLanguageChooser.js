/*Import from dependencies*/
import {useContext} from "react";

/*Import context*/
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/

/*Import helpers*/

/*Import style*/






function useLanguageChooser(dutch, english) {
    const {language} = useContext(LanguageContext)

    /*Return*/
    return (
        `${language === 'NL' ? dutch : english }`
    );
}

export default useLanguageChooser;
