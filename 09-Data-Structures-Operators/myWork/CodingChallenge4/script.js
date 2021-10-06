'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const selectButton = function () {
  
  const textAreaElement = document.querySelector('textarea');
  const content = textAreaElement.value;

  const contentSeparated = content.split(/[\s\n]+/);

  const contentSeparatedCorrectlyFormatted = getContentSeparatedCorrectlyFormatted(contentSeparated);

  printSeparatedStrings(contentSeparatedCorrectlyFormatted);
 }

 const getContentSeparatedCorrectlyFormatted = function(contentSeparated) {
  
  const contentSeparatedCorrectlyFormatted = [];

  for (let i = 0; i < contentSeparated.length; i++) {
    const element = contentSeparated[i];
    const elementSeparated = element.split('_');
    
    const elementCorrectlyFormatted = getElementCorrectlyFormatted(elementSeparated, i + 1);
    
    contentSeparatedCorrectlyFormatted.push(elementCorrectlyFormatted);
  }

  return contentSeparatedCorrectlyFormatted;
}

const getElementCorrectlyFormatted = function(elementSeparated, numberOfTicks) {
  
  const elementSeparatedCased = [];
      
  for (let i = 0; i < elementSeparated.length; i++) {
      
    const part = elementSeparated[i];
    let partCased;
    
    if (i == 0) {
      partCased = part.toLowerCase();
    
    } else {   
      partCased = part[0].toUpperCase() + part.slice(1).toLowerCase();

    }
      elementSeparatedCased.push(partCased);
  }
  const elementCamelCased = elementSeparatedCased.join('');
  const elementCamelCasedPadded = elementCamelCased.padEnd(25, ' ');
  const elementCamelCasedPaddedCheckMarked = elementCamelCasedPadded + '✅'.repeat(numberOfTicks);

  return elementCamelCasedPaddedCheckMarked;
 }

 const printSeparatedStrings = function (stringsSeparated) {
    
  for (const elem of stringsSeparated) {
      console.log(elem);
  }
 }
 

 document.querySelector('button').addEventListener('click', selectButton); 