/*Import from dependencies*/
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import parse from 'html-react-parser';
import {AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineFieldTime} from 'react-icons/ai'

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from "../../context/LanguageContext";
/*Import assets*/

/*Import components*/
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";

/*Import helpers*/
import {underscoreToEndpoint} from "../../helpers/underscoreToEndpoint";
import print from "../../helpers/print";
import translate, {abortTranslation} from "../../helpers/translate";

/*Import style*/
import styles from './RecipePage.module.scss'
import PrintLogo from "../../components/printLogo/PrintLogo";
import TextClass from "../../constants/TextClass";
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";


async function translateAll(result) {

    try {
        /*Add al translated items together so only one api call has to be made*/
        /*Items to split on*/
        const splitstring = '** '
        const splitstringItems = '++ '

        /*Make the string which needs to be translated and add summary and title*/
        let translateText = `${result.data.summary}${splitstring}${result.data.title}${splitstring}`

        /*Add the ingredient names to the string*/
        if (result.data.extendedIngredients.length !== 0) {
            for (let i = 0; i < result.data.extendedIngredients.length; i++) {
                translateText += `${result.data.extendedIngredients[i].name}${splitstringItems}`
                if (i === (result.data.extendedIngredients.length - 1)) {
                    translateText += splitstring
                }
            }
        } else {
            translateText += `not available${splitstring}`
        }

        /*Add the instructions to the string*/
        if (result.data.analyzedInstructions.length !== 0) {
            for (let i = 0; i < result.data.analyzedInstructions[0].steps.length; i++) {
                translateText += `${result.data.analyzedInstructions[0].steps[i].step}${splitstringItems}`
                if (i === (result.data.analyzedInstructions[0].steps.length - 1)) {
                    translateText += splitstring
                }
            }
        } else {
            translateText += `not available${splitstring}`
        }

        /*Add the nutritions to the string*/
        if (result.data.nutrition.nutrients.length !== 0) {
            for (let i = 0; i < result.data.nutrition.nutrients.length; i++) {
                translateText += `${result.data.nutrition.nutrients[i].name}${splitstringItems}`
                /*result.data.nutrition.nutrients[i].name = await translate(result.data.nutrition.nutrients[i].name, 'en','nl')*/
            }
        } else {
            translateText += `not available${splitstring}`
        }

        /*Translate the string (API call)*/
        translateText = await translate(translateText, 'en', 'nl')

        /*Split the string again and fill results with the translated text*/
        /*Split*/

        const translatedArray = translateText.split(splitstring)

        /*Replace English summary with Dutch summary*/
        result.data.summary = translatedArray[0]

        /*Replace English title with Dutch title*/
        result.data.title = translatedArray[1]

        /*Replace English ingredient names with Dutch ingredient names*/
        if (result.data.extendedIngredients.length !== 0) {
            for (let i = 0; i < result.data.extendedIngredients.length; i++) {
                result.data.extendedIngredients[i].name = translatedArray[2].split(splitstringItems)[i]
            }
        }


        /*Replace English instructions with Dutch instructions*/
        if (result.data.analyzedInstructions.length !== 0) {
            for (let i = 0; i < result.data.analyzedInstructions[0].steps.length; i++) {
                result.data.analyzedInstructions[0].steps[i].step = translatedArray[3].split(splitstringItems)[i]
            }
        }


        /*Replace English nutrients with Dutch nutrients*/
        if (result.data.nutrition.nutrients.length !== 0) {
            for (let i = 0; i < result.data.nutrition.nutrients.length; i++) {
                result.data.nutrition.nutrients[i].name = translatedArray[4].split(splitstringItems)[i]
            }
        }

    } catch (e) {
        console.log(e)
    }

    return result
}


function RecipePage() {
    /*Text*/
    const text = new TextClass()

    /*States*/
    const [data, setData] = useState({})
    const [originalData, setOriginalData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [endpoint, setEndpoint] = useState('')
    const [first, setFirst] = useState(true)
    const [recipeId, setRecipeId] = useState('notANumber')
    const [persons, setPersons] = useState(4)
    const [refreshButton, setRefreshButton] = useState(false)
    const [offset, setOffset] = useState(0)
    const [noRecipe, setNoRecipe] = useState(false)
    const [error, setError] = useState(false)

    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - ${text.recipe}`)

    /*React variables*/
    const {id} = useParams();

    /*Life cycle*/
    useEffect(() => {
        const source = axios.CancelToken.source();
        setIsLoaded(false)
        setNoRecipe(false)
        setError(false)

        async function getData() {

            try {
                const result = await axios.get(endpoint)
                /*If recipe is received*/
                if (isNaN(recipeId) && isNaN(id)) {
                    if (result.data.results.length === 0) {
                        setNoRecipe(true)
                    } else {
                        setEndpoint(`https://api.spoonacular.com/recipes/${result.data.results[0].id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY_SPOONACULAR}`)
                        setRecipeId(result.data.results[0].id)
                    }
                } else {
                    setOriginalData(result.data)
                    console.log(result.data)
                    if (language === 'NL') {
                        translateAll(result).then((result) => {
                            setData(result.data)
                            setIsLoaded(true)
                        })
                    } else {
                        setData(result.data)
                        setIsLoaded(true)
                    }

                    setPersons(result.data.servings)
                }


                /*When no data can be received*/
            } catch (e) {
                console.error(text.getDataError, e)
                setError(true)
            }
        }

        /*If number, then user clicked on recipe on homepage*/
        if (first) {
            if (isNaN(id)) {
                const ingredients = underscoreToEndpoint(id)
                setRecipeId(id)
                setEndpoint(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&number=1&addRecipeNutrition=true&offset=${offset}&apiKey=${process.env.REACT_APP_API_KEY_SPOONACULAR}`)
                setRefreshButton(true)
            } else {
                setEndpoint(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY_SPOONACULAR}`)
            }
            setFirst(false)

        } else {
            /*Call the function*/
            getData()
        }

        return function cleanup() {
            source.cancel()
            abortTranslation()
        }
    }, [first, recipeId])

    /*When changing language, no api call has to be made but the original data is restored.*/
    useEffect(() => {
        let isMounted = true
        if (!first && isMounted) {
            setData(originalData)
        }
        return function cleanup() {
            isMounted = false
        }
    }, [language])

    /*Return*/
    return (<Container width='large'>
            {/*If no data could be fetched*/}
            {!error ? <>

                {/*If no recipe can be shown, dont show the buttons*/}
                {noRecipe ? '' : <>
                    {/*Refresh button only when search for recipe*/}
                    {refreshButton ?
                        <Button
                            onClick={
                                () => {

                                    setOffset(offset + 1)
                                    setFirst(true)
                                }}
                            styling='refresh'
                        >
                            {text.refresh}
                        </Button> : ''}

                    {/*Button for printing*/}
                    <Button
                        onClick={
                            () => {
                                print('recipe');
                            }}
                        styling='print'
                    >
                        <PrintLogo/>
                    </Button>
                </>}

                {/*After data is fetched*/}
                {isLoaded ?
                    <article className={styles.container__article}>

                        {/*Image + persons*/}
                        <aside className={styles.container__article__items}>
                            <img src={data.image} alt={data.title} className={styles.container__article__items__image}/>
                            <div className={styles.container__article__items__persons}>
                                <p>{text.persons}</p>
                                <Button type='button' styling='persons' disabled={persons === 1} onClick={() => {
                                    setPersons(persons - 1)
                                }}>
                                    <AiOutlineMinusCircle
                                        className={`${styles['container__article__items__persons__button-image']} ${styles[visualMode]}`}
                                    />
                                </Button>
                                <p>{persons}</p>
                                <Button type='button' styling='persons' onClick={() => {
                                    setPersons(persons + 1)
                                }}>

                                    <AiOutlinePlusCircle
                                        className={`${styles['container__article__items__persons__button-image']} ${styles[visualMode]}`}
                                    />
                                </Button>
                            </div>
                        </aside>

                        {/*Title + summary*/}
                        <aside className={`${styles.container__article__items} recipe`}>
                            <Title styling='recipe'>
                                {data.title}
                            </Title>
                            <p className={`${styles.container__article__items__summary} ${styles[visualMode]}`}>
                                {parse(data.summary)}
                            </p>
                            <p className={styles['container__article__items__time-text']}> <AiOutlineFieldTime className={styles['container__article__items__time-icon']}/> {` ${data.readyInMinutes} ${text.minutes}`}</p>
                        </aside>

                        {/*Ingredients*/}
                        <aside className={`${styles.container__article__items} recipe`}>
                            <Container width='large' background='recipe'>
                                <Title styling='recipe'>
                                    {text.ingredients}
                                </Title>
                                <ul className={styles.container__article__items__ingredients}>
                                    {data.extendedIngredients.length !== 0
                                        ? data.extendedIngredients.map((ingredients) => {
                                            return <li
                                                key={`${data.id}-${ingredients.id}-${ingredients.measures.metric.amount}-${ingredients.measures.metric.unitShort}`}>{`${ingredients.name} - ${Math.round(ingredients.measures.metric.amount * 10 * (persons / data.servings)) / 10} ${ingredients.measures.metric.unitShort} `}</li>
                                            })
                                        : text.noIngredients}
                                </ul>
                            </Container>
                        </aside>

                        {/*Instructions*/}
                        <aside className={`${styles.container__article__items} recipe`}>
                            <Title styling='recipe'>
                                {text.instructions}
                            </Title>
                            <ol>
                                {data.analyzedInstructions.length !== 0
                                    ? data.analyzedInstructions[0].steps.map((instructions) => {
                                        return <li
                                            key={`${data.id}-${offset}-${instructions.number}`}>{instructions.step}</li>
                                        })
                                    : text.noInstructions}
                            </ol>
                        </aside>

                        {/*Nutrients*/}
                        <footer className={styles.container__article__footer}>
                            <div className={`${styles.container__article__footer__line} ${styles[visualMode]}`}/>
                            <Title styling='recipe'>{text.nutrients}</Title>
                            {data.nutrition.nutrients.length !== 0
                                ? data.nutrition.nutrients.map((nutrient) => {
                                    return (
                                        <p key={`${data.id}-${nutrient.name}-${nutrient.amount}`}
                                           className={styles.container__article__footer__items}>
                                            {`${nutrient.name}: ${nutrient.amount} ${nutrient.unit} (${nutrient.percentOfDailyNeeds}%)*`}
                                        </p>)
                                    })
                                : text.noNutrients}
                            <p className={`${styles.container__article__footer__items} ${styles.container__article__footer__daily}`}>*{text.daily}</p>
                        </footer>
                    </article>
                    /*Otherwise its loading or no recipe could be shown*/
                    : <Title styling='recipe'>{noRecipe ? text.noRecipe : text.loading}</Title>}
            </> : <Title styling='recipe'>{text.noRecipe}</Title>}
        </Container>
    );
}

export default RecipePage;
