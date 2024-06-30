const inputGroups = document.querySelectorAll('.input-group');
const inputs = document.getElementsByClassName('input');
const groups = document.getElementsByClassName('group');
const titles = document.getElementsByClassName('title');
const errors = document.getElementsByClassName('error');
const radios = document.getElementsByName('type');
const sumbit = document.getElementById('submit');
const clear = document.getElementById('clear');
const emptyResult = document.querySelector('.empty-res');
const totalResult = document.querySelector('.total-res');
let displayTotal = document.getElementById('total');
let displayMonthly = document.getElementById('monthly');
let payMonthly = document.getElementById('pay-month');
let payTotal = document.getElementById('pay-total')

//clear all selections onclick
clear.addEventListener('click', () => {
    Array.from(inputs).forEach(input => {
        if (input.value !== '') {
            input.value = '';
        }
    })

    Array.from(radios).forEach((radio, index) => {
        if (radio.checked == true) {
            // console.log('check');
            radio.checked = false;
            inputGroups[index].classList.remove('selected');
            inputGroups[index].style.borderColor = 'hsl(200, 26%, 54%)';
        }
    })
})

//event listener for submit button
sumbit.addEventListener('click', (e) => {
    e.preventDefault();
    checkErrors();
    checkRadios();
    checkInputsAndRadios();
})

//check if form is empty or not
function checkInputsAndRadios() {
    const allInputsFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    const anyRadioChecked = Array.from(radios).some(radio => radio.checked);

    totalResult.style.display = (allInputsFilled && anyRadioChecked) ? 'flex' : 'none';
    emptyResult.style.display = (allInputsFilled && anyRadioChecked) ? 'none' : 'flex';

    if (allInputsFilled && anyRadioChecked) {
        calculateMortage();
    }
}

//onfocus for input
function focusInput() {
    Array.from(inputs).forEach((input, index) => {
        input.addEventListener('focus', () => {
            titles[index].style.backgroundColor = 'hsl(61, 70%, 52%)';
            titles[index].style.color = 'hsl(202, 55%, 16%)';
            groups[index].style.borderColor = 'hsl(61, 70%, 52%)';
        })
    })
}

focusInput();

//onfocusout for input
function focusOutInput() {
    Array.from(inputs).forEach((input, index) => {
        input.addEventListener('focusout', () => {
            titles[index].style.backgroundColor = 'hsl(202, 86%, 94%)';
            titles[index].style.color = 'hsl(200, 24%, 40%)';
            groups[index].style.borderColor = 'hsl(200, 26%, 54%)';
        })
    })
}

focusOutInput();

//onmouseover for input
function inputHover() {
    Array.from(inputs).forEach((input, index) => {
        input.addEventListener('mouseover', () => {
            groups[index].style.borderColor = 'hsl(202, 55%, 16%)';
        })
    })
}

inputHover();

//onmouseout for input
function inputHoverOut() {
    Array.from(inputs).forEach((input, index) => {
        input.addEventListener('mouseout', () => {
            groups[index].style.borderColor = 'hsl(200, 26%, 54%)'
        })
    })
}

inputHoverOut();

//to check input error
function checkErrors() {
    Array.from(inputs).forEach((input, index) => {
        if (input.value === '') {
            errors[index].style.display = 'block';
            groups[index].style.borderColor = 'hsl(4, 69%, 50%)';
            titles[index].style.backgroundColor = 'hsl(4, 69%, 50%)';
            titles[index].style.color = 'hsl(0, 0%, 100%)';
        } else {
            errors[index].style.display = 'none';
            groups[index].style.borderColor = 'hsl(200, 26%, 54%)';
            titles[index].style.backgroundColor = 'hsl(202, 86%, 94%)';
            titles[index].style.color = 'hsl(200, 24%, 40%)';
        }
    })
}

//for radio buttons
function checkRadios() {
    const radioError = document.querySelector('.radio-error');
    const radioName = document.getElementsByName('type');
    let isChecked = false;

    for (let i = 0; i < radioName.length; i++) {
        if (radioName[i].checked) {
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        radioError.classList.remove('hidden');

    } else {
        radioError.classList.add('hidden');
    }
}

//change color on selection of radio button
function changeColor() {
    const radioButtons = document.querySelectorAll('input[name="type"]');

    radioButtons.forEach(function (radio) {
        radio.addEventListener('change', function () {

            inputGroups.forEach(function (group) {
                group.classList.remove('selected');
                group.style.borderColor = 'hsl(200, 26%, 54%)';
            });

            if (this.checked) {
                this.parentElement.classList.add('selected');
                this.parentElement.style.borderColor = 'hsl(61, 70%, 52%)'
            }
        });
    });
}

changeColor();


//calculate mortage
function calculateMortage() {
    const amt = document.getElementById('amt');
    const term = document.getElementById('term');
    const rate = document.getElementById('rate');
    const amount = amt.value.split(',').join('')

    Array.from(radios).forEach(radio => {
        if (radio.value == 'interest' && radio.checked) {
            let monthRate = ((rate.value / 12) / 100);
            let monthInterest = amount * monthRate;
            let decimalInterest = monthInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            payMonthly.innerText = 'Your monthly interest';
            displayMonthly.innerHTML = `&pound;${decimalInterest}`;

            let totalTerm = term.value * 12;
            let x = 1 + monthRate;
            let y = Math.pow(x, totalTerm);
            let monthMortage = amount * ((monthRate * y) / (y - 1));
            let totalRepay = monthMortage * totalTerm;
            let totalInterest = totalRepay - amount;
            let interestRepay = totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

            payTotal.innerText = 'Total interest you\'ll pay over the term';
            displayTotal.innerHTML = `&pound;${interestRepay}`;

        } else {
            let monthRate = ((rate.value / 12) / 100);
            let totalTerm = term.value * 12;
            let x = 1 + monthRate;
            let y = Math.pow(x, totalTerm);
            let monthMortage = amount * ((monthRate * y) / (y - 1));
            let monthlyDecimal = monthMortage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            payMonthly.innerText = 'Your monthly repayments';
            displayMonthly.innerHTML = `&pound;${monthlyDecimal}`;

            let totalRepay = monthMortage * totalTerm;
            let decimalRepay = totalRepay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            payTotal.innerText = 'Total you\'ll repay over the term'
            displayTotal.innerHTML = `&pound;${decimalRepay}`;
        }
    })

}

//add commas on input
function updateTextView(_obj) {
    var num = getNumber(_obj.value);
    if (num == 0) {
        _obj.value = '';
    } else {
        _obj.value = num.toLocaleString();
    }
}

//create array of numeric values
function getNumber(_str) {
    var arr = _str.split('');
    var out = [];
    for (var cnt = 0; cnt < arr.length; cnt++) {
        if (!isNaN(arr[cnt]) && arr[cnt] !== ' ') {
            out.push(arr[cnt]);
        }
    }
    return Number(out.join(''));
}