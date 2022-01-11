/*Import from dependencies*/
import {useContext, useEffect, useState} from "react";

import {initializeApp} from "firebase/app";
import {collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, addDoc} from "firebase/firestore";
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


/*Functions*/
async function addProduct(database, data, reset) {
    let db = getFirestore();
    console.log(data)
    try {
        await addDoc(collection(db, database), {product: data.product, date: data.date});
    } catch (e) {
        console.error(e)
    }
    reset()
}

async function deleteProduct(database, product) {
    const db = getFirestore();
    await deleteDoc(doc(db, database, product));
}


/*Main page function*/
function FridgePage() {
    /*Text*/
    const text = new TEXT()

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - ${text.fridge}`)

    /*Variables*/

    /*Dates*/

    const today = new Date()
    const offset = 2
    const redDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const yellowDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()+offset}`

    /*Imports from dependencies*/
    const {handleSubmit, formState: {errors}, register, reset} = useForm();

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

    /*Life cycle method*/
    useEffect(() => {
        let isMounted = true
        setError(false)

        /*Get from API call function*/
        async function getProduct(database) {
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
        getProduct(user.username).then(() => {
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
                    productData.map(
                        (data) => {
                            return (
                                <div key={`${data.product}-${data.date}`} className={styles['input-container']}>
                                    <Input
                                        key={`${data.product}-${data.date}`}
                                        styleType={new Date(yellowDate) <= new Date(data.date) ? 'product-good' : new Date(redDate) <= new Date(data.date)? 'product-almost-expired' : 'product-expired'}
                                        type='text'
                                        typedIn={data.product}/>

                                    <Input
                                        key={`${data.date}-${data.product}`}
                                        styleType={new Date(yellowDate) <= new Date(data.date) ? 'product-good' : new Date(redDate) <= new Date(data.date)? 'product-almost-expired' : 'product-expired'}
                                        type='text'
                                        typedIn={data.date}/>

                                    <Button
                                        onClick={
                                            () => {
                                                deleteProduct(user.username, data.product).then(() => {
                                                        setIsLoaded(false)
                                                }
                                                )
                                            }}
                                        styling='remove-row'
                                        type='button'
                                    >
                                        remove
                                    </Button>
                                </div>
                            )
                        })
                    : 'Laden...'}
                <form className={styles['input-container']} onSubmit={handleSubmit(
                    (data) => {
                        addProduct(user.username, data, reset).then(() => {
                            setIsLoaded(false)
                        })
                    })}>
                    <Input
                        styleType='product'
                        placeholder='product'
                        type='text'
                        required={text.required}
                        register={register}
                        error={errors}
                        name='product'/>

                    <Input
                        styleType='product'
                        type='date'
                        register={register}
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
