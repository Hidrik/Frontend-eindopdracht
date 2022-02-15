/*Dependencies*/
import React from "react";
import {useHistory} from "react-router-dom";

/*Context*/

/*Constants*/
import TextClass from '../../constants/TextClass';

/*Components*/
import Background from "../../components/background/Background";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";

/*Styles*/

/*Helpers*/
import useDocumentTitle from "../../helpers/hooks/useDocumentTitle";

/*Pages*/


function NotFoundPage() {
    /*Text*/
    const text = new TextClass()

    /*Hooks*/
    const history = useHistory()
    useDocumentTitle(text.notFound)

    return (<>
        <Background image='None' styling=' '>
        </Background>
        <Title styling='not-found'> {text.notFound}
            <Button onClick={() => history.push('/')}> {text.returnHome} </Button>
        </Title>

    </>)
}

export default NotFoundPage;
