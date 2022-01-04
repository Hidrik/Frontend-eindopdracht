/*Import from dependencies*/
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";

/*Import context*/
import {VisualContext} from "../../context/VisualContext";

/*Import assets*/
import background from "../../assets/background/background.jpg";
import printer from "../../assets/icons/print.svg";

/*Import components*/
import Background from "../../components/background/Background";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import Helper from "../../components/helper/Helper";

/*Import helpers*/
import print from "../../helpers/print";
import getInputValue from "../../helpers/getInputValue";
import useLanguageChooser from "../../helpers/useLanguageChooser";

/*Import style*/
import styles from './GroceryListPage.module.scss'





function GroceryListPage() {

    const { formState: {errors}, register } = useForm();

    /*States*/
    const [rows, setRows] = useState([]);
    const [numberOfInputs, setNumberOfInputs] = useState(4)

    /*Context*/
    const {visualMode} = useContext(VisualContext)

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
                {/*Print button*/}
                <Button
                    onClick={
                        () => {
                            print('grocery');
                        }}
                    styling='print-small'
                >
                    <img className={`${styles.print__logo} ${styles[visualMode]}`} src={printer} alt='print'/>
                </Button>

                <Title styling=''>{useLanguageChooser('Boodschappenlijst', 'Grocery list')}</Title>
                {rows.map(
                    (row) => {

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
                {/*Extra row button*/}
                <Button
                    onClick={
                        () => {
                            setRows(getInputValue(rows, 'grocery'))
                            setNumberOfInputs(numberOfInputs+1);
                        }}
                    styling='add-row'
                    type='button'
                >
                    +
                </Button>
                <Helper>

                </Helper>
            </Container>
            <Background image={background} styling='image'/>

        </>
    );
}

export default GroceryListPage;
