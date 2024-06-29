const inputs = document.getElementsByClassName('input');
const groups = document.getElementsByClassName('group');
const titles = document.getElementsByClassName('title');
const errors = document.getElementsByClassName('error');
const radios = document.getElementsByName('type');
const sumbit = document.getElementById('submit');
const clear = document.getElementById('clear');
const emptyResult = document.querySelector('.empty-res');
const totalResult = document.querySelector('.total-res');

sumbit.addEventListener('click', (e) => {
    e.preventDefault();
    checkErrors();
    checkRadios();
    Array.from(inputs).forEach(input => {
        if(input.value == '') {
            emptyResult.style.display = 'flex';
            totalResult.style.display = 'none';

        } else {
            emptyResult.style.display = 'none';
            totalResult.style.display = 'flex';
        }
    })

})

function focusInput () {
    Array.from(inputs).forEach((input,index)=> {
        input.addEventListener('focus', ()=> {
            titles[index].style.backgroundColor = 'hsl(61, 70%, 52%)';
            groups[index].style.borderColor = 'hsl(61, 70%, 52%)';
        })
    })
}

focusInput();

function focusOutInput() {
    Array.from(inputs).forEach((input,index)=> {
        input.addEventListener('focusout', ()=> {
            titles[index].style.backgroundColor = 'hsl(202, 86%, 94%)';
            groups[index].style.borderColor = 'hsl(200, 26%, 54%)';
        })
    })
}

focusOutInput();

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

const inputGroups = document.querySelectorAll('.input-group');
function changeColor() {
    const radioButtons = document.querySelectorAll('input[name="type"]');

    radioButtons.forEach(function (radio) {
        radio.addEventListener('change', function () {

            inputGroups.forEach(function (group) {
                group.classList.remove('selected');
            });

            if (this.checked) {
                this.parentElement.classList.add('selected');
                this.parentElement.style.borderColor = 'hsl(61, 70%, 52%)'
            }
        });
    });
}

changeColor();

clear.addEventListener('click', ()=> {
    Array.from(inputs).forEach(input => {
        if (input.value !== '') {
            input.value = '';
        } 
    })

    Array.from(radios).forEach((radio, index) => {
        if (radio.checked == true) {
            // console.log('check');
            radio.checked = false;
            inputGroups[index].style.backgroundColor = 'hsl(0, 0%, 100%)';
            inputGroups[index].style.borderColor = 'hsl(200, 26%, 54%)';
        }
    })
})