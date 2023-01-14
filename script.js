const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const specialsEl = document.getElementById('special')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
    special: getSpecialSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText
    if(!password) {
        return
    }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
    alert('Jelszó kimásolva a vágólapra!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    let hasLower = lowercaseEl.checked
    let hasUpper = uppercaseEl.checked
    let hasNumber = numbersEl.checked
    let hasSymbol = symbolsEl.checked
    let hasSpecial = specialsEl.checked


    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, hasSpecial, length)

})

function generatePassword(lower, upper, number, symbol, special, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol + special
    let typesArr = [{lower}, {upper}, {number}, {symbol}, {special}].filter(item => Object.values(item)[0]).sort(() => Math.random() - 0.5)

    if(typesCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i+=typesCount) {
        typesArr.forEach(type => {
            let funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    let finalPassword = generatedPassword.slice(0, length)

    return finalPassword

}

//Conditional strength bar generating...

let strengthPasswordBar = document.getElementById('meter')
let barValue = 0.8
strengthPasswordBar.setAttribute('value', barValue);

// function checkPasswordStrength(funcName) {
//     if (hasLower = false) {
//         return strengthPasswordBar.setAttribute('value', 0.5)
//     }
// }

// checkPasswordStrength();

let hasLowercase = generatePassword().some(function() {
    if (hasLower == true) {
    return barValue = 0.5;
    }

});


function imposeMinMax(el){
  if(el.value != ""){
    if(parseInt(el.value) < parseInt(el.min)){
      el.value = el.min;
    }
    if(parseInt(el.value) > parseInt(el.max)){
      el.value = el.max;
    }
  }
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()* 10) + 48)
}

function getRandomSymbol() {
    const symbols = "!@&%$%^#*(){}]=<>=,.\/|÷"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function getSpecialSymbol() {
    const specialChars = "šňčžîôâřěáéúűóöőüíęäëđŠŇČŽÔÂŘĚăĂĄąÁÉÖÜÓŐÚŰĐßŁłËÄĘ"
    return specialChars[Math.floor(Math.random() * specialChars.length)]
}