/*Dependencies*/
import React from "react";
import {useHistory} from "react-router-dom";

/*Context*/

/*Constants*/
import Text from '../../constants/Text';

/*Components*/
import Background from "../../components/background/Background";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";

/*Styles*/

/*Helpers*/

/*Pages*/





function NotFoundPage() {
    /*Text*/
    const text = new Text()

    /*Hooks*/
    const history = useHistory()

    return (<>
        <Background image='None' styling=' '>
        </Background>
        <Title styling='not-found'> {text.notFound}
            <Button onClick={() => history.push('/')}> {text.returnHome} </Button>
        </Title>

    </>)
}

export default NotFoundPage;
