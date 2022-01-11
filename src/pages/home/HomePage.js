/*Import from dependencies*/
import {useForm} from "react-hook-form";
import {NavLink, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from 'axios';

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from "../../context/LanguageContext";
import {AuthContext} from "../../context/AuthContext";

/*Import assets*/
import searchButton from '../../assets/icons/search-button.svg'

/*Import components*/
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/title/Title";

/*Import constants*/
import TEXT from "../../constants/text";

/*Import helpers*/
import {spaceToUnderscore} from "../../helpers/spaceToUnderscore";
import translate, {abortTranslation} from '../../helpers/translate'
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";

/*Import style*/
import styles from './HomePage.module.scss'

/*Import images*/
import background from '../../assets/background/background.jpg'




async function translateAll(data) {
    /*Add all titles to one string from data*/
    let translateString = ''
    translateString += data.recipes.map((data) => {
        return (`${data.title}++`)
    })

    /*Translate string*/
    translateString = await translate(translateString, 'en', 'nl')

    /*Add all titles names back to the data*/
    const translateArray = translateString.split('++,')
    for (let i = 0; i < data.recipes.length; i++) {
        (data.recipes.length - 1 === i) ?
            data.recipes[i].title = translateArray[i].slice(0, -2) :
            data.recipes[i].title = translateArray[i]
    }
    /*Return data*/
    return data
}

function HomePage() {
    /*Text*/
    const text = new TEXT()

    /*Hooks*/
    useDocumentTitle(text.homepage)

    /*State*/
    const [endpoint] = useState(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY_SPOONACULAR}&number=6`)
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [first, setFirst] = useState(true)

    /*Imports*/
    const {handleSubmit, formState: {errors}, register} = useForm();
    const history = useHistory();

    /*Context*/
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)
    const {testLink} = useContext(AuthContext)

    /*Variables*/

    /*Function*/
    const search = (data) => {
        if (language === 'NL') {
            translate(data.search, 'nl', 'en').then((data) => history.push(`/recipes/${spaceToUnderscore(data)}`))
        } else {
            history.push(`/recipes/${spaceToUnderscore(data.search)}`)
        }
    }

    /*Life cylce*/
    useEffect(() => {
        const source = axios.CancelToken.source();
        let isMounted = true

        async function getData() {
            try {
                const data = await axios.get(endpoint)
                if (language === 'NL') {
                    translateAll(data.data).then((result) => {
                            if (isMounted) {
                                setData(result)
                                setIsLoaded(true)
                            }
                        }
                    )
                } else {
                    setData(data.data)
                    setIsLoaded(true)
                }

            } catch (e) {
                setError(true)
                console.error('Recepten ophalen mislukt')
            }
        }

        getData()

        return function cleanup() {
            source.cancel()
            abortTranslation()
            isMounted = false;
        }

    }, [language])


    /*Life cycle hook to start up the authentication server, only once. This can be removed if another server is used*/
    useEffect( () => {
        testLink().then( () => {
            setFirst(false)
            }
        )
    }, [first])

    /*Return*/
    return (
        <>

            {/*Searchbox*/}
            <Container width='large' background='none'>
                {/*Searchbox background image*/}
                <img src={background} alt='food' className={styles.container__background}/>
                {/*Seachbar*/}
                <form className={styles.searchbar} onSubmit={handleSubmit(search)}>
                    <Input
                        styleType='search'
                        type='text'
                        placeholder={text.searchIngredients}
                        required={true}
                        register={register}
                        error={errors}
                        name='search'

                    />
                    <Button type='submit' styling='search'>
                        <img src={searchButton} alt='search-button'
                             className={`${styles.searchbar__button} ${styles[visualMode]}`}/>
                    </Button>
                </form>
            </Container>

            {/*Small recipe containers*/}
            <div className={styles['container-recipes']}>
                {error ? <Title>{text.errorIngredients}</Title> :
                    !isLoaded ?
                        <p>Laden...</p> :
                        data.recipes.map((data) => {
                            return (
                                <NavLink key={data.id} className={styles['container-recipes__container']}
                                         to={`/recipes/${data.id}`}>
                                    <img src={data.image} alt='recipe'
                                         className={`${styles['container-recipes__container__image']} ${styles[visualMode]}`}/>
                                    <Title styling='homepage'>
                                        {data.title}
                                    </Title>
                                </NavLink>)
                        })}


            </div>

        </>
    );
}

export default HomePage;
