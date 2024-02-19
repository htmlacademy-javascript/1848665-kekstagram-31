const isValidLength = function (string, maxLength) {
  return string.length <= maxLength;
};

isValidLength('проверяемая строка', 20);

const isValidPalindrome = function (string) {
  const formattedString = (string.replaceAll(' ', '')).toLowerCase();
  let emptyString = '';
  for (let i = formattedString.length - 1; i >= 0; i--) {
    emptyString += formattedString[i];
  }
  return formattedString === emptyString;
};

isValidPalindrome('До вОд');
