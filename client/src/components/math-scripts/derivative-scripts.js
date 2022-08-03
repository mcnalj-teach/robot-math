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



function simplePowerRule(minExponent=2, maxExponent=9) {
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let reducedExponent = exponent -1;
  let questionLatex = `x^${exponent}`;
  let answerLatex = `${exponent}x^${reducedExponent}`;
  if (exponent == 1) {
    questionLatex = `x`;
    answerLatex = `1`;
  }
  return [questionLatex, answerLatex];
}

//this doesn't handle 0 exponents
function simplePowerRuleWithFractionalCoefficient(minCoefficientNum=1, maxCoefficientNum=5, minCoefficientDenom=2, maxCoefficientDenom=4, minExponent=2, maxExponent=7) {
  let exponent = getRandomIntInclusive(minExponent, maxExponent); //0-5
  let numerator = 1;
  let denominator = 1;
  [numerator, denominator] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom)
  let answerExponent = exponent - 1;
  let answerNum = exponent * numerator;
  let answerDenom = denominator;
  [answerNum, answerDenom] = getReducedFraction(answerNum, answerDenom);
  let questionLatex = `\\frac{${numerator}}{${denominator}}x^${exponent}`;
  let answerLatex = `\\frac{${answerNum}}{${answerDenom}}x^${answerExponent}`;
  if (answerDenom == 1) {
    answerLatex = `${answerNum}x^${answerExponent}`;
  }
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, 40)
  console.log(questionLatex);
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

// this doesn't allow the exponent to be  1
function simplePowerRuleWithNegativeExponent(minExponent=2, maxExponent=7) {
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let reducedExponent = exponent + 1;
  let questionLatex = `x^{-${exponent}}`;
  let answerLatex = `-${exponent}x^{-${reducedExponent}}`;
  return [questionLatex, answerLatex];
}

// need to add the second answer if they put term in denominator
function simplePowerRuleWithNegativeExponentAndIntegerCoefficient(minCoefficient=2, maxCoefficient=7, minExponent=2, maxExponent=7) {
  let coefficient = getRandomIntInclusive(minCoefficient, maxCoefficient);
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let answerCoefficient = coefficient * exponent;
  let answerExponent = exponent + 1;
  let questionLatex = `${coefficient}x^{-${exponent}}`;
  let answerLatex = `-${answerCoefficient}x^{-${answerExponent}}`;
  let answerLatex2 = `-\\frac{${answerCoefficient}}{x^${answerExponent}}`;
  [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

// need to handle negatives for multiple answers and same with regEx fixes

function simplePowerRuleWithNegativeExponentAndFractionalCoefficient(minCoefficientNum=1, maxCoefficientNum=5, minCoefficientDenom=2, maxCoefficientDenom=4, minExponent=2, maxExponent=7) {
  let exponent = getRandomIntInclusive(minExponent, maxExponent);
  let [numerator, denominator] = generateReducedFraction(minCoefficientNum, maxCoefficientNum, minCoefficientDenom, maxCoefficientDenom)
  let answerNumerator = numerator * exponent;
  let answerDenominator = denominator;
  let answerExponent = exponent + 1;
  [answerNumerator, answerDenominator] = getReducedFraction(answerNumerator, answerDenominator);
  // now the denominator could be 1
  let questionLatex = `\\frac{${numerator}}{${denominator}}x^{-${exponent}}`;
  let answerLatex = `-\\frac{${answerNumerator}}{${answerDenominator}}x^{-${answerExponent}}`;
  let answerLatex2 = `-\\frac{${answerNumerator}x^{-${answerExponent}}}{${answerDenominator}}`;
  let answerLatex3 = `-\\frac{${answerNumerator}}{${answerDenominator}x^${answerExponent}}`;
  if (answerDenominator == 1) {
    answerLatex = `-${answerNumerator}x^{-${answerExponent}}`;
    answerLatex2 = `-${answerNumerator}x^{-${answerExponent}}`;
    answerLatex3 = `-\\frac{${answerNumerator}}{x^${answerExponent}}`;
  }
  [questionLatex, answerLatex, answerLatex2] = maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, 40);
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex];
}

function simplePowerRuleWithIntegerCoefficient(minCoefficient, maxCoefficient, minExponent, maxExponent) {
  let coefficient = getRandomIntInclusive(1, 5);
  let exponent = getRandomIntInclusive(0, 7);
  let reducedExponent = exponent -1;
  let newCoefficient = coefficient * exponent;
  let questionLatex = `${coefficient}x^${exponent}`;
  let answerLatex = `${newCoefficient}x^${reducedExponent}`
  if (exponent == 1) {
    answerLatex = `${coefficient}`
  }
  [questionLatex, answerLatex] = maybeNegativeCoefficient(questionLatex, answerLatex, 40)
  [questionLatex, answerLatex] = applyRegexFixes(questionLatex, answerLatex);
  return [questionLatex, answerLatex]
}

export {
  simplePowerRule,
  simplePowerRuleWithFractionalCoefficient,
  simplePowerRuleWithNegativeExponent,
  simplePowerRuleWithNegativeExponentAndIntegerCoefficient,
  simplePowerRuleWithNegativeExponentAndFractionalCoefficient,
  simplePowerRuleWithIntegerCoefficient,
}
