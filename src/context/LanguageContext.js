import React, {createContext, useState} from 'react';


export const LanguageContext = createContext({})

function LanguageContextProvider({children}) {
    /*Context variables*/
    const [language, setLanguage] = useState('NL')

    /*Context functions for setting variables*/
    const setLanguageDutch = () => setLanguage('NL')
    const setLanguageEnglish = () => setLanguage('EN')

    /*Context data which is exported to components*/
    const data = {
        language: language,
        setDutch: setLanguageDutch,
        setEnglish: setLanguageEnglish,
    }

    /*Return statement in which the data is provided to other components*/
    return (
        <LanguageContext.Provider value={data}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContextProvider;