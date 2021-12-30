/*Import from dependencies*/
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import parse from 'html-react-parser';

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/
import add from '../../assets/icons/add.svg'
import minus from '../../assets/icons/minus.png'
import printer from '../../assets/icons/print.svg'

/*Import components*/
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";

/*Import helpers*/
import {underscoreToEndpoint} from "../../helpers/underscoreToEndpoint";
import useLanguageChooser from "../../helpers/useLanguageChooser";
import print from "../../helpers/print";


/*Import style*/
import styles from './RecipePage.module.scss'

/*IMPORT TEMP!!!*/
import TEMPdata from '../../TEMPdata/data2.json'




function RecipePage({}) {
    /*Variables*/
    const personsText = useLanguageChooser('Personen', 'Servings')
    const nutrientsText = useLanguageChooser('Voedingswaarden', 'Nutrients')
    const dailyText = useLanguageChooser('Van dagelijkse behoefte', 'Of daily need')
    const ingredientsText = useLanguageChooser('Ingrediënten', 'Ingredients')
    const instructionsText = useLanguageChooser('Bereidingswijze', 'Instructions')

    /*React variables*/
    const {id} = useParams();
    const [data, setData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [apiKey, setApiKey] = useState('6cd3b6f079684676885686cd69de1adb')
    const [endpoint, setEndpoint] = useState('')
    const [first, setFirst] = useState(true)
    const [persons, setPersons] = useState(4)
    const [refreshButton, setRefreshButton] = useState(false)
    const [offset, setOffset] = useState(0)

    const {visualMode} = useContext(VisualContext)

    /*Life cycle*/
    useEffect(( ) => {
        const source = axios.CancelToken.source();

        async function getData() {
            console.log(endpoint)

            /*HIER NOG NAAR KIJKEN!!!*/
            try {
                const result = await axios.get(endpoint)
                if (isNaN(id)) {
                    setData(result.data.results[0])
                    setPersons(result.data.results[0].servings)
                    console.log(result.data.results[0].servings)
                } else {
                    setData(result.data)
                    setPersons(result.data.servings)
                }
                setIsLoaded(true)
            } catch (e) {
                console.error('Recept ophalen mislukt')
            }
        }

        /*If number, then user clicked on recipe on homepage*/
        if (first) {
            if (isNaN(id)) {
                const ingredients = underscoreToEndpoint(id)
                setEndpoint(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${ingredients}&number=1&addRecipeNutrition=true&offset=${offset}&apiKey=${apiKey}`)
                setRefreshButton(true)
            } else {
                setEndpoint(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`)
            }
            setFirst(false)
        } else {
            /*Call the function*/
            /*getData()*/
        }


        /*REMOVE PLS*/
        setPersons(TEMPdata.servings)
        setIsLoaded(true)

        /*UNTIL HERE*/

        return function cleanup() {
            source.cancel()
        }
    }, [first])

    /*Return*/
    return (<Container background='normal' width='large'>

            {/*Refresh button only when search for recipe*/}
            {refreshButton ?
                <Button
                    onClick={
                        () => {
                            setOffset(offset+1)
                            setFirst(true)
                        }}
                    styling='refresh'
                >
                    Refresh
                </Button> : ''}

            {/*Button for printing*/}
            <Button
                onClick={
                    () => {
                        print('recipe');
                    }}
                styling='print'
            >
                <img className={styles.print__logo} src={printer} alt='recipe'/>
            </Button>

            {/*After data is fetched*/}
            {isLoaded ?
            <article className={styles.container__article}>

                {/*Image + persons*/}
                <aside className={styles.container__article__items}>
                    <img src={TEMPdata.image} alt={TEMPdata.title} className={styles.container__article__items__image}/>
                    <div className={styles.container__article__items__persons}>
                        <p>{personsText}</p>
                        <Button type='button' styling='persons' disabled={persons === 1} onClick={() => {
                            setPersons(persons - 1)
                        }}>
                            <img
                                className={`${styles['container__article__items__persons__button-image']} ${styles[visualMode]}`}
                                src={minus} alt='minus'/>
                        </Button>
                        <p>{persons}</p>
                        <Button type='button' styling='persons' onClick={() => {
                            setPersons(persons + 1)
                        }}>
                            <img
                                className={`${styles['container__article__items__persons__button-image']} ${styles[visualMode]}`}
                                src={add} alt='minus'/>
                        </Button>
                    </div>
                </aside>

                {/*Title + summary*/}
                <aside className={`${styles.container__article__items} recipe`}>
                    <Title styling='recipe'>
                        {TEMPdata.title}
                    </Title>
                    <p className={`${styles.container__article__items__summary} ${styles[visualMode]}`}>
                        {parse(TEMPdata.summary)}

                    </p>
                </aside>

                {/*Ingredients*/}
                <aside className={`${styles.container__article__items} recipe`}>
                    <Container background='recipe' width='large'>
                        <Title styling='recipe'>
                            {ingredientsText}
                        </Title>
                        <ol className={styles.container__article__items__ingredients}>
                            {TEMPdata.extendedIngredients.map((ingredients) => {
                                return <li key={ingredients.id}>{`${ingredients.name} - ${Math.round(ingredients.measures.metric.amount *10*(persons/TEMPdata.servings))/10} ${ingredients.measures.metric.unitShort} `}</li>
                            })}
                        </ol>
                    </Container>
                </aside>

                {/*Instructions*/}
                <aside className={`${styles.container__article__items} recipe`}>
                    <Title styling='recipe'>
                        {instructionsText}
                    </Title>
                    <ol>
                        {TEMPdata.analyzedInstructions[0].steps.map((instructions) => {
                            return <li key={instructions.number}>{instructions.step}</li>
                        })}
                    </ol>
                </aside>

                {/*Nutrients*/}
                <footer className={styles.container__article__footer}>
                    <div className={`${styles.container__article__footer__line} ${styles[visualMode]}`}/>
                    <Title styling='recipe'>{nutrientsText}</Title>
                    {TEMPdata.nutrition.nutrients.map((nutrient) => {
                        return (
                            <p key={nutrient.name} className={styles.container__article__footer__items}>
                                {`${nutrient.name}: ${nutrient.amount} ${nutrient.unit} (${nutrient.percentOfDailyNeeds}%)*`}
                            </p>)
                    })}
                    <p className={`${styles.container__article__footer__items} ${styles.container__article__footer__daily}`}>*{dailyText}</p>
                </footer>
            </article>
            : <Title styling='recipe'>Laden....</Title>}</Container>
    );
}

export default RecipePage;
