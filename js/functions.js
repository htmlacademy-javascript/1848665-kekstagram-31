const checkStringlength = (string = '', maxLength = 1) => string.length <= maxLength;

checkStringlength();

// console.log(checkStringlength('проверяемая строка', 20)); true
// console.log(checkStringlength('проверяемая строка', 18)); true
// console.log(checkStringlength('проверяемая строка', 10)); false

const isPalindrome = (string = '') => {
  const formattedString = string.replaceAll(' ','').toLowerCase();
  const reversedString = formattedString.split('').reverse().join('');
  return formattedString === reversedString;
};

isPalindrome();

// console.log(isPalindrome('топот')); true
// console.log(isPalindrome('ДовОд')); true
// console.log(isPalindrome('Кекс')); false
// console.log(isPalindrome('Лёша на полке клопа нашёл ')); true

const getNumbers = (string = '') => {
  let result = '';
  string = string.toString();
  for (let index = 0; index <= string.length - 1; index++) {
    const symbol = parseInt(string[index], 10);
    if (!isNaN(symbol)) {
      result = result + symbol;
    }
  }
  return parseInt(result, 10);
};

getNumbers();

// console.log(getNumbers('2023 год')); 2023
// console.log(getNumbers('ECMAScript 2022')); 2022
// console.log(getNumbers('1 кефир, 0.5 батона')); 105
// console.log(getNumbers('агент 007')); 7
// console.log(getNumbers('а я томат')); NaN
// console.log(getNumbers(2023)); 2023
// console.log(getNumbers(-1)); 1
// console.log(getNumbers(1.5)); 15
