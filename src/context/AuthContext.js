import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

/*Context*/
export const AuthContext = createContext({})

function AuthContextProvider({ children }) {
    /*Hooks*/
    const history = useHistory()

    /*States*/
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    /*Functions*/
    async function login(username, password, setWrongPassword) {
        const endpoint = `https://polar-lake-14365.herokuapp.com/api/auth/signin`
        /*Post authentication, get token*/

        try {
            const result = await axios.post(endpoint, {
                "username": username,
                "password" : password,
            })

            /*Set token in localstorage*/
            localStorage.setItem('token', result.data.accessToken);
            console.log(result)
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
                setWrongPassword(true)
            }
            console.log(e.response)
        }

    }

    async function logout() {
        /*Set user null*/
        setAuthState({
            user: null,
            status: 'done',
        })

        /*Remove token*/
        localStorage.removeItem('token')
        history.push('/')
    }

    async function register(username, email, password, setAlreadyTaken) {
        const endpoint = `https://polar-lake-14365.herokuapp.com/api/auth/signup`
        /*Post authentication, get token*/
        let result
        try{
            result = await axios.post(endpoint,{
                "username": username,
                "email" : email,
                "password" : password,
                "role": ["user"]
            })
            console.log(result)
            if (result.status === 200) {
                history.push('/login')
            }

        } catch (e) {
            console.log(e.response)
            if (e.response.data.message === "Error: Username is already taken!") {
                setAlreadyTaken(1)
            } else if (e.response.data.message === "Error: Email is already in use!") {
                setAlreadyTaken(2)
            } else {
                setAlreadyTaken(3)
            }

        }
    }
    /*NOG NAAR KIJKEN!!!!*/
    async function updateEmail(token, email, setSuccesEmail) {

        const endpoint = `https://polar-lake-14365.herokuapp.com/api/user`
        try{
            await axios.put(endpoint,

                {email: email},

                {headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": `*`}
            })

            setSuccesEmail(1)

        } catch (e) {

            console.log(e)
            console.log(e.response)
            if (e.response.data.message === "Error: Email is already in use!") {
                setSuccesEmail(2)
            }
        }

    }

    async function getUserInfo(token) {
        const endpoint = `https://polar-lake-14365.herokuapp.com/api/user`
        let result
        try {
            result = await axios.get(endpoint,{ headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,}
            })
        } catch (e) {
            console.log(e.response)
        }

        return await result.data
    }

    async function testLink() {
        const endpoint = `https://polar-lake-14365.herokuapp.com/api/test/all`
        let result
        try {
            result = await axios.get(endpoint)
            return result
        } catch (e) {
            console.log(e.response)
        }

    }

    /*Life cycle*/
    useEffect(() => {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');
        if (token) {
            getUserInfo(token).then ((result) => {
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
            })

        } else {
            setAuthState({
                ...authState,
                status: 'done',
            })
        }

        return function cleanup() {
            source.cancel()
        }

    }, []);

    /*Context data*/
    const data = {
        ...authState,
        login: login,
        logout: logout,
        register: register,
        updateEmail : updateEmail,
        testLink : testLink
    };

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