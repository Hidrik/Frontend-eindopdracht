import React, {createContext, useEffect, useState} from 'react';


export const VisualContext = createContext({})

function VisualContextProvider({children}) {
    /*Text variable*/
    const visualText = 'visualMode'
    const light = 'light'
    const dark = 'dark'

    /*Context variables*/
    const [visualMode, setVisualMode] = useState(light)

    /*Context functions for setting variables*/
    const setDarkMode = () => {
        setVisualMode(dark)
        localStorage.setItem(visualText, dark)
    }
    const setLightMode = () => {
        setVisualMode(light)
        localStorage.setItem(visualText, light)
    }

    /*On a refresh, the visual mode is still the same as before. */
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            const storedVisual = localStorage.getItem(visualText)
            if (storedVisual) {
                setVisualMode(storedVisual)
            }
        }
        return function cleanup() {
            isMounted = false;
        }
    }, [])

    /*Context data which is exported to components*/
    const data = {
        visualMode: visualMode,
        setDarkMode: setDarkMode,
        setLightMode: setLightMode,
    }

    /*Return statement in which the data is provided to other components*/
    return (
        <VisualContext.Provider value={data}>
            {children}
        </VisualContext.Provider>
    )
}

export default VisualContextProvider;