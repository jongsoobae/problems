function elementalForms(word) {
  if(word.length == 1) {
    return ELEMENT[word];
  }
  let a = elementalForms(word[0]);
  let b = elementalForms(word.slice(1));
  if(a &)
};

console.log(elementalForms('beach'));
