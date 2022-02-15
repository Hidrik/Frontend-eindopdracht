/*Dependencies*/
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";

/*Constants*/
import ErrorStates from "../constants/ErrorStates";

/*Context*/
export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    /*Variable for canceling axios requests*/
    const source = axios.CancelToken.source();

    /*Variable for unmounting*/
    const [isMounted, setIsMounted] = useState(true)

    /*Error*/
    const state = new ErrorStates()

    /*States for endpoint*/
    const [url] = useState(`https://frontend-educational-backend.herokuapp.com/`)
    const [suffixRegister] = useState(`api/auth/signup`)
    const [suffixLogin] = useState(`api/auth/signin`)
    const [suffixUser] = useState(`api/user`)
    const [suffixTest] = useState(`api/test/all`)
    /*Not being used but could be used in new versions.*/
    const [suffixProfileimage] = useState('/api/user/image')

    /*States*/
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })
    /*This variable because now if the name needs to change in the localstorage, only this variables needs to be changed.*/
    const tokenText= 'token'

    /*Context data*/
    const data = {
        ...authState,
        login: login,
        logout: logout,
        register: register,
        update: update,
        testLink: testLink,
        updatePassword: updatePassword,
    };

    /*Hooks*/
    const history = useHistory()

    /*Functions*/
    async function login(username, password, setWrongPassword) {
        if (isMounted) {
            /*Post authentication, get token*/
            try {
                const result = await axios.post(url + suffixLogin, {
                    "username": username,
                    "password": password,
                })
                /*Set token in localstorage*/
                localStorage.setItem(tokenText, result.data.accessToken);
                /*Set context data*/
                setAuthState({
                    ...authState,
                    user: {
                        username: result.data.username,
                        email: result.data.email,
                        id: result.data.id,
                        roles: result.data.roles
                    },
                    status: 'done',
                })
                history.push('/fridge')
            } catch (e) {
                if (e.response.data.error === 'Unauthorized') {
                    setWrongPassword(state.failedOldPassword)
                }
                console.log(e.response)
            }
        }
    }

    async function logout() {
        if (isMounted) {
            /*Set user null*/
            setAuthState({
                user: null,
                status: 'done',
            })

            /*Remove token*/
            localStorage.removeItem(tokenText)
            history.push('/')
        }
        }

    async function register(username, email, password, setAlreadyTaken) {
        if (isMounted) {
            /*Post authentication, get token*/
            try {
                const result = await axios.post(url + suffixRegister, {
                    "username": username,
                    "email": email,
                    "password": password,
                    "info": "hallo",
                    "role": ["user"],
                })
                if (result.status === 200) {
                    history.push('/login')
                }


            } catch (e) {
                console.log(e.response)
                if (e.response.data === "This username is already in use") {
                    setAlreadyTaken(state.failedUsername)
                } else if (e.response.data === "This email is already in use") {
                    setAlreadyTaken(state.failedEmail)
                } else {
                    setAlreadyTaken(state.failedUnknown)
                }

            }
        }
    }

    async function updatePassword(oldPassword, newPassword, setSuccesPassword) {
        if (isMounted) {
            const token = localStorage.getItem(tokenText)
            try {
                /*Post authentication, get token*/
                const result = await axios.post(url + suffixLogin, {
                    "username": authState.user.username,
                    "password": oldPassword,
                })
                if (result.status === 200) {
                    await axios.put(url + suffixUser,
                        {
                            password: newPassword,
                            repeatedPassword: newPassword,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                    setSuccesPassword(state.success)
                }

            } catch (e) {
                console.error(e)
                console.error(e.response)
                if (e.response.data.path === suffixLogin && e.response.data.error === 'Unauthorized') {
                    setSuccesPassword(state.failedOldPassword)
                } else {
                    setSuccesPassword(state.failedUnknown)
                }


            }
        }
    }

    async function update(key, value, setSucces) {
        if (isMounted) {
            const token = localStorage.getItem(tokenText)
            try {
                await axios.put(url + suffixUser,
                    {[key]: value},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                setSucces(1)

            } catch (e) {
                console.log(e.response)
                setSucces(2)
            }
        }
        }

    async function getUserInfo(token) {
        if (isMounted) {
            let result
            try {
                result = await axios.get(url + suffixUser, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                })
                return result.data
            } catch (e) {
                return null
            }
        }
    }

    async function testLink() {
        if (isMounted) {
            let result
            try {
                result = await axios.get(url + suffixTest)
                return result
            } catch (e) {
                console.log(e.response)
            }
        }
    }

    /*Life cycle*/
    useEffect(() => {
        setIsMounted(true);
        const token = localStorage.getItem(tokenText);
        if (token) {
            /*Decode token and check expire date*/
            const decoded = jwtDecode(token)
            const expired = new Date(decoded.exp)

            /*Create current date/time*/
            const now = new Date()

            /*If token is not expired => get user info*/
            if (expired <= now && isMounted) {
                getUserInfo(token).then((result) => {
                    if (result !== null) {

                        setAuthState({
                            ...authState,
                            user: {
                                username: result.username,
                                email: result.email,
                                id: result.id,
                                roles: result.roles
                            },
                            status: 'done',
                        })
                    } else {
                        localStorage.removeItem(tokenText)
                        setAuthState({
                            ...authState,
                            user: null,
                            status: 'done',
                        })
                    }
                })
                /*If token is expired => remove token from localstorage*/
            } else {
                localStorage.removeItem(tokenText)
                setAuthState({
                    ...authState,
                    user: null,
                    status: 'done',
                })
            }

        } else {
            setAuthState({
                ...authState,
                status: 'done',
            })
        }

        return function cleanup() {
            setIsMounted(false);
            source.cancel()
        }
    }, []);

    /*Return*/
    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;