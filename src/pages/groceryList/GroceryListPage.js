/*Import from dependencies*/
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AiOutlinePlusCircle} from "react-icons/ai";

/*Import context*/

/*Import assets*/
import background from "../../assets/background/background.jpg";

/*Import constants*/
import TEXT from "../../constants/text";

/*Import components*/
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import Helper from "../../components/helper/Helper";
import PrintLogo from "../../components/printLogo/PrintLogo";

/*Import helpers*/
import print from "../../helpers/print";

/*Import style*/
import styles from './GroceryListPage.module.scss'
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";


function getInputValue(array, data) {
    console.log(data)
    for (let i = 0; i < array.length; i++) {
        array[i].value = data[`input${array[i].key}`];
    }
    return array
}


function GroceryListPage() {
    /*Text*/
    const text = new TEXT()

    /*Hooks*/
    useDocumentTitle(`${text.homepage} - ${text.grocery}`)

    /*Imports from dependencies*/
    const {handleSubmit, register} = useForm();

    /*States*/
    const [rows, setRows] = useState([]);
    const [numberOfInputs, setNumberOfInputs] = useState(4)

    /*Context*/

    /*Variables*/


    useEffect(() => {
        /*Create empty array*/
        let array = []
        for (let i = 0; i < numberOfInputs; i++) {
            array.push(
                {
                    'value': '',
                    'key': i
                })
        }
        setRows(array)
    }, [numberOfInputs])


    /*Return*/
    return (
        <>
            <Container width='small'>

                {/*Print button*/}
                <Button
                    onClick={
                        () => {
                            print('grocery');
                        }}
                    styling='print-small'
                >
                    <PrintLogo/>
                </Button>

                {/*Grocery list*/}
                <Title styling=''>{text.grocery}</Title>
                <form className={styles.form} onSubmit={handleSubmit((data) => {
                    getInputValue(rows, data)
                    setNumberOfInputs(numberOfInputs + 1)
                })}>
                    {/*Check if a value is defined, otherwise make empty boxes*/}
                    {rows.map(
                        (row) => {

                            if (row.value === '') {
                                return (
                                    <Input
                                        key={row.key}
                                        name={`input${row.key}`}
                                        styleType='grocery'
                                        placeholder='Product'
                                        type='text'
                                        register={register}/>
                                )
                            } else {
                                return (
                                    <Input
                                        key={row.key}
                                        name={`input${row.key}`}
                                        styleType='grocery'
                                        type='text'
                                        register={register}
                                        typedIn={row.value}/>
                                )
                            }

                        })}
                    {/*Extra row button*/}
                    <Button styling='add-row' type='submit'>
                        <AiOutlinePlusCircle/>
                    </Button>
                </form>

                {/*Page instructions/helper*/}
                <Helper>

                </Helper>
            </Container>
            <Background image={background} styling='image'/>

        </>
    );
}

export default GroceryListPage;
