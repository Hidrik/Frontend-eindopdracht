/*Import from dependencies*/
import {useEffect, useState} from "react";

import {initializeApp} from "firebase/app";
import {collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, setDoc} from "firebase/firestore";
import {useForm} from "react-hook-form";

/*Import context*/
/*Import assets*/
import background from "../../assets/background/background.jpg";
/*Import components*/
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import Helper from "../../components/helper/Helper";
import Input from "../../components/Input/Input";

/*Import helpers*/
import useLanguageChooser from "../../helpers/useLanguageChooser";

/*Import style*/
import styles from './FridgePage.module.scss'


async function addProduct(database) {
    const db = getFirestore();
    const product = document.getElementById('product').value
    const date = document.getElementById('date').value
    document.getElementById('product').value = ''
    try {
        await setDoc(doc(db, database, product), {product: product, date: date});
    } catch (e) {
        console.error(e)
    }
}

async function deleteProduct(database, product) {
    const db = getFirestore();
    await deleteDoc(doc(db, database, product));
}

function FridgePage() {
    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    const {formState: {errors}, register} = useForm();

    /*States*/
    const [productData, setProductData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const firebaseConfig = {
        apiKey: "AIzaSyCmS7_XlRzf61dmKnk_ozxAlgRfhX4I4cc",
        authDomain: "noviapplication-a51e7.firebaseapp.com",
        projectId: "noviapplication-a51e7",
        storageBucket: "noviapplication-a51e7.appspot.com",
        messagingSenderId: "28659676301",
        appId: "1:28659676301:web:3912ddbaec22d23e961ec4"
    };

    initializeApp(firebaseConfig);
    const db = getFirestore();

    useEffect(() => {


        async function getProduct(database) {
            let dataArray = []
            const q = query(collection(db, database), orderBy("date", "asc"));
            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    dataArray.push(doc.data())
                });
                setProductData(dataArray)
                setIsLoaded(true)
            } catch (e) {
                console.error(e)
            }
        }

        getProduct('fridge')
    }, [isLoaded])

    /*Return*/
    return (
        <>
            <Container width='small' background='normal'>
                <Title styling=''>{useLanguageChooser('Koelkast', 'Fridge')}</Title>
                {isLoaded ?

                    productData.map(
                        (data) => {
                            return (
                                <div key={`${data.product}-${data.date}`} className={styles['input-container']}>
                                    <Input
                                        key={`${data.product}-${data.date}`}
                                        register={register}
                                        error={errors}
                                        name={`input${data.product}`}
                                        condition='pattern'
                                        styleType={new Date(date) <= new Date(data.date) ? 'product-good' : 'product-expired'}
                                        type='text'
                                        typedIn={data.product}/>

                                    <Input
                                        key={`${data.date}-${data.product}`}
                                        register={register}
                                        error={errors}
                                        name={`input${data.date}`}
                                        condition='pattern'
                                        styleType={new Date(date) <= new Date(data.date) ? 'product-good' : 'product-expired'}
                                        type='text'
                                        typedIn={data.date}/>

                                    <Button
                                        onClick={
                                            () => {
                                                deleteProduct('fridge', data.product)
                                                setIsLoaded(false)
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
                <div className={styles['input-container']}>
                    <Input
                        register={register}
                        error={errors}
                        name='emptyProduct'
                        condition='pattern'
                        styleType='product'
                        placeholder='product'
                        type='text'
                        id='product'/>

                    <Input
                        register={register}
                        error={errors}
                        name='emptyDate'
                        condition='pattern'
                        styleType='product'
                        type='date'
                        id='date'/>

                    <Button
                        onClick={
                            () => {
                                addProduct('fridge')
                                setIsLoaded(false)
                            }}
                        styling='add-database'
                        type='button'
                    >
                        +
                    </Button>
                </div>
                {/*Extra row button*/}
                <Helper>

                </Helper>
            </Container>
            <Background image={background} styling='image'/>

        </>
    );
}

export default FridgePage;
