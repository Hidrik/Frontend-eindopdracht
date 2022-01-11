import axios from "axios";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "westeurope";

const source = axios.CancelToken.source();

export default async function translate(text, from, to) {
    let result = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.REACT_APP_API_KEY_TRANSLATE,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json'
        },
        params: {
            'api-version': '3.0',
            'from': from,
            'to': [to]
        },
        data: [{
            'text': text
        }],
        responseType: 'json'
    })

    return result.data[0].translations[0].text
}

export function abortTranslation() {
    source.cancel()
}