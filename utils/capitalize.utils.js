const capitalize = (word) => {
  let letters = word.toLowerCase().split("");
  letters[0] = letters[0].toUpperCase();
  const capitalized = letters.join("");
  return capitalized;
};

module.exports = {
  capitalize,
};
