/*Import from dependencies*/
import {useForm} from "react-hook-form";
import {NavLink, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from 'axios';

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/
import searchButton from '../../assets/icons/search-button.svg'

/*Import components*/
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Input from "../../components/form/Input/Input";
import Title from "../../components/title/Title";

/*Import helpers*/
import useLanguageChooser from "../../helpers/useLanguageChooser";
import {spaceToUnderscore} from "../../helpers/spaceToUnderscore";

/*Import style*/
import styles from './HomePage.module.scss'

/*Import images*/
import background from '../../assets/background/background.jpg'

/*Import data*/
import TEMPdata from '../../TEMPdata/data.json'





function HomePage({}) {
    /*State*/
    const [endpoint, setEndpoint] = useState('https://api.spoonacular.com/recipes/random?apiKey=6cd3b6f079684676885686cd69de1adb&number=6')
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    /*Imports*/
    const {handleSubmit, formState: {errors}, register} = useForm();
    const history = useHistory();

    /*Variables*/

    /*Function*/
    const search = (data) => {
        console.log(data)
        history.push(`/recipes/${spaceToUnderscore(data.search)}`)
    }

    /*Context*/
    const {visualMode} = useContext(VisualContext)

    /*Life cylce*/

    useEffect(() => {
        const source = axios.CancelToken.source();
        async function getData() {
            try {
                const data = await axios.get(endpoint)
                setData(data.data)
                setIsLoaded(true)
                console.log(data)
            } catch (e) {
                console.error('Recepten ophalen mislukt')
            }
        }

        /*getData()*/
        setIsLoaded(true)

        return function cleanup() {
            source.cancel()
        }

    }, [])

    /*TEMPORARY*/

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
                        placeholder={useLanguageChooser('Voer ingrediënten in', 'Search ingredients')}
                        required={true}
                        register={register}
                        condition=''
                        error={errors}
                        label=''
                        message=''
                        name='search'
                        validate=''
                        value=''
                    />
                    <Button type='submit' styling='search'>
                        <img src={searchButton} alt='search-button' className={styles.searchbar__button}/>
                    </Button>
                </form>
            </Container>
            <div className={styles['container-recipes']}>
                {!isLoaded ?
                    <p>Laden...</p> :
                    TEMPdata.recipes.map((data) => {
                        return (
                            <NavLink key={data.id} className={styles['container-recipes__container']}
                                     to={`/recipes/${data.id}`}>
                                <img src={data.image} alt='recipe'
                                     className={`${styles['container-recipes__container__image']} ${styles[visualMode]}`}/>
                                <Title styling='homepage'>
                                    {data.title}
                                </Title>
                            </NavLink> )
                    })}


            </div>

        </>
    );
}

export default HomePage;
