import React, { useState, useEffect } from "react";
import { ProgressBar} from 'react-bootstrap';
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import '../App.scss';
import '../index.scss';
import './question-base.scss';
import {
  getPrompt,
  rewriteForFindingDerivatives
} from './math-scripts/exponents-scripts.js'
import {
  simplePowerRule,
  simplePowerRuleWithIntegerCoefficient,
  simplePowerRuleWithFractionalCoefficient,
  simplePowerRuleWithNegativeExponent,
  simplePowerRuleWithNegativeExponentAndIntegerCoefficient,
  simplePowerRuleWithNegativeExponentAndFractionalCoefficient,

} from './math-scripts/derivative-scripts.js'

import { getRandomIntInclusive } from './math-scripts/utilities-scripts.js';


const questionTopics = {
  "derivatives": [
    {
      topicId: 210,
      questionEngine: simplePowerRule,
    },
    {
      topicId: 220,
      questionEngine: simplePowerRuleWithIntegerCoefficient,
    },
    {
      topicId: 230,
      questionEngine: simplePowerRuleWithFractionalCoefficient,
    },
    {
      topicId: 240,
      questionEngine: simplePowerRuleWithNegativeExponent,
    },
    {
      topicId: 250,
      questionEngine: simplePowerRuleWithNegativeExponentAndIntegerCoefficient,
    },
    {
      topicId: 260,
      questionEngine: simplePowerRuleWithNegativeExponentAndFractionalCoefficient,
    },

],
  "exponents": [
    {
      topicId: 10,
      questionEngine: getPrompt,
    },
    {
      topicId: 20,
      questionEngine: rewriteForFindingDerivatives,
    },
  ],
}
addStyles();

const userId = "123mcnalj";
const startTime = new Date();
const topicUnit = "derivatives";

export default function QuestionBase() {
  const params = useParams()
  let unit = params.id;

  let questionEngine = questionTopics[unit][0].questionEngine;
  console.log(questionEngine);

// This is for the first topic in a unit
  // let topicObj = {
  //   "unitName": "exponents",
  //   "unitNumber": 10,
  //   "unitTopics": [
  //     {
  //       "topicId": 10,
  //       "topicData": {
  //         "topicEngine": "rewriteForFindingDerivatives",
  //         "displayName": "Rewriting Exponents",
  //         "description": "Rewriting power terms using negative exponents and fractional exponents.",
  //         "prompt": "Rewrite to get all exponential terms in the numerator and rewrite radical terms as fractional exponents.",
  //         "standard": 10,
  //       }
  //     }
  //   ],
  // }

// get this from the DB

  const [topics, setTopics] = useState(
    {
      topicId: 210,
      topicsArray: [{
        topicId: 210,
        topicData: {
          topicEngine: "",
          displayName: "",
          description: "",
          prompt:"",
          standard:"",
        },
      }]
    });

  let topicObj =
    {
      "topicId": 260,
      "topicData": {
        "topicEngine": "simplePowerRuleWithNegativeExponentAndFractionalCoefficient",
        "displayName": "The Power Rule (with Negative Exponents)",
        "description": "Practice taking the derivative of power functions.",
        "prompt": "Take the derivative of each power function.",
        "standard": 7,
    }
  }

// This is the good one to play with async/await vs then.
// let thisWorks = async function getTopics(unitName){
//   const myData = await fetch(`http://localhost:5000/topic/${unitName}`)
//   .then((response) => {
//     return response.json()
//   })
//   .then((response) => {
//     let topicList = response.unitTopics
//     console.log(topicList);  // this is the array
//     return topicList;
//   })
//   .catch(error => console.log(error))
//   return myData;
//
// }
// // Need to implement use Refs?
// // Here, everyting is resolved, but how to get it out
// let unitTopicsPromise = thisWorks("derivatives");
// let unitTopics = Promise.resolve(unitTopicsPromise);
// unitTopics.then(value => {
//   console.log(value)
// })


// console.log(atLast);
// console.log(unitTopicsPromise); // this is fulfilled pending Promise
// console.log(unitTopics); // this is fulfilled pending Promise
  let [questionLatex, answerLatex] = questionEngine();
  const [questionState, setQuestionState] = useState({
    questionEngine: simplePowerRule,
    questionLatex: questionLatex,
    answerLatex: answerLatex,
    getNextQuestion: next,
    questionsAttempted: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questionsStreak: 0,
    questionsToMeet: 2,
    progressBar: 0,
    doneWithTopic: done
  });


  useEffect(() => {
    async function getTopics(unitName) {
      const response = await fetch(`http://localhost:5000/topic/${unitName}`)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const topics = await response.json();
      const unitTopics = topics.unitTopics;
      console.log(unitTopics);
      setTopics({topicId: unitTopics[0].topicId, topicsArray: unitTopics});
    }

    getTopics(unit);

    return;
  }, [unit]);



  function next(liftedState){
      //let [questionLatex, answerLatex] = simplePowerRuleWithNegativeExponentAndIntegerCoefficient(1, 5, 2, 7);
      let [questionLatex, answerLatex] = questionEngine();
      setQuestionState({
        questionEngine: simplePowerRule,
        questionLatex: questionLatex,
        answerLatex: answerLatex,
        getNextQuestion: next,
        questionsAttempted: liftedState.questionsAttempted,
        questionsCorrect: liftedState.questionsCorrect,
        questionsIncorrect: liftedState.questionsIncorrect,
        questionsStreak: liftedState.questionsStreak,
        questionsToMeet: 2,
        progressBar: Math.round((liftedState.questionsCorrect/questionState.questionsToMeet)*100),
        doneWithTopic: done,
      });
  }

  async function done(liftedState){
    const endTime = new Date()
    const totalTime = endTime - startTime;
    let sessionObj = {
      "userId": userId,
      "topicId": topicObj.topicId,
      "topicName": topicObj.topicName, // this is not needed if we have topicId
      "metStandard": true,
      "questionsAttempted": liftedState.questionsAttempted,
      "questionsCorrect": liftedState.questionsCorrect,
      "questionsIncorrect": liftedState.questionsIncorrect,
      "questionsStreak": liftedState.questionsStreak,
      "datetimeStarted": startTime,
      "totalTime": totalTime,
    }
    // I used this to add new topics
    // const response = await fetch("http://localhost:5000/topic/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(topicObj),
    // })
    // .catch(error => {
    //   window.alert(error);
    //   return; // is this right?
    // });
    // const stuff = await response.json()

    // await fetch("http://localhost:5000/session/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(sessionObj),
    // })
    // .catch(error => {
    //   window.alert(error);
    //   return; // is this right?
    // });
  }
  const changeEngine = function (e) {
    console.log(e.currentTarget.dataset.key);
    let topicId = e.currentTarget.dataset.key;
    let questionTopic = questionTopics[unit].find((topic) => topic.topicId == topicId);
    console.dir(questionTopic);
    let questionEngine = questionTopic.questionEngine;
    console.log(questionEngine);
    let topicArrayIndex = topics.topicsArray.findIndex((topic)=>topic.topicId==topicId);
    let questionsToMeet = topics.topicsArray[topicArrayIndex].topicData.standard;
    let [questionLatex, answerLatex] = questionEngine();
    setQuestionState({
      questionEngine: questionEngine,
      questionLatex: questionLatex,
      answerLatex: answerLatex,
      getNextQuestion: next,
      questionsAttempted: 0,
      questionsCorrect: 0,
      questionsIncorrect: 0,
      questionsStreak: 0,
      questionsToMeet: questionsToMeet,
      progressBar: 0,
      doneWithTopic: done
    });
  }

  function topicsList() {
    console.log(topics)
    return topics.topicsArray.map((topic) => {
      return (
        <div className="row" data-key={topic.topicId} key={topic.topicId} onClick={changeEngine}>
          <p>{topic.topicData.displayName}</p>
        </div>
      )
    })
  }

  return (
    <div>
      <div>
        {topicsList(topics)}
      </div>
      <p>{questionState.progressBar}</p>

      <h2 className="text-center mt-4">{topics.topicsArray[0].topicData.displayName}</h2>
              <p id="instructions" className="col-sm-12">{topics.topicsArray[0].topicData.prompt}</p>
      <div className="row">
        <p id="prompt" className="col-sm-8 offset-2 text-center mt-2">
          <StaticMathField>{ questionState.questionLatex }</StaticMathField>
        </p>
      </div>
        <AnswerForm
            questionState={questionState}
        />
      <div className="progressBar mt-4 col-8 offset-2">
        <ProgressBar now={questionState.progressBar} label={`${questionState.progressBar}%`} />
      </div>
    </div>
  );
}

function AnswerForm(props) {
  const [userObj, setUserAnswer] = useState({
    userAnswer: '\\3x^2',
    answerMessage: ''
  });

  function updateSituation(value) {
    return setUserAnswer((prev) => {
      return {...prev, ...value}
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let stateToLift = {
      questionsAttempted: props.questionState.questionsAttempted + 1,
      questionsCorrect: props.questionState.questionsCorrect,
      questionsStreak: props.questionState.questionsStreak,
      questionsIncorrect: props.questionState.questionsIncorrect,
    }

    let correctMessages = [
      `Yes, ${props.questionState.answerLatex} is correct!`,
      `Great, ${props.questionState.answerLatex} is a correct answer.`,
      `Exactly!`,
      `Yup, that's right . . .`,
      `You got it! ${props.questionState.answerLatex} is right.`,
      `Boom!!`,
      `Ka-ching. that's right!`,
      `Exacto!`,
      `Superb! ${props.questionState.answerLatex} is a correct answer`,
      `Right on! ${props.questionState.answerLatex} is a correct answer`,
      `Uh, huh, You got it. ${props.questionState.answerLatex} works.`,
      `That's it. ${props.questionState.answerLatex} is right. Keep it up!`,
    ];

    let incorrectMessages = [
      `Sorry, it's ${props.questionState.answerLatex}.`,
      `${props.questionState.answerLatex} is the answer I was looking for.`,
      `Not exactly. ${props.questionState.answerLatex} is a correct answer.`,
      `You got this! ${props.questionState.answerLatex} is what I was looking for.`,
      `This one was ${props.questionState.answerLatex}. You'll get the next one.`,
      `I was thinking, ${props.questionState.answerLatex}, but no sweat. You'll get it.`,
      `It's ${props.questionState.answerLatex}, but no worries, your moment is coming!`,
    ];

    let streakMessages = [
      `You are on a roll!`,
      `Keep it going . . .`,
      `Smoking hot!`,
      `You. Are. On. Fire!`,
      `Too good!!`,
      `OK, seems like you got this.`,
    ]


    let answerMessage = '';
    if (userObj.userAnswer == props.questionState.answerLatex) {
        stateToLift.questionsStreak = stateToLift.questionsStreak + 1;
        console.log(stateToLift.questionsStreak);
        if (stateToLift.questionsStreak < 4) {
          let index = getRandomIntInclusive(0, ((correctMessages.length)))
          answerMessage = correctMessages[index];
        } else {
          let index = stateToLift.questionsStreak - 4;
          answerMessage = streakMessages[index];
          if (index >= streakMessages.length) {
            stateToLift.questionsStreak = 0;
          }
        }
        stateToLift.questionsCorrect = stateToLift.questionsCorrect + 1;

    } else {
      let index = getRandomIntInclusive(0, ((incorrectMessages.length)))
      answerMessage = incorrectMessages[index];

      stateToLift.questionsInorrect = stateToLift.questionsIncorrect + 1;
      stateToLift.questionsStreak = 0
    }
    updateSituation({answerMessage: answerMessage, userAnswer: ''})
    props.questionState.getNextQuestion(stateToLift);
    if (stateToLift.questionsCorrect >= props.questionState.questionsToMeet) {
      props.questionState.doneWithTopic(stateToLift);
    }
  }

  return (
    <form id="questionArea" onSubmit={handleSubmit} method="post" action="#" role="form" className="col-sm-10 offset-1 mt-4">
      <div className="row input-group">
        <div className="col-sm-8 offset-2">
            <EditableMathField
              id="answerInput"
              className="form-control col-sm-6 text-center"
              aria-describedby="answer input"
              latex='\\sqrt[4]{x^3}'
              value={props.questionState.answerLatex} // does nothing?
              onChange={(mathField)=>updateSituation({userAnswer: mathField.latex()})}
            />
        </div>
      </div>
      <div className="row">
        <p id="answerFeedback" className="col-sm-12 text-center mt-3">{userObj.answerMessage}</p>
      </div>
      <div className="row">
        <button id="submitButton" type="submit" className="btn btn-success col-4 offset-4">SUBMIT</button>
      </div>
    </form>
  )
}
