/*Import from dependencies*/
import {useContext, useEffect, useState} from "react";

import {initializeApp} from "firebase/app";
import {collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, addDoc, setDoc} from "firebase/firestore";
import {useForm} from "react-hook-form";

/*Import context*/
import {AuthContext} from "../../context/AuthContext";

/*Import assets*/
import background from "../../assets/background/background.jpg";

/*Import constants*/
import TEXT from "../../constants/text";

/*Import components*/
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import Helper from "../../components/helper/Helper";
import Input from "../../components/Input/Input";

/*Import helpers*/


/*Import style*/
import styles from './FridgePage.module.scss'

/*Import data*/
import firebaseConfig from '../../data/firebaseData.json'
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";





/*Main page function*/
function FridgePage() {
    /*Text*/
    const text = new TEXT()

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - ${text.fridge}`)

    /*Variables*/

    /*Dates*/

    const today = new Date()
    const offset = 3
    const redDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const yellowDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()+offset}`

    /*Imports from dependencies*/
    const {handleSubmit: handleSubmitNewItem, formState: {errors}, register : registerNewItem, reset} = useForm();
    const {handleSubmit: handleSubmitSearch, register : registerSearch} = useForm();

    /*States*/
    const [productData, setProductData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(false)

    /*Context*/
    const {user} = useContext(AuthContext)

    /*Firebase app*/
    firebaseConfig.apiKey = process.env.REACT_APP_FIREBASE_API_KEY
    initializeApp(firebaseConfig);
    const db = getFirestore();

    /*Functions*/
    async function addProduct(database, data) {
        database = database.toString()
        try {
            await setDoc(doc(db, database, `${data.product}${data.date}`), {product: data.product, date: data.date});
        } catch (e) {
            console.error(e)
        }
        reset()
    }

    async function deleteProduct(database, product) {
        database = database.toString()
        await deleteDoc(doc(db, database, product));
    }

    /*Life cycle method*/
    /*Get data already in Firestore*/
    useEffect(() => {
        let isMounted = true
        setError(false)

        /*Get from API call function*/
        async function getProduct(database) {
            database = database.toString()
            let dataArray = []
            const q = query(collection(db, database), orderBy("date", "asc"));
            try {
                if (isMounted) {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        dataArray.push(doc.data())
                    })
                    setProductData(dataArray)
                }
            } catch (e) {
                setError(true)
                console.error(e)
            }
        }

        /*Call the get from API function*/
        getProduct(user.id).then(() => {
                setIsLoaded(true)
            }
        )

        return function cleanup() {
            isMounted = false
        }
    }, [isLoaded])

    /*Return*/
    return (
        <>
            <Container width='small'>
                <Title styling=''>{text.fridge}</Title>
                {/*If data cant be fetched*/}
                {error ? text.productError :
                /* While loading*/
                isLoaded ?
                    <form className={styles.form} onSubmit={handleSubmitSearch((data) => {
                        console.log(data)})}>
                        {productData.map(
                        (data) => {
                            return (
                                <div key={`${data.product}-${data.date}`} className={styles['input-container']}>
                                    <Input
                                        key={`${data.product}-${data.date}`}
                                        styleType={new Date(yellowDate) <= new Date(data.date) ? 'product-good' : new Date(redDate) <= new Date(data.date)? 'product-almost-expired' : 'product-expired'}
                                        type='text'
                                        typedIn={data.product}
                                        register={registerSearch}
                                        name={`${data.product}-product`}/>

                                    <Input
                                        key={`${data.date}-${data.product}`}
                                        styleType={new Date(yellowDate) <= new Date(data.date) ? 'product-good' : new Date(redDate) <= new Date(data.date)? 'product-almost-expired' : 'product-expired'}
                                        type='text'
                                        typedIn={data.date}
                                        register={registerSearch}
                                        name={`${data.product}-date`}/>

                                    <Button
                                        onClick={
                                            () => {
                                                deleteProduct(user.id, `${data.product}${data.date}`).then(() => {
                                                        setIsLoaded(false)
                                                }
                                                )
                                            }}
                                        styling='remove-row'
                                        type='button'
                                    >
                                        remove
                                    </Button>
                                    <Input
                                        type='checkbox'
                                        register={registerSearch}
                                        styleType='checkbox'
                                        name={`${data.product}-checkbox`}
                                    />
                                </div>
                            )
                        })}
                        <Button type='submit' styling='fridge-search'>{text.search}</Button>
                    </form>
                    : text.loading}
                <form className={styles['input-container']} onSubmit={handleSubmitNewItem(
                    (data) => {
                        addProduct(user.id, data).then(() => {
                            setIsLoaded(false)
                        })
                    })}>
                    <Input
                        styleType='product'
                        placeholder='product'
                        type='text'
                        required={text.required}
                        register={registerNewItem}
                        error={errors}
                        name='product'/>

                    <Input
                        styleType='product'
                        type='date'
                        register={registerNewItem}
                        error={errors}
                        name='date'/>

                    <Button
                        styling='add-database'
                        type='submit'
                    >
                        +
                    </Button>
                </form>
                {/*Extra row button*/}
                <Helper>

                </Helper>
            </Container>
            <Background image={background} styling='image'/>

        </>
    );
}

export default FridgePage;
