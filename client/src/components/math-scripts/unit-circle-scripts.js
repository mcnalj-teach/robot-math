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

// function pickTrigFunction() {
//   let choice = getRandomIntInclusive(1,3);
//   let trigFunctionLatex = 'f(\\theta) = sin(\\theta)'
//   let trigFunctionName = 'sine';
//   switch(choice) {
//     case 1:
//       trigFunctionLatex = 'f(\\theta) = sin(\\theta)';
//       trigFunctionName = 'sine';
//       break;
//     case 2:
//       trigFunctionLatex = 'f(\\theta) = cos(\\theta)';
//       trigFunctionName = 'cosine';
//       break;
//     case 3:
//       trigFunctionLatex = 'f(\\theta) = tan(\\theta)';
//       trigFunctionName = 'tangent';
//       break;
//   }
//   return [trigFunctionLatex, trigFunctionName];
// }

function pickTrigFunction(min=1, max=6) {
  let choice = getRandomIntInclusive(min, max);
  let trigFunctionLatex = 'f(\\theta) = sin(\\theta)'
  let trigFunctionName = 'sine';
  switch(choice) {
    case 1:
      trigFunctionLatex = 'f(\\theta) = sin(\\theta)';
      trigFunctionName = 'sine';
      break;
    case 2:
      trigFunctionLatex = 'f(\\theta) = cos(\\theta)';
      trigFunctionName = 'cosine';
      break;
    case 3:
      trigFunctionLatex = 'f(\\theta) = tan(\\theta)';
      trigFunctionName = 'tangent';
      break;
    case 4:
      trigFunctionLatex = 'f(\\theta) = csc(\\theta)';
      trigFunctionName = 'cosecant';
      break;
    case 5:
      trigFunctionLatex = 'f(\\theta) = sec(\\theta)';
      trigFunctionName = 'secant';
      break;
    case 6:
      trigFunctionLatex = 'f(\\theta) = cot(\\theta)';
      trigFunctionName = 'cotangent';
      break;
  }
  return [trigFunctionLatex, trigFunctionName];
}


function pickAngleNumberMeasureAndAnswersArray(min=0, max=24) {
  let choice = 1;
  let angleLatex = "";
  let answerLatexObject = "";
  while (choice == 1 || choice == 5 || choice == 7 || choice == 11 || choice == 13 || choice == 17 || choice == 19) {
    choice = getRandomIntInclusive(min, max);
  }
  switch(choice) {
    case 0:
      angleLatex = `f(0)`;
      answerLatexObject =
        {
          "sine": '0',
          "cosine": '1',
          "tangent": '0',
          "cosecant": 'undefined',
          "secant": '1',
          "cotangent": 'undefined',
        };
      break;
    case 2:
      angleLatex = `f\\left(\\frac{\\pi}{6}\\right)`;
      answerLatexObject =
        {
          "sine": '\\frac{1}{2}',
          "cosine": '\\frac{\\sqrt{3}}{2}',
          "tangent": '\\frac{\sqrt{3}}{3}',
          "cosecant": '2',
          "secant": '\\frac{2\\sqrt{3}}{3}',
          "cotangent": '\\sqrt{3}',
        };
      break;
    case 3:
      angleLatex = `f\\left(\\frac{\\pi}{4}\\right)`;
      answerLatexObject =
        {
          "sine": '\\frac{\\sqrt{2}}{2}',
          "cosine": '\\frac{\\sqrt{2}}{2}',
          "tangent": '1',
          "cosecant": '\\frac{2\\sqrt{2]}{2}',
          "secant": '\\frac{2\\sqrt{2]}{2}',
          "cotangent": '1',
        };
      break;
    case 4:
      angleLatex = `f\\left(\\frac{\\pi}{3}\\right)`;
      answerLatexObject =
        {
          "sine": '\\frac{\\sqrt{3}}{2}',
          "cosine": '\\frac{1}{2}',
          "tangent": '\\sqrt{3}',
          "cosecant": '\\frac{2\\sqrt{3}}{3}',
          "secant": '2',
          "cotangent": '\\frac{\sqrt{3}}{3}',
        };
      break;
    case 6:
      angleLatex = `f\\left(\\frac{\\pi}{2}\\right)`;
      answerLatexObject =
        {
          "sine": '1',
          "cosine": '0',
          "tangent": 'undefined',
          "cosecant": '1',
          "secant": 'undefined',
          "cotangent": '1',
        };
      break;
    case 8:
      angleLatex = `f\\left(\\frac{2\\pi}{3}\\right)`;
      answerLatexObject =
        {
          "sine": '\\frac{\\sqrt{3}}{2}',
          "cosine": '-\\frac{1}{2}',
          "tangent": '-\\sqrt{3}',
          "cosecant": '\\frac{2\\sqrt{3}}{3}',
          "secant": '-2',
          "cotangent": '-\\frac{\sqrt{3}}{3}',
        };
      break;
    case 9:
      angleLatex = `f\\left(\\frac{3\\pi}{4}\\right)`;
      answerLatexObject =
        {
          "sine": '\\frac{\\sqrt{2}}{2}',
          "cosine": '-\\frac{\\sqrt{2}}{2}',
          "tangent": '-1',
          "cosecant": '\\frac{2\\sqrt{2]}{2}',
          "secant": '-\\frac{2\\sqrt{2]}{2}',
          "cotangent": '-1',
        };
      break;
    case 10:
      angleLatex = `f\\left(\\frac{5\\pi}{6}\\right)`;
      answerLatexObject =
        {
          "sine": '\\frac{1}{2}',
          "cosine": '-\\frac{\\sqrt{3}}{2}',
          "tangent": '-\\frac{\sqrt{3}}{3}',
          "cosecant": '2',
          "secant": '-\\frac{2\\sqrt{3}}{3}',
          "cotangent": '-\\sqrt{3}',
        };
      break;
    case 12:
      angleLatex = `f(\\pi))`;
      answerLatexObject =
        {
          "sine": '0',
          "cosine": '-1',
          "tangent": '0',
          "cosecant": 'undefined',
          "secant": '-1',
          "cotangent": 'undefined',
        };
      break;
    case 14:
      angleLatex = `f\\left(\\frac{7\\pi}{6}\\right)`;
      answerLatexObject =
        {
          "sine": '-\\frac{1}{2}',
          "cosine": '-\\frac{\\sqrt{3}}{2}',
          "tangent": '\\frac{\sqrt{3}}{3}',
          "cosecant": '-2',
          "secant": '-\\frac{2\\sqrt{3}}{3}',
          "cotangent": '\\sqrt{3}',
        };
      break;
    case 15:
      angleLatex = `f\\left(\\frac{5\\pi}{4}\\right)`;
      answerLatexObject =
        {
          "sine": '-\\frac{\\sqrt{2}}{2}',
          "cosine": '-\\frac{\\sqrt{2}}{2}',
          "tangent": '1',
          "cosecant": '-\\frac{2\\sqrt{2]}{2}',
          "secant": '-\\frac{2\\sqrt{2]}{2}',
          "cotangent": '1',
        };
      break;
    case 16:
      angleLatex = `f\\left(\\frac{4\\pi}{3}\\right)`;
      answerLatexObject =
        {
          "sine": '-\\frac{\\sqrt{3}}{2}',
          "cosine": '-\\frac{1}{2}',
          "tangent": '\\sqrt{3}',
          "cosecant": '-\\frac{2\\sqrt{3}}{3}',
          "secant": '-2',
          "cotangent": '\\frac{\sqrt{3}}{3}',
        };
      break;
    case 18:
      angleLatex = `f(\\frac{3\\pi}{2})`;
      answerLatexObject =
        {
          "sine": '-1',
          "cosine": '0',
          "tangent": 'unefined',
          "cosecant": '-1',
          "secant": 'undefined',
          "cotangent": '0',
        };
      break;
    case 20:
      angleLatex = `f\\left(\\frac{5\\pi}{3}\\right)`;
      answerLatexObject =
        {
          "sine": '-\\frac{\\sqrt{3}}{2}',
          "cosine": '\\frac{1}{2}',
          "tangent": '-\\sqrt{3}',
          "cosecant": '-\\frac{2\\sqrt{3}}{3}',
          "secant": '2',
          "cotangent": '-\\frac{\sqrt{3}}{3}',
        };
      break;
    case 21:
      angleLatex = `f\\left(\\frac{7\\pi}{4}\\right)`;
      answerLatexObject =
        {
          "sine": '-\\frac{\\sqrt{2}}{2}',
          "cosine": '\\frac{\\sqrt{2}}{2}',
          "tangent": '-1',
          "cosecant": '-\\frac{2\\sqrt{2]}{2}',
          "secant": '\\frac{2\\sqrt{2]}{2}',
          "cotangent": '-1',
        };
      break;
    case 22:
      angleLatex = `f\\left(\\frac{11\\pi}{6}\\right)`;
      answerLatexObject =
        {
          "sine": '-\\frac{1}{2}',
          "cosine": '-\\frac{\\sqrt{3}}{2}',
          "tangent": '\\frac{\sqrt{3}}{3}',
          "cosecant": '-2',
          "secant": '-\\frac{2\\sqrt{3}}{3}',
          "cotangent": '\\sqrt{3}',
        };
      break;
    case 24:
      angleLatex = `f(2\\pi)`;
      answerLatexObject =
        {
          "sine": '0',
          "cosine": '1',
          "tangent": '0',
          "cosecant": 'undefined',
          "secant": '1',
          "cotangent": 'undefined',
        };
      break;
  }
  return [choice, angleLatex, answerLatexObject];

}

function getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (minTrig = 1, maxTrig = 6, minAngle = 0, maxAngle = 24) {
    let [trigFunctionLatex, trigFunctionName] = pickTrigFunction(minTrig, maxTrig);
    let [choice, angleLatex, answerLatexObject] = pickAngleNumberMeasureAndAnswersArray(minAngle, maxAngle);
    return [trigFunctionLatex, trigFunctionName, choice, angleLatex, answerLatexObject];
}

function sinAndCosFirstQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (1, 2, 0, 6)]
}

function sinAndCosFirstTwoQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (1, 2, 0, 12)]
}

function sinAndCosAllQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (1, 2, 0, 24)]
}

function tanFirstQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (3, 3, 0, 6)]
}

function tanFirstTwoQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (3, 3, 0, 12)]
}

function tanAllQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (3, 3, 0, 24)]
}

function allTrigFirstQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (1, 6, 0, 6)]
}

function allTrigFirstTwoQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (1, 6, 0, 12)]
}

function allTrigAllQuad() {
  return [...getTrigFunctionLatexAndNameAngleNumberAndLatexAnswerObjectLatex (1, 6, 0, 24)]
}



export {
  pickTrigFunction,
  pickAngleNumberMeasureAndAnswersArray,
  sinAndCosFirstQuad,
  sinAndCosFirstTwoQuad,
  sinAndCosAllQuad,
  tanFirstQuad,
  tanFirstTwoQuad,
  tanAllQuad,
  allTrigFirstQuad,
  allTrigFirstTwoQuad,
  allTrigAllQuad,
}
