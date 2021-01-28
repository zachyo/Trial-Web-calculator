let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let screen = document.querySelector(".screen");

document.querySelector(".calc-buttons").addEventListener('click', function(event) {
    // console.log('here')
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    rerender();
}


function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer+=value;
    }
}

function handleSymbol(value) {
    switch(value) {
        case "C" :
            buffer = '0';
            previousOperator = null;
            runningTotal = 0;
            break;
       case "=" :
           if (previousOperator === null) {
               return;
           } else {
               flushOperation(parseFloat(buffer));
               buffer = '' + runningTotal;
               runningTotal = 0;
               break;
            }
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else buffer = buffer.substr(0, buffer.length-1);
            break;
        case ".":
            handleNumber(value);
            break;
        // case "+":
        // case "-":
        // case "×":
        // case "÷":
        default :
            handleMath(value);
            break;
    }

}

function rerender() {
    screen.innerText = buffer;
}

function handleMath(value) {
    let intBuffer = parseFloat(buffer);
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;


    buffer = '0'
}


function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if(previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else runningTotal /= intBuffer;


}