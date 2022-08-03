// for Exponents
function getSimplifiedFraction(minNum, maxNum, minDenom, maxDenom) {
  let numerator = 1;
  let denominator = 1;
  while (numerator == denominator || numerator % denominator == 0) {
    numerator = getRandomIntInclusive(minNum, maxNum);
    denominator = getRandomIntInclusive(minDenom, maxDenom);
  }
  [numerator, denominator] = getReducedFraction(numerator, denominator);
  return [numerator, denominator];
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


//  for derivatives
function generateReducedFraction(minNum, maxNum, minDenom, maxDenom) {
  let numerator = 1;
  let denominator = 1;
  while (numerator == denominator || numerator % denominator == 0) {
    numerator = getRandomIntInclusive(minNum, maxNum);
    denominator = getRandomIntInclusive(minDenom, maxDenom);
  }
  [numerator, denominator] = getReducedFraction(numerator, denominator)
  return [numerator, denominator];
}

function maybeNegativeCoefficient(questionLatex, answerLatex, percent) {
  let chance = Math.random() * 100;
  if (chance<percent) {
    questionLatex = `-${questionLatex}`;
    answerLatex = `-${answerLatex}`;
  }
  return [questionLatex, answerLatex]
}

function maybeNegativeCoefficientWithAlreadyNegativeCoefficient(questionLatex, answerLatex, answerLatex2, percent) {
  let chance = Math.random() * 100;
  if (chance<percent) {
    questionLatex = `-${questionLatex}`;
    answerLatex = answerLatex.substring(1);
    answerLatex2 = answerLatex2.substring(1);
  }
  return [questionLatex, answerLatex, answerLatex2]
}

function applyRegexFixes(questionLatex, answerLatex) {
  // this handles questions where the exponent is 0
  questionLatex = questionLatex.replace(/x\^0/, '');
  answerLatex = answerLatex.replace(/0x\^\-1/, '0') // Won't work if we want to allow negative exponents
  // this handles wherever exponent is 1
  questionLatex = questionLatex.replace(/x\^1/, 'x');
  answerLatex = answerLatex.replace(/x\^1/, 'x');
  // this handles wherever coefficient is 1
  let explore = /\d1x/.test(questionLatex)
  if (!explore) {
    questionLatex = questionLatex.replace(/1x/, 'x');
  }
  explore = /\d1x/.test(answerLatex)
  if (!explore) {
    answerLatex = answerLatex.replace(/1x/, 'x');
  }
  return [questionLatex, answerLatex]
}

// reset numerator and denominator without creating new variables
function getReducedFraction(numerator, denominator) {
  let gcf = findGreatestCommonFactor(numerator, denominator)
  numerator = numerator / gcf;
  denominator = denominator /gcf;
  return [numerator, denominator];
}

function findGreatestCommonFactor(numerator, denominator) {
  let gcf = 1;
  if (denominator > numerator) {
    for (let i=numerator; i>1; i--) {
      if (denominator % i == 0 && numerator % i == 0) {
        gcf = i;
        return gcf;
      }
    }
  } else {
    for (let j=denominator; j>1; j--) {
      if (numerator % j == 0 && denominator % j ==0) {
        gcf = j;
        return gcf;
      }
    }
  }
  return gcf;
}

export {
  getSimplifiedFraction,
  getRandomIntInclusive,
  generateReducedFraction,
  maybeNegativeCoefficient,
  maybeNegativeCoefficientWithAlreadyNegativeCoefficient,
  applyRegexFixes,
  getReducedFraction,
  findGreatestCommonFactor
}
