/*Import from dependencies*/
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";
import {LanguageContext} from '../../context/LanguageContext';

/*Import assets*/

/*Import components*/
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import useLanguageChooser from "../../helpers/useLanguageChooser";
import Input from "../../components/form/Input/Input";
import Button from "../../components/button/Button";

/*Import helpers*/
import print from "../../helpers/print";
import getInputValue from "../../helpers/getInputValue";

/*Import style*/
import styles from './GroceryListPage.module.scss'
import background from "../../assets/background/background.jpg";
import printer from "../../assets/icons/print.svg";


import TEMPdata from "../../TEMPdata/data2.json";
import {logDOM} from "@testing-library/react";


function GroceryListPage({}) {
    const {visualMode} = useContext(VisualContext)
    const {language} = useContext(LanguageContext)

    const { handleSubmit, formState: {errors}, register } = useForm();

    /*States*/
    const [rows, setRows] = useState([]);
    const [numberOfInputs, setNumberOfInputs] = useState(4)

    /*Variables*/


    useEffect(() => {
        /*Create empty array*/
        let array = []
        for (let i=0; i < numberOfInputs; i++) {
            array.push(
                {
                    'value': '',
                    'key' : i
                })
        }
        setRows(array)
    }, [numberOfInputs])



    /*Return*/
    return (
        <>
            <Container width='small' background='normal'>
                <Button
                    onClick={
                        () => {
                            print('grocery');
                        }}
                    styling='print'
                >
                    <img className={styles.print__logo} src={printer} alt='print'/>
                </Button>

                <Title styling=''>{useLanguageChooser('Boodschappenlijst', 'Grocery list')}</Title>
                {rows.map(
                    (row) => {
                        console.log(row.key)

                        if (row.value === '') {
                        return (
                            <Input
                                key={row.key}
                                required=''
                                register={register}
                                message=''
                                value=''
                                error={errors}
                                label=''
                                name={`input${row.key}`}
                                condition='pattern'
                                styleType='grocery'
                                validate=''
                                placeholder='Product'
                                type='text'/>
                        )
                    } else {
                        return(
                            <Input
                                key={row.key}
                                required=''
                                register={register}
                                message=''
                                value=''
                                error={errors}
                                label=''
                                name={`input${row.key}`}
                                condition='pattern'
                                styleType='grocery'
                                validate=''
                                placeholder=''
                                type='text'
                                typedIn={row.value}/>
                            )

                    }

                    })}

                <Button
                    onClick={
                        () => {
                            setRows(getInputValue(rows))
                            setNumberOfInputs(numberOfInputs+1);
                        }}
                    styling='refresh'
                    type='submit'
                >
                    Extra rij
                </Button>

            </Container>
            <Background image={background} styling='image'/>

        </>
    );
}

export default GroceryListPage;
