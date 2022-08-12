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
// These four are for rewriting Negative Exponents so they are easy to plug into.
function rewriteNegativeExponentNoCoefficient(minExponent = 1, maxExponent = 12) {
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let questionLatex = `x^{-${exponent}}`;
  let answerLatex = `\\frac{1}{x^${exponent}}`;
  return [questionLatex, answerLatex];
}

function rewriteNegativeExponentWithIntegerCoefficient(minCoefficient = 1, maxCoefficient = 9, minExponent = 1, maxExponent = 7, percentNegative = 40) {
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let questionLatex = `${coefficient}x^{-${exponent}}`;
  console.log(`This is question latex ${questionLatex}`);
  let answerLatex = `\\frac{${coefficient}}{x^${exponent}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  // handle case where denominator is x^1
  answerLatex = answerLatex.replace(/x\^1/, 'x');
  return [questionLatex, answerLatex];
}

function rewriteNegativeExponentWithFractionalCoefficient(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponent = 1, maxExponent = 7, percentNegative = 40) {
  let [coefficientNum, coefficientDenom] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom);
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let questionLatex = `\\frac{${coefficientNum}x^{-${exponent}}}{${coefficientDenom}}`;
  let answerLatex = `\\frac{${coefficientNum}}{${coefficientDenom}x^${exponent}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  // handle case where denominator is x^1
  answerLatex = answerLatex.replace(/x\^1/, 'x');
  return [questionLatex, answerLatex];
}

function rewriteNegativeExponents(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponent = 1, maxExponent = 7, percentNegative = 40, coefficientThreshold = 3, fractionThreshold = 6, randomThreshold = 9, questionsCorrect = 0, ) {
  let questionLatex = "";
  let answerLatex = "";
  let choice = 1;
  // if (questionsCorrect < coefficientThreshold) {
  //   [questionLatex, answerLatex] = rewriteNegativeExponentNoCoefficient(minExponent, maxExponent)
  // } else if (questionsCorrect >= coefficientThreshold && questionsCorrect < fractionThreshold) {
  //   [questionLatex, answerLatex] = rewriteNegativeExponentWithIntegerCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponent, maxExponent, percentNegative)
  // } else if (questionsCorrect >= fractionThreshold && questionsCorrect < randomThreshold) {
  //   [questionLatex, answerLatex] = rewriteNegativeExponentWithFractionalCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponent, maxExponent, percentNegative)
  // } else {
    choice = getRandomIntInclusive(1, 3);
    if (choice == 1) {
      [questionLatex, answerLatex] = rewriteNegativeExponentNoCoefficient(minExponent, maxExponent);
    } else if (choice == 2) {
      [questionLatex, answerLatex] = rewriteNegativeExponentWithIntegerCoefficient(minCoefficientNum, maxCoefficientNum, minExponent, maxExponent, percentNegative)
    } else {
      [questionLatex, answerLatex] = rewriteNegativeExponentWithFractionalCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponent, maxExponent, percentNegative)
    }
  // }
  return [questionLatex, answerLatex]
}

// These four are for rewriting fractional exponents into radicals so they are easy to plug in to.
function rewriteFractionalExponentNoCoefficient(minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5) {
  let [exponentNum, exponentDenom] = generateReducedFraction(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  console.log(exponentNum, exponentDenom)
  let questionLatex = `x^{\\frac{${exponentNum}}{${exponentDenom}}}`;
  let answerLatex = `\\sqrt[${exponentDenom}]{x^${exponentNum}}`;
  answerLatex = answerLatex.replace(/x\^1/, 'x');
  console.log(questionLatex);
  return [questionLatex, answerLatex];
}

function rewriteFractionalExponentWithIntegerCoefficient(minCoefficient = 1, maxCoefficient = 9, minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5, percentNegative = 40) {
  let [exponentNum, exponentDenom] = generateReducedFraction(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let questionLatex = `${coefficient}x^{\\frac{${exponentNum}}{${exponentDenom}}}`;
  let answerLatex = `${coefficient}\\sqrt[${exponentDenom}]{x^${exponentNum}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

function rewriteFractionalExponentWithFractionalCoefficient(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5, percentNegative = 40) {
  let [coefficientNum, coefficientDenom] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom);
  let [exponentNum, exponentDenom] = generateReducedFraction(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  let questionLatex = `\\frac{${coefficientNum}x^{\\frac{${exponentNum}}{${exponentDenom}}}}{${coefficientDenom}}`;
  let answerLatex = `\\frac{${coefficientNum}\\sqrt[${exponentDenom}]{x^${coefficientNum}}}}{${coefficientDenom}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

function rewriteFractionalExponents(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5, percentNegative = 40, coefficientThreshold = 3, fractionThreshold = 6, randomThreshold = 9, questionsCorrect = 0, ) {
  let questionLatex = "";
  let answerLatex = "";
  let choice = getRandomIntInclusive(1, 3);
  if (choice == 1) {
    console.log("choice is 1");
    [questionLatex, answerLatex] = rewriteFractionalExponentNoCoefficient(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  } else if (choice == 2) {
    console.log("choice is 2");
    [questionLatex, answerLatex] = rewriteFractionalExponentWithIntegerCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom, percentNegative);
  } else {
    console.log("choice is 3");
    [questionLatex, answerLatex] = rewriteFractionalExponentWithFractionalCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom, percentNegative);
  }
  return [questionLatex, answerLatex]
}


// These four are for rewriting using negative exponents in preparation for taking the derivative.
function useNegativeExponentNoCoefficient (minExponent = 1, maxExponent = 12, percentNegative = 40) {
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let questionLatex = `\\frac{1}{x^{-${exponent}}}`;
  let answerLatex = `x^{-${exponent}}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative)
  questionLatex = questionLatex.replace(/x\^1/, 'x');
  return [questionLatex, answerLatex];
}

function useNegativeExponentWithIntegerCoefficient(minCoefficient = 1, maxCoefficient = 9, minExponent = 1, maxExponent = 7, percentNegative = 40) {
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let questionLatex = `\\frac{${coefficient}}{x^${exponent}}`;
  let answerLatex = `${coefficient}x^{-${exponent}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  // handle case where denominator is x^1
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

function useNegativeExponentWithFractionalCoefficient(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponent = 1, maxExponent = 7, percentNegative = 40) {
  let [coefficientNum, coefficientDenom] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom);
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let questionLatex = `\\frac{${coefficientNum}}{${coefficientDenom}x^${exponent}}`;
  let answerLatex = `\\frac{${coefficientNum}x^{-${exponent}}}{${coefficientDenom}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  // handle case where denominator is x^1
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

function useNegativeExponents(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponent = 1, maxExponent = 7, percentNegative = 40, coefficientThreshold = 3, fractionThreshold = 6, randomThreshold = 9, questionsCorrect = 0, ) {
  let questionLatex = "";
  let answerLatex = "";
  let choice = 1;
  // if (questionsCorrect < coefficientThreshold) {
  //   [questionLatex, answerLatex] = useNegativeExponentNoCoefficient(minExponent, maxExponent)
  // } else if (questionsCorrect >= coefficientThreshold && questionsCorrect < fractionThreshold) {
  //   [questionLatex, answerLatex] = useNegativeExponentWithIntegerCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponent, maxExponent, percentNegative)
  // } else if (questionsCorrect >= fractionThreshold && questionsCorrect < randomThreshold) {
  //   [questionLatex, answerLatex] = useNegativeExponentWithFractionalCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponent, maxExponent, percentNegative)
  // } else {
    // choice = getRandomIntInclusive(1, 3);
    // if (choice == 1) {
    //   console.log("choice is 1");
    //   [questionLatex, answerLatex] = useNegativeExponentNoCoefficient(minExponent, maxExponent, percentNegative);
    // } else if (choice == 2) {
    //   console.log("choice is 2");
    //   [questionLatex, answerLatex] = useNegativeExponentWithIntegerCoefficient(minCoefficientNum, maxCoefficientNum, minExponent, maxExponent, percentNegative)
    // } else {
    //   console.log("choice is 3");
    //   [questionLatex, answerLatex] = useNegativeExponentWithFractionalCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponent, maxExponent, percentNegative)
    // }
  //}
  return [questionLatex, answerLatex]
}


// These four are for rewriting using fractional exponents in preparation for taking the derivative.
function useFractionalExponentNoCoefficient(minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5, percentNegative = 40) {
  let [exponentNum, exponentDenom] = generateReducedFraction(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  let questionLatex = `\\sqrt[${exponentDenom}]{x^${exponentNum}}`;
  let answerLatex = `x^{\\frac{${exponentNum}}{${exponentDenom}}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex);
  questionLatex = questionLatex.replace(/x\^1/, 'x');
  return [questionLatex, answerLatex];
}

function useFractionalExponentWithIntegerCoefficient(minCoefficient = 1, maxCoefficient = 9, minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5, percentNegative = 40) {
  let [exponentNum, exponentDenom] = generateReducedFraction(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let questionLatex = `${coefficient}\\sqrt[${exponentDenom}]{x^${exponentNum}}`;
  let answerLatex = `${coefficient}x^{\\frac{${exponentNum}}{${exponentDenom}}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

function useFractionalExponentWithFractionalCoefficient(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5, percentNegative = 40) {
  let [coefficientNum, coefficientDenom] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom);
  let [exponentNum, exponentDenom] = generateReducedFraction(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  let questionLatex = `\\frac{${coefficientNum}\\sqrt[${exponentDenom}]{x^${coefficientNum}}}}{${coefficientDenom}}`;
  let answerLatex = `\\frac{${coefficientNum}x^{\\frac{${exponentNum}}{${exponentDenom}}}}{${coefficientDenom}}`;
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, percentNegative);
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

function useFractionalExponents(minCoefficientNum = 1, maxCoefficientNum = 9, minCoefficientDenom = 2, maxCoefficientDenom = 9, minExponentNum = 1, maxExponentNum = 7, minExponentDenom = 2, maxExponentDenom = 5, percentNegative = 40, coefficientThreshold = 3, fractionThreshold = 6, randomThreshold = 9) {
  let questionLatex = "";
  let answerLatex = "";
  let choice = getRandomIntInclusive(1, 3);
  // if (choice == 1) {
  //   console.log("choice is 1");
  //   [questionLatex, answerLatex] = useFractionalExponentNoCoefficient(minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom);
  // } else if (choice == 2) {
  //   console.log("choice is 2");
  //   [questionLatex, answerLatex] = useFractionalExponentWithIntegerCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom, percentNegative);
  // } else if (choice ==3) {
  //   console.log("choice is 3");
  //   [questionLatex, answerLatex] = useFractionalExponentWithFractionalCoefficient(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom, minExponentNum, maxExponentNum, minExponentDenom, maxExponentDenom, percentNegative);
  // }
  return [questionLatex, answerLatex]
}

export {
  // getPrompt,
  // rewriteForFindingDerivatives,
  rewriteNegativeExponents,
  rewriteFractionalExponents,
  useNegativeExponents,
  useFractionalExponents,
}
