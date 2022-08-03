import {
  getSimplifiedFraction,
  getRandomIntInclusive,
  generateReducedFraction,
  maybeNegativeCoefficient,
  maybeNegativeCoefficientWithAlreadyNegativeCoefficient,
  applyRegexFixes,
  getReducedFraction,
  findGreatestCommonFactor
} from './utilities-scripts.js';


// recently copied
function getFractionalOrRadicalExponent() {
  let hasCoefficient = false;
  let isNegativeCoefficient = false;
  let xTermInNumerator = true;
  let isFractionalNotRadical = true;
  let isNegativeExponent = false;
  var exponentNumerator = 1;
  var exponentDenominator = 1;
  let xValue = getRandomIntInclusive(1, 5);
  let questionLatex = '';
  let answerLatex = '';
  let evaluatedAnswer = 0;
  if (!hasCoefficient) {
    if (xTermInNumerator) {
      [exponentNumerator, exponentDenominator] = getSimplifiedFraction(1, 5, 2, 4);
      if (isFractionalNotRadical) {
        if (isNegativeExponent) {
          questionLatex = 'x^{-\\frac{' + exponentNumerator + '}{' + exponentDenominator + '}}';
          answerLatex = '\\frac{1}{\\sqrt[' + exponentDenominator +']{x^' + exponentNumerator + '}}';
          // This will only work with a calclator
          evaluatedAnswer = 1 / Math.pow(xValue, exponentNumerator/exponentDenominator);
        } else {
          questionLatex = 'x^{\\frac{' + exponentNumerator + '}{' + exponentDenominator + '}}';
          answerLatex = '\\sqrt[' + exponentDenominator +']{x^' + exponentNumerator + '}}';
          // This will only work with a calclator
          evaluatedAnswer = Math.pow(xValue, exponentNumerator/exponentDenominator);
        }
      } else {    //!isFractionalNotRadical
        if (isNegativeExponent) {
          questionLatex = '\\frac{1}{\\sqrt[' + exponentDenominator + ']{x^' + exponentNumerator + '}}';
          answerLatex = 'x^{-\\frac{' + exponentNumerator + '}{' + exponentDenominator + '}}'
          evaluatedAnswer = 1 / Math.pow(xValue, exponentNumerator/exponentDenominator);
        } else {
          questionLatex = '\\sqrt[' + exponentDenominator + ']{x^' + exponentNumerator + '}'
          answerLatex = 'x^{\\frac{' + exponentNumerator + '}{' + exponentDenominator + '}}';
          evaluatedAnswer = Math.pow(xValue, exponentNumerator/exponentDenominator);
        }
      }
    }
  }
  return [questionLatex, answerLatex];
}


// Rewrite as equivalent expressions with all exponential terms in the numerator (use negative exponents as necessary) and no radical terms (convert to fractions as necessary)
// All questions have either radicals [[1-7]/[2-5]] (2/3 - 1/2 numerator and 1/2 denominator) or integer exponential terms in the denominator [1-7] (1/3)
function rewriteForFindingDerivatives() {
  let questionLatex = '';
  let answerLatex = '';
  let chance = getRandomIntInclusive(1, 3);
  switch (chance) {
      case 1:
        [questionLatex, answerLatex] = getIntegerExponentialTermInDenomonator(1, 7);
        break;
      case 2:
        [questionLatex, answerLatex] = getRadicalTermInNumerator(1, 7, 2, 5);
        break;
      case 3:
        [questionLatex, answerLatex] = getRadicalTermInDenominator(1, 7, 2, 5);
        break;
  }
  return [questionLatex, answerLatex];
}


function getIntegerExponentialTermInDenomonator(minExponent, maxExponent) {
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let questionLatex = '';
  let answerLatex = '';
  if (exponent == 1) {
    questionLatex = '\\frac{1}{x}';
    answerLatex = 'x^{-' + exponent + '}';
  } else {
    questionLatex = '\\frac{1}{x^' + exponent + '}';
    answerLatex = 'x^{-' + exponent + '}';
  }
  return [questionLatex, answerLatex];
}

function getRadicalTermInNumerator(minPower, maxPower, minRoot, maxRoot) {
  let power = 1;
  let root = 1;
  let questionLatex = '';
  let answerLatex = '';
  [power, root] = getSimplifiedFraction(minPower, maxPower, minRoot, maxRoot)
  if (power == 1) {
    if (root == 2) {
      questionLatex = '\\sqrt{x}';
      answerLatex = 'x^{\\frac{' + power +'}{' + root + '}}';
    } else {
      questionLatex = '\\sqrt[' + root + ']{x}';
      answerLatex = 'x^{\\frac{' + power +'}{' + root + '}}';
    }
  } else { // power is greater than 1
    if (root == 2) {
      questionLatex = '\\sqrt{x^' + power + '}';
      answerLatex = 'x^{\\frac{' + power +'}{' + root + '}}';
    } else {
      questionLatex = '\\sqrt[' + root + ']{x^' + power + '}';
      answerLatex = 'x^{\\frac{' + power +'}{' + root + '}}';
    }
  }
  return [questionLatex, answerLatex];
}

function getRadicalTermInDenominator(minPower, maxPower, minRoot, maxRoot) {
  let power = 1;
  let root = 1;
  let questionLatex = '';
  let answerLatex = '';
  [power, root] = getSimplifiedFraction(minPower, maxPower, minRoot, maxRoot)
  if (power == 1) {
      if (root == 2) {
        questionLatex = '\\frac{1}{\\sqrt{x}}';
        answerLatex = 'x^{-\\frac{' + power +'}{' + root + '}}';
      } else {
        questionLatex = '\\frac{1}{\\sqrt[' + root + ']{x}}';
        answerLatex = 'x^{-\\frac{' + power +'}{' + root + '}}';
      }
  } else {
    if (root == 2) {
      questionLatex = '\\frac{1}{\\sqrt{x^' + power + '}}';
      answerLatex = 'x^{-\\frac{' + power +'}{' + root + '}}';
    } else {
      questionLatex = '\\frac{1}{\\sqrt[' + root + ']{x^' + power + '}}';
      answerLatex = 'x^{-\\frac{' + power +'}{' + root + '}}';
    }
  }

  return [questionLatex, answerLatex];
}

function getPrompt(hasCoefficient) {
  console.log("called getPromp");
  let isNegativeCoefficient = false;
  let xTermInNumerator = setXTermInNumerator();
  let isNegativeExponent = true;
  let exponent = Math.floor((Math.random() * 4) + 1);
  let questionLatex = '';
  let answerLatex = '';
  if (!hasCoefficient) {
    [questionLatex, answerLatex] =  setExponentialTermWithNoCoefficient(xTermInNumerator, isNegativeExponent, exponent);
  } else {
    [questionLatex, answerLatex] = setExponentialTermWithCoefficient(xTermInNumerator, isNegativeExponent, exponent);
  }
  return [questionLatex, answerLatex];
}

// old functions. still used?
function setExponentialTermWithNoCoefficient(xTermInNumerator, isNegativeExponent, exponent) {
  let questionLatex = '';
  let answerLatex = '';
  if (xTermInNumerator) {
    if (isNegativeExponent) {
      questionLatex = 'x^{-' + exponent + '}';
      answerLatex = '\\frac{1}{x^' + exponent + '}';
    } else {
      questionLatex = 'x^' + exponent;
      answerLatex = '\\frac{1}{x^{-' + exponent + '}}';
    }
  } else {
    if (isNegativeExponent) {
      questionLatex = '\\frac{1}{x^{-' + exponent + '}}';
      answerLatex = 'x^' + exponent;
    } else {
      questionLatex = '\\frac{1}{x^' + exponent + '}';
      answerLatex = 'x^{-' + exponent + '}';
    }
  }
  return [questionLatex, answerLatex];
}
function setExponentialTermWithCoefficient(xTermInNumerator, isNegativeExponent, exponent) {
  let questionLatex = '';
  let answerLatex = '';
  let isNegativeCoefficient = setIsNegativeCoefficient();
  let numerator = 1;
  let denominator = 1;
  while (numerator == denominator || numerator % denominator == 0) {
    numerator = setNumerator();
    denominator = setDenominator();
    [numerator, denominator] = getReducedFraction(numerator, denominator);
  }
  if (xTermInNumerator) {
    if (isNegativeExponent) {
      if (numerator == 1) {
        questionLatex = '\\frac{x^{-' + exponent + '}}{' + denominator + '}';
      } else {
        questionLatex = '\\frac{' + numerator + 'x^{-' + exponent + '}}{' + denominator + '}';
      }
      if (exponent == 1) {
        answerLatex = '\\frac{' + numerator + '}{' + denominator + 'x}';
      } else {
        answerLatex = '\\frac{' + numerator + '}{' + denominator + 'x^' + exponent + '}';
      }

    } else {
      if (numerator == 1) {
          questionLatex = '\\frac{x^' + exponent + '}{' + denominator + '}';
          if (exponent == 1) {
            questionLatex = '\\frac{x}{' + denominator + '}';
          }
      } else {
        questionLatex = '\\frac{' + numerator + 'x^' + exponent + '}{' + denominator + '}';
        if (exponent == 1) {
          questionLatex = '\\frac{' + numerator + 'x}{' + denominator + '}';
        }
      }
      answerLatex = '\\frac{' + numerator + '}{' + denominator + 'x^{-' + exponent + '}}';
    }
  } else {
    if (isNegativeExponent) {
      questionLatex = '\\frac{' + numerator + '}{' + denominator + 'x^{-' + exponent + '}}';
      if (numerator == 1) {
        answerLatex = '\\frac{x^' + exponent + '}{' + denominator + '}';
        if (exponent == 1) {
          answerLatex = '\\frac{x}{' + denominator + '}';
        }
      } else {
        answerLatex = '\\frac{' + numerator + 'x^' + exponent + '}{' + denominator + '}';
        if (exponent == 1) {
          answerLatex = '\\frac{' + numerator + 'x}{' + denominator + '}';
          // this could have the answer as a separate fraction
        }
      }
    } else {
      questionLatex = '\\frac{' + numerator + '}{' + denominator + 'x^' + exponent + '}';
      if (exponent == 1) {
        questionLatex = '\\frac{' + numerator + '}{' + denominator + 'x}';
      }
      answerLatex = '\\frac{' + numerator + 'x^{-' + exponent + '}}{' + denominator + '}';
      // this could have the answer as a separate fraction
      if (numerator == 1) {
        answerLatex = '\\frac{x^{-' + exponent + '}}{' + denominator + '}';
        // this could have the answer as a separate fraction
      }
    }
  }
  return [questionLatex, answerLatex];
}


function setXTermInNumerator() {
  let xTermInNumerator = true;
  let chance = Math.floor(Math.random() *2 );
  if (chance == 1) {
    xTermInNumerator = false;
  }
  return xTermInNumerator
}


function setIsNegativeCoefficient() {
  let isNegativeCoefficient = true;
  let chance = Math.floor(Math.random() *2 );
  if (chance == 1) {
    isNegativeCoefficient = false;
  }
  return isNegativeCoefficient;
}

function setNumerator() {
  let numerator = Math.floor((Math.random() * 12 ) +1 );
  return numerator;
}

function setDenominator() {
  let denominator = Math.floor((Math.random() * 7 ) +2 );
  return denominator;
}

export {
  getPrompt,
  rewriteForFindingDerivatives,
}
