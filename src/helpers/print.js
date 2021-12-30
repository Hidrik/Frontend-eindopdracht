export default function print(className) {
    const prtContent = document.getElementsByClassName(className);
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    /**/
    if (className === 'recipe') {
        for (let i = 0; i<prtContent.length; i++) {
            WinPrint.document.write(prtContent[i].innerHTML);
        }
    } else if (className === 'grocery') {
        WinPrint.document.write('<ul style="list-style-type:circle; font-size:25px;">')
        for (let i = 0; i < prtContent.length; i++) {
            if (prtContent[i].value != ''){
                WinPrint.document.write(`<li>${prtContent[i].value}</li>`)
            }
        }
        WinPrint.document.write('</ul>')
    }

    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
}