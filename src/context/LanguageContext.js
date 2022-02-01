import React, {createContext, useEffect, useState} from 'react';


export const LanguageContext = createContext({})

function LanguageContextProvider({children}) {
    /*Text variable*/
    const languageText = 'language'
    const NL = 'NL'
    const EN = 'EN'


    /*Context variables*/
    const [language, setLanguage] = useState(NL)

    /*Context functions for setting variables*/
    const setLanguageDutch = () => {
        setLanguage(NL)
        localStorage.setItem(languageText, NL)
    }
    const setLanguageEnglish = () => {
        setLanguage(EN)
        localStorage.setItem(languageText, EN)
    }

    /*On a refresh, the language is still the same as before. */
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            const storedLanguage = localStorage.getItem(languageText)
            if (storedLanguage) {
                setLanguage(storedLanguage)
            }
        }
        return function cleanup() {
            isMounted = false;
        }
    }, [])

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