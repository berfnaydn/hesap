(function() {
            'use strict'

            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style')
                msViewportStyle.appendChild(
                    document.createTextNode(
                        '@-ms-viewport{width:auto!important}'
                    )
                )
                document.head.appendChild(msViewportStyle)
            }

        }())
		document.addEventListener("DOMContentLoaded", function() {

    const $QSA = (elem) => document.querySelectorAll(elem),
          $ID = (elem) => document.getElementById(elem);

   
    let input = [],
        result,
        evalResult;

    const sanitizeInput = () => {
        result = input.reduce((a, b) => a + b); 
        result.replace(/[^-()\d/*+.]/g, "");
        $ID("resultSmall").innerHTML = $ID("result").innerHTML = result; 
    };

    const getInput = function(key) {
        event.type === 'keydown'
        ? input.push(key)
        : input.push(this.getAttribute("data-value")); 
        sanitizeInput();
    }
    Array.from($QSA("button.calc")).forEach(item => item.addEventListener("click", getInput));

    const calculate = () => {
        if(input.length == 0) {
            result = 0;
        }
        evalResult = eval(result);
        
        $ID("resultSmall").innerHTML = result + " = " + evalResult;
        $ID("result").innerHTML = evalResult;
    }
    $ID("calculate").addEventListener("click", calculate);


    const clearLastEntry = () => {
        input.pop();
        input.length >= 1 ? sanitizeInput() : $ID("resultSmall").innerHTML = $ID("result").innerHTML = 0
    }
    $ID("clearentry").addEventListener("click", clearLastEntry);


    const clearAllEntry = () => {
        input = [];
        $ID("resultSmall").innerHTML = $ID("result").innerHTML = 0;
    }
    $ID("allclear").addEventListener("click", clearAllEntry);

 
    const highlightButton = (btnData) => {
        let res = Array.from($QSA('button')).filter(btn => {
            return btn.getAttribute('data-value') === btnData;
        });

        if(res.length > 0) {
            res = res[0];
            res.classList.add('keypressed');

            setTimeout(() => {
                res.classList.remove('keypressed');
            }, 300);
        }
    }

    
    (function init_keypress() {
        document.body.onkeydown = event => {
            const key_number = /\d/g;
            const key_operator = /(\+|-|\*|\/)/g;
            const key_calculate = "Enter";
            const key_clearEntry = "Backspace";
            const key_clearAllEntry = "Delete";
            let key = event.key.toString();

            if(key_number.test(key)) {
                getInput(key);
            }
            else if (key_operator.test(key)) {
                getInput(key);
            }
            else if (key_calculate === key) {
                calculate();
            }
            else if (key_clearEntry === key) {
                clearLastEntry();
            }
            else if (key_clearAllEntry === key) {
                clearAllEntry();
            }

            highlightButton(key);
        }

    })();

});