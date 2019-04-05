const sum = function(num1, num2) {
  return num1 + num2;
};

const parseBoolToInt = function(value) {
  return 0 + value;
};

const repeatCharacter = function(times, char) {
  return new Array(times).fill(char).join('');
};

module.exports = {
  sum,
  parseBoolToInt,
  repeatCharacter
};
