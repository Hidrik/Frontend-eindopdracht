export default function getInputValue(array, name) {
    const inputs = document.getElementsByClassName(name);
        for (let i = 0; i < array.length; i++) {
            array[i].value = inputs[i].value;
        }
        return array
    }
