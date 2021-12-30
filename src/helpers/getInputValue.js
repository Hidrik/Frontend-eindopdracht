export default function getInputValue(array) {
    const inputs = document.getElementsByClassName('grocery');
        for (let i = 0; i < array.length; i++) {
            array[i].value = inputs[i].value;
        }
        return array
    }
