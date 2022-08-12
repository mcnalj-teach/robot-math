import React, { useState, useEffect, useRef } from "react";
import { ProgressBar, Button, Offcanvas} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'
import '../App.scss';
import '../index.scss';
import './unit-circle.scss';
import {
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
} from './math-scripts/unit-circle-scripts.js';

const latexTest = 'f\\left(\\frac{\\pi}{2}\\right)'
const trigFunctionTest = 'f(\\theta) = sin(\\theta)'
const unit = "unit-circle";

const questionTopics = {
  "unit-circle": [
    {
      topicId: 10,
      questionEngine: sinAndCosFirstQuad,
    },
    {
      topicId: 20,
      questionEngine: sinAndCosFirstTwoQuad,
    },
    {
      topicId: 30,
      questionEngine: sinAndCosAllQuad,
    },
    {
      topicId: 40,
      questionEngine: tanFirstQuad,
    },
    {
      topicId: 50,
      questionEngine: tanFirstTwoQuad,
    },
    {
      topicId: 60,
      questionEngine: tanAllQuad
    },
    {
      topicId: 70,
      questionEngine: allTrigFirstQuad,
    },
    {
      topicId: 80,
      questionEngine: allTrigFirstTwoQuad,
    },
    {
      topicId: 90,
      questionEngine: allTrigAllQuad
    },
  ],
}
//addStyles();


export default function UnitCircle() {

  let [topics, setTopics] = useState(
    {
      topicId: 10,
      topicsArray: [{
        topicId: 10,
        topicData: {
          topicEngine: "sinAndCosFirstQuad",
          displayName: "Sine and Cosine (first quadrant)",
          description: "Evaluate the sine and cosine in the first quadarant.",
          prompt: "Evaluate the sine or cosine function at the given angle.",
          standard: 7,
        },
      }]
    });

  let trigFunctionLatex, angleNumber, angleLatex, answerObjectLatex, trigFunctionName;
  let questionNumber=1;
  let [questionEngine, setQuestionEngine] = useState({questionEngine: sinAndCosFirstQuad});
  console.log(questionEngine);
  let [trigFunction, setTrigFunction] = useState('f(\\theta) = sin(\\theta)');
  let [angle, setAngle] = useState("f\\left(\\frac{\\pi}{4}\\right)")
  let [userAnswer, setAnswer] = useState("")
  let [angleMeasureNumber, setAngleMeasureNumber] = useState(0);
  let [answerMessage, setAnswerMessage] = useState("");
  let [correctAnswerLatex, setCorrectAnswerLatex] = useState("");
  let progressStateObj = {
    questionsAttempted: 0,
    questionsCorrect: 0,
    questionsIncorrect: 0,
    questionsStreak: 0,
    questionsToMeet: 2,
    progressBar: 0,
  }
  let [progressState, setProgressState] = useState(progressStateObj);
  let [topicArrayIndex, setTopicArrayIndex] = useState(0);

  function handleSubmit(event){
    event.preventDefault()
    progressState.questionsAttempted = progressState.questionsAttempted + 1;
    if (userAnswer == correctAnswerLatex) {
      progressState.questionsCorrect = progressState.questionsCorrect + 1;
      progressState.questionsStreak = progressState.questionsStreak + 1;
      progressState.progressBar = Math.round((progressState.questionsCorrect/progressState.questionsToMeet)*100);
      if (progressState.questionsCorrect == progressState.questionsToMeet) {
       setAnswerMessage("you hit the limit");
      } else {
       setAnswerMessage("getting there");
      }
    } else {
      progressState.questionsIncorrect = progressState.questionsIncorrect + 1;
      progressState.questionsStreak = 0;
      setAnswerMessage(`Sorry, I was looking for ${correctAnswerLatex}.`);
    }
    // if (!questionEngine) {
    //   [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = sinAndCosFirstQuad();
    // } else {
    //   [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = questionEngine();
    // }
    [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = questionEngine.questionEngine();
    setTrigFunction(trigFunctionLatex);
    setAngle(angleLatex);
    setAngleMeasureNumber(angleNumber);
    correctAnswerLatex = answerObjectLatex[trigFunctionName];
    setCorrectAnswerLatex(correctAnswerLatex);
    questionNumber = questionNumber + 1;
  }

  useEffect(()=> {
    async function getTopics(unitName) {
      const response = await fetch(`http://localhost:5000/topic/${unitName}`)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const topics = await response.json();
      const unitTopics = topics.unitTopics;
      setTopics({topicId: unitTopics[0].topicId, topicsArray: unitTopics});
  // This was added. Copied used state and added this additional setState
    //   console.log("set state here?")
    //   let [questionLatex, answerLatex] = questionEngine();
    //   setQuestionState(
    //     {
    //       questionEngine: questionEngine,
    //       questionLatex: questionLatex,
    //       answerLatex: answerLatex,
    //       getNextQuestion: next,
    //       questionsAttempted: 0,
    //       questionsCorrect: 0,
    //       questionsIncorrect: 0,
    //       questionsStreak: 0,
    //       questionsToMeet: unitTopics[0].topicData.standard,
    //       progressBar: 0,
    //       doneWithTopic: done,
    //       questionTopic: unitTopics[0].topicData.displayName,
    //       questionPrompt: unitTopics[0].topicData.prompt,
    //     }
    //   )
    // }
    }
    getTopics(unit);

    return;
  }, [unit]);

  useEffect(()=>{
    console.log(questionEngine);
    // if (!questionEngine) {
    //   [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = sinAndCosFirstQuad();
    // } else {
    //   [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = questionEngine();
    // }
    [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = questionEngine.questionEngine();
    // [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = sinAndCosFirstQuad();
    //[trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = questionEngine();
    setTrigFunction(trigFunctionLatex);
    setAngle(angleLatex);
    setAngleMeasureNumber(angleNumber);
    correctAnswerLatex = answerObjectLatex[trigFunctionName];
    setCorrectAnswerLatex(correctAnswerLatex);
  }, [questionNumber])

// TODO we need to update some state after we change the questionEngine
// We need to create the question engines
  const changeEngine = function (e) {
    console.log("Got to change Engine");
    let topicId = e.currentTarget.dataset.key;
    let questionTopic = questionTopics[unit].find((topic) => topic.topicId == topicId);
    let questionEngine = questionTopic.questionEngine;
    let topicArrayIndex = topics.topicsArray.findIndex((topic)=>topic.topicId==topicId);
    let standard = (topics.topicsArray[topicArrayIndex].topicData.standard);
    //let [questionLatex, answerLatex] = questionEngine();
    console.log(questionEngine);
    [trigFunctionLatex, trigFunctionName, angleNumber, angleLatex, answerObjectLatex] = questionEngine();
    setTrigFunction(trigFunctionLatex);
    setAngle(angleLatex);
    setAngleMeasureNumber(angleNumber);
    correctAnswerLatex = answerObjectLatex[trigFunctionName];
    setCorrectAnswerLatex(correctAnswerLatex);
    setQuestionEngine({questionEngine: questionEngine});
    setTopicArrayIndex(topicArrayIndex);
    // setQuestionState({
    //   questionEngine: questionEngine,
    //   questionLatex: questionLatex,
    //   answerLatex: answerLatex,
    //   getNextQuestion: next,
    //   questionsAttempted: 0,
    //   questionsCorrect: 0,
    //   questionsIncorrect: 0,
    //   questionsStreak: 0,
    //   questionsToMeet: standard,
    //   progressBar: 0,
    //   doneWithTopic: done,
    //   questionTopic: topics.topicsArray[topicArrayIndex].topicData.displayName,
    //   questionPrompt: topics.topicsArray[topicArrayIndex].topicData.prompt,
    // });
  }

  function topicsList() {
    console.dir(topics)
    return topics.topicsArray.map((topic) => {
      return (
        <div className="row" data-key={topic.topicId} key={topic.topicId} onClick={changeEngine}>
          <a>{topic.topicData.displayName}</a>
        </div>
      )
    })
  }

  return (
    <div>
      <h2 className="text-center">{topics.topicsArray[topicArrayIndex].topicData.displayName}</h2>
      <p id="instructions" className="text-center">{topics.topicsArray[topicArrayIndex].topicData.prompt}</p>
      <div className="row">
        <div className="col-10 offset-1">
          <Canvas angleMeasureNumber={angleMeasureNumber}/>
        </div>
      </div>
      <div className="row">
        <p id="unitFunction" className="col-sm-8 offset-2 text-center mt-2">
          <StaticMathField>{trigFunction}</StaticMathField>
        </p>
      </div>
      <div className="row">
        <form id="questionArea" onSubmit={handleSubmit} method="post" action="#" role="form" className="col-sm-10 offset-1 mt-4">
          <div className="row input-group">
            <p id="unitPrompt" className="col-sm-5 text-center mt-2">
              <StaticMathField>{angle} =</StaticMathField>
            </p>
            <EditableMathField
              id="unitAnswerInput"
              className="form-control col-sm-5 text-center"
              aria-describedby="answer input"
              latex={userAnswer}
              onFocus={()=>setAnswer("")}
              onChange={(mathfield)=>setAnswer(mathfield.latex())}
            />
          </div>
          <div className="row">
            <p id="answerFeedback" className="col-sm-12 text-center mt-3">{answerMessage}</p>
          </div>
          <div className="row">
            <button id="submitButton" type="submit" className="btn btn-success col-4 offset-4">SUBMIT</button>
          </div>
        </form>
      </div>
      <div className="progressBar mt-4 mb-4 col-8 offset-2">
        <ProgressBar now={progressState.progressBar} label={`${progressState.progressBar}%`} max='100'/>
      </div>
      <Sidebar function={topicsList}/>
    </div>
  );
}


function Sidebar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="col-sm-4 offset-4" id="changeTopics">
        CHANGE TOPICS
      </Button>

      <Offcanvas show={show} onHide={handleClose} style={{backgroundColor: "#E7E7E7", color: "#003348", paddingTop: "2em", fontSize: "1.3em"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{fontSize: "1.6em"}}>TOPICS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.function()}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
// Sort through this to reduce bluriness of unit UnitCircle
// Understanding and Fixing Blurry HTML Canvases, by Alexander Jhin
// const myCanvas = document.getElementById("myCanvas");
// const originalHeight = myCanvas.height;
// const originalWidth = myCanvas.width;
// render();
// function render() {
//   let dimensions = getObjectFitSize(
//     true,
//     myCanvas.clientWidth,
//     myCanvas.clientHeight,
//     myCanvas.width,
//     myCanvas.height
//   );
//   const dpr = window.devicePixelRatio || 1;
//   myCanvas.width = dimensions.width * dpr;
//   myCanvas.height = dimensions.height * dpr;
//
//   let ctx = myCanvas.getContext("2d");
//   let ratio = Math.min(
//     myCanvas.clientWidth / originalWidth,
//     myCanvas.clientHeight / originalHeight
//   );
//   ctx.scale(ratio * dpr, ratio * dpr); //adjust this!
//   ctx.beginPath();
//   ctx.arc(50, 50, 50, 0, 2 * Math.PI);
//   ctx.stroke();
// }
//
// // adapted from: https://www.npmjs.com/package/intrinsic-scale
// function getObjectFitSize(
//   contains /* true = contain, false = cover */,
//   containerWidth,
//   containerHeight,
//   width,
//   height
// ) {
//   var doRatio = width / height;
//   var cRatio = containerWidth / containerHeight;
//   var targetWidth = 0;
//   var targetHeight = 0;
//   var test = contains ? doRatio > cRatio : doRatio < cRatio;
//
//   if (test) {
//     targetWidth = containerWidth;
//     targetHeight = targetWidth / doRatio;
//   } else {
//     targetHeight = containerHeight;
//     targetWidth = targetHeight * doRatio;
//   }
//
//   return {
//     width: targetWidth,
//     height: targetHeight,
//     x: (containerWidth - targetWidth) / 2,
//     y: (containerHeight - targetHeight) / 2
//   };
// }

function Canvas(props) {
  const canvasRef = useRef(null)

  useEffect(() => {

    displayUnitCircle(props.angleMeasureNumber);
    function displayUnitCircle(anglePick) {

    const canvas = document.getElementById("unitCircle");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // TODO - This is only used in drawAngleFraction. Get the info into anglesArray and remove this.
    var angleArray = [
      [1, 1], [1, 12], [1, 6], [1, 4], [1, 3], [5, 12],
      [1, 2], [7, 12], [2, 3], [3, 4], [5, 6], [11, 12],
      [1, 1], [13, 12], [7, 6], [5, 4], [4, 3], [17, 12],
      [3, 2], [19, 12], [5, 3], [7, 4], [11, 6], [23, 12],
    ];

    // TODO - What is the minimum amount of information we need here and in drawCoordinate Pairs? Optimize.
    var anglesArray = [
      {
        angleNum: 0,
        angleDenom: 1,
        xCoordNum: "1",
        xCoordDenom: "1",
        xPositive: true,
        yCoordNum: "0",
        yCoordDenom: "1",
        yPositive: true,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 1,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: true,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: true,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 1,
        angleDenom: 6,
        xCoordNum: "√3",
        xCoordDenom: "2",
        xPositive: true,
        yCoordNum: "1",
        yCoordDenom: "2",
        yPositive: true,
        xOffset: 6,
        yOffset: 7,
      },
      {
        angleNum: 1,
        angleDenom: 4,
        xCoordNum: "√2",
        xCoordDenom: "2",
        xPositive: true,
        yCoordNum: "√2",
        yCoordDenom: "2",
        yPositive: true,
        xOffset: 6,
        yOffset: 5,
      },
      {
        angleNum: 1,
        angleDenom: 3,
        xCoordNum: "1",
        xCoordDenom: "2",
        xPositive: true,
        yCoordNum: "√3",
        yCoordDenom: "2",
        yPositive: true,
        xOffset: 2,
        yOffset: 0,
      },
      {
        angleNum: 5,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: true,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: true,
        xOffset: 2,
        yOffset: 0,
      },
      {
        angleNum: 1,
        angleDenom: 2,
        xCoordNum: "0",
        xCoordDenom: "1",
        xPositive: true,
        yCoordNum: "1",
        yCoordDenom: "1",
        yPositive: true,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 7,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: false,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: true,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 2,
        angleDenom: 3,
        xCoordNum: "1",
        xCoordDenom: "2",
        xPositive: false,
        yCoordNum: "√3",
        yCoordDenom: "2",
        yPositive: true,
        xOffset: -18,
        yOffset: 0,
      },
      {
        angleNum: 3,
        angleDenom: 4,
        xCoordNum: "√2",
        xCoordDenom: "2",
        xPositive: false,
        yCoordNum: "√2",
        yCoordDenom: "2",
        yPositive: true,
        xOffset: -22,
        yOffset: 6,
      },
      {
        angleNum: 5,
        angleDenom: 6,
        xCoordNum: "√3",
        xCoordDenom: "2",
        xPositive: false,
        yCoordNum: "1",
        yCoordDenom: "2",
        yPositive: true,
        xOffset: -22,
        yOffset: 8,
      },
      {
        angleNum: 11,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: false,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: true,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 1,
        angleDenom: 1,
        xCoordNum: "-1",
        xCoordDenom: "1",
        xPositive: false,
        yCoordNum: "0",
        yCoordDenom: "1",
        yPositive: true,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 13,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: false,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: false,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 7,
        angleDenom: 6,
        xCoordNum: "√3",
        xCoordDenom: "2",
        xPositive: false,
        yCoordNum: "1",
        yCoordDenom: "2",
        yPositive: false,
        xOffset: -24,
        yOffset: -8,
      },
      {
        angleNum: 5,
        angleDenom: 4,
        xCoordNum: "√2",
        xCoordDenom: "2",
        xPositive: false,
        yCoordNum: "√2",
        yCoordDenom: "2",
        yPositive: false,
        xOffset: -24,
        yOffset: -6,
      },
      {
        angleNum: 4,
        angleDenom: 3,
        xCoordNum: "1",
        xCoordDenom: "2",
        xPositive: false,
        yCoordNum: "√3",
        yCoordDenom: "2",
        yPositive: false,
        xOffset: -18,
        yOffset: 0,
      },
      {
        angleNum: 17,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: false,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: false,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 3,
        angleDenom: 2,
        xCoordNum: "0",
        xCoordDenom: "1",
        xPositive: true,
        yCoordNum: "-1",
        yCoordDenom: "1",
        yPositive: false,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 19,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: true,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: false,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 5,
        angleDenom: 3,
        xCoordNum: "1",
        xCoordDenom: "2",
        xPositive: true,
        yCoordNum: "√3",
        yCoordDenom: "2",
        yPositive: false,
        xOffset: 0,
        yOffset: 0,
      },
      {
        angleNum: 7,
        angleDenom: 4,
        xCoordNum: "√2",
        xCoordDenom: "2",
        xPositive: true,
        yCoordNum: "√2",
        yCoordDenom: "2",
        yPositive: false,
        xOffset: 6,
        yOffset: -6,
      },
      {
        angleNum: 11,
        angleDenom: 6,
        xCoordNum: "√3",
        xCoordDenom: "2",
        xPositive: true,
        yCoordNum: "1",
        yCoordDenom: "2",
        yPositive: false,
        xOffset: 6,
        yOffset: -10,
      },
      {
        angleNum: 23,
        angleDenom: 12,
        xCoordNum: "",
        xCoordDenom: "",
        xPositive: true,
        yCoordNum: "",
        yCoordDenom: "",
        yPositive: false,
        xOffset: 0,
        yOffset: 0,
      },
    ];

    drawUnitCircleWithTriangleAtAngle()

    // TODO How do I eliminate anglesPick and anglesArray as globals?
    function drawUnitCircleWithTriangleAtAngle() {
      ctx.textAlign = "center";
      ctx.textBaseline ="middle";
      drawCircleAndAxes();
      drawAngleLines(Math.PI / 12);
    }

    function drawTriangle(iNum) {
      var theta = (iNum * Math.PI)/12
      ctx.beginPath();
      ctx.moveTo(150, 150)
      ctx.strokeStyle = "#E7E7E7";
      ctx.lineWidth = 1.75;
      ctx.lineTo(150 + 80 * (Math.cos(theta)), 150 - 80 * (Math.sin(theta)))
      ctx.moveTo(150 + 90 * (Math.cos(theta)), 150 - 90 * (Math.sin(theta)));
      ctx.lineTo(150 + 100 * (Math.cos(theta)), 150 - 100 * (Math.sin(theta)))
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(150 + 100 * (Math.cos(theta)), 150 - 100 * (Math.sin(theta)))
      ctx.strokeStyle = "green";
      ctx.lineTo(150 + 100 * (Math.cos(theta)), 150);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(150 + 100 * (Math.cos(theta)), 150);
      ctx.strokeStyle = "blue";
      ctx.lineTo(150, 150);
      ctx.stroke();
      ctx.strokeStyle = "#E7E7E7";
    }

    function drawAngleLines(angle) {
      var skipThese = [1, 5, 7, 11, 13, 17, 19];
      for (var i = 0; i < 23; i++) {
        if (skipThese.includes(i)) {
          continue;
        } else {
          drawAngleLine(angle * i);
          drawCoordinateDot(angle * i);
          if (i == 0) {
            drawInteger("0", angle * i);
            drawCoordinatePairs(i);
          } else if (i == 12) {
            drawInteger ("π", angle * i);
            drawCoordinatePairs(i);
          } else {
            drawAngleFraction(i);
            drawCoordinatePairs(i);
          }
        }
      }
    }

    function drawCoordinatePairs(i) {
      if (i == 0) {
        var xLoc = 150 + 115;
        var yLoc = 150 + 12;
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawIntegerXCoordinate(i, xLoc, yLoc)
          ctx.fillStyle = "green";
          drawIntegerYCoordinate(i, xLoc + 14, yLoc)
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawIntegerXCoordinate(i, xLoc, yLoc)
          drawIntegerYCoordinate(i, xLoc + 14, yLoc)
        }
        drawComma(xLoc + 5, yLoc);
        drawParens(xLoc - 7, yLoc, xLoc + 20, yLoc);
      } else if (i == 2) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 9, yLoc, xLoc + 26, yLoc);
      } else if (i == 3) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 9, yLoc, xLoc + 26, yLoc);
      } else if (i == 4) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 9, yLoc, xLoc + 26, yLoc);
      } else if (i == 6) {
        var xLoc = 162;
        var yLoc = 38;
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawIntegerXCoordinate(i, xLoc, yLoc);
          ctx.fillStyle = "green";
          drawIntegerYCoordinate(i, xLoc + 14, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawIntegerXCoordinate(i, xLoc, yLoc);
          drawIntegerYCoordinate(i, xLoc + 14, yLoc);
        }
        drawComma(xLoc + 5, yLoc);
        drawParens(xLoc - 7, yLoc, xLoc + 20, yLoc);
      } else if (i == 8) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 12, yLoc, xLoc + 26, yLoc);
      } else if (i == 9) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 12, yLoc, xLoc + 26, yLoc);
      } else if (i == 10) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 16, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 12, yLoc, xLoc + 26, yLoc);
      } else if (i == 12) {
        var xLoc = 22;
        var yLoc = 138;
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawIntegerXCoordinate(i, xLoc, yLoc)
          ctx.fillStyle = "green";
          drawIntegerYCoordinate(i, xLoc + 14, yLoc)
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawIntegerXCoordinate(i, xLoc, yLoc)
          drawIntegerYCoordinate(i, xLoc + 14, yLoc)
        }
        drawComma(xLoc + 5, yLoc);
        drawParens(xLoc - 7, yLoc, xLoc + 20, yLoc);
      } else if (i == 14) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 12, yLoc, xLoc + 28, yLoc);
      } else if (i == 15) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 12, yLoc, xLoc + 28, yLoc);
      } else if (i == 16) {
        var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
        var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          ctx.fillStyle = "green";
          drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawNegativeFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
          drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
        }
        drawComma(xLoc + 6, yLoc + 6);
        drawParens(xLoc - 12, yLoc, xLoc + 28, yLoc);
      } else if (i == 18) {
        var xLoc = 125;
        var yLoc = 262;
        if (i == anglePick) {
          drawTriangle(i);
          ctx.fillStyle = "blue";
          drawIntegerXCoordinate(i, xLoc, yLoc)
          ctx.fillStyle = "green";
          drawIntegerYCoordinate(i, xLoc + 14, yLoc)
          ctx.fillStyle = "#E7E7E7";
        } else {
          drawIntegerXCoordinate(i, xLoc, yLoc)
          drawIntegerYCoordinate(i, xLoc + 14, yLoc)
        }
        drawComma(xLoc + 5, yLoc);
        drawParens(xLoc - 7, yLoc, xLoc + 20, yLoc);
      } else if (i == 20) {
          var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
          var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
          if (i == anglePick) {
            drawTriangle(i);
            ctx.fillStyle = "blue";
            drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
            ctx.fillStyle = "green";
            drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
            ctx.fillStyle = "#E7E7E7";
          } else {
            drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
            drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
          }
          drawComma(xLoc + 6, yLoc + 6);
          drawParens(xLoc - 9, yLoc, xLoc + 28, yLoc);
      } else if (i == 21) {
          var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
          var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
          if (i == anglePick) {
            drawTriangle(i);
            ctx.fillStyle = "blue";
            drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
            ctx.fillStyle = "green";
            drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
            ctx.fillStyle = "#E7E7E7";
          } else {
            drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
            drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
          }
          drawComma(xLoc + 6, yLoc + 6);
          drawParens(xLoc - 9, yLoc, xLoc + 28, yLoc);
        } else if (i == 22) {
            var xLoc = 150 + 115 * (Math.cos((i*Math.PI) / 12)) + anglesArray[i]["xOffset"];
            var yLoc = 150 - 115 * (Math.sin((i*Math.PI) / 12)) + anglesArray[i]["yOffset"];
            if (i == anglePick) {
              drawTriangle(i);
              ctx.fillStyle = "blue";
              drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
              ctx.fillStyle = "green";
              drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
              ctx.fillStyle = "#E7E7E7";
            } else {
              drawFraction(anglesArray[i]["xCoordNum"], anglesArray[i]["xCoordDenom"], xLoc, yLoc);
              drawNegativeFraction(anglesArray[i]["yCoordNum"], anglesArray[i]["yCoordDenom"], xLoc + 18, yLoc);
            }
            drawComma(xLoc + 6, yLoc + 6);
            drawParens(xLoc - 9, yLoc, xLoc + 28, yLoc);
          }
    }

    function drawIntegerXCoordinate(i, x, y) {
      ctx.font = "12px Garamond";
      ctx.fillText(anglesArray[i]["xCoordNum"], x, y);
    }

    function drawIntegerYCoordinate(i, x, y) {
      ctx.font = "12px Garamond";
      ctx.fillText(anglesArray[i]["yCoordNum"], x, y);
    }

    function drawFraction(num, denom, x, y) {
      ctx.font = "10px Garamond";
      var numUp = 4;
      var denomDown = 6;
      var dashUp = 3;
      var dash = "__"
      ctx.fillText(num, x, y - numUp);
      ctx.fillText(dash, x, y - dashUp);
      ctx.fillText(denom, x, y + denomDown);
    }

    function drawNegativeFraction(num, denom, x, y) {
      ctx.font = "10px Garamond";
      var numUp = 4;
      var denomDown = 6;
      var dashUp = 3;
      var dash = "__";
      var negative = "-";
      var negativeLeft = 8;
      ctx.fillText(negative, x - negativeLeft, y);
      ctx.fillText(num, x, y - numUp);
      ctx.fillText(dash, x, y - dashUp);
      ctx.fillText(denom, x, y + denomDown);
    }

    function drawComma(x, y) {
      ctx.font = "14px Garamond";
      ctx.fillText(",", x, y);
    }

    function drawParens(leftX, leftY, rightX, rightY) {
        ctx.font = "18px Garamond";
        var leftParen = "(";
        var rightParen = ")";
        ctx.fillText(leftParen, leftX, leftY);
        ctx.fillText(rightParen, rightX, rightY);
    }

    function drawAngleFraction(count) {
      var numCalc = parseInt(angleArray[count]);
      var numShow = (angleArray[count][0] == 1) ? "π" : angleArray[count][0] + "π";
      var denom = angleArray[count][1];
      var fAngle = (numCalc * Math.PI)/denom;
      drawFraction(numShow, denom, 150 + 85 * (Math.cos(fAngle)), 150 - 85 * (Math.sin(fAngle)) )
    }

    function drawCoordinateDot(angle) {
      ctx.beginPath();
      ctx.moveTo(150 + 100 * (Math.cos(angle)), 150 - 100 * (Math.sin(angle)))
      ctx.arc(150 + 100 * (Math.cos(angle)), 150 - 100 * (Math.sin(angle)), 2, 0, 2*Math.PI)
      ctx.fill();
      ctx.stroke();
    }

    function drawAngleLine(angle) {
      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.lineWidth = 0.25;
      ctx.lineTo(150 + 80 * (Math.cos(angle)), 150 - 80 * (Math.sin(angle)))
      ctx.moveTo(150 + 90 * (Math.cos(angle)), 150 - 90 * (Math.sin(angle)));
      ctx.lineTo(150 + 100 * (Math.cos(angle)), 150 - 100 * (Math.sin(angle)))
      ctx.stroke();
    }

    function drawInteger(int, intAngle) {
      ctx.font = "12px Garamond";
      ctx.fillText(int, 150 + 85 * (Math.cos(intAngle)), 150 - 85 * (Math.sin(intAngle)))
    }

    function drawCircleAndAxes() {
      drawOuterCircle();
      drawXAxis();
      drawYAxis();
    }

    function drawOuterCircle() {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.arc(150, 150, 100, 0, 2 * Math.PI);
      ctx.stroke();
    }

    function drawXAxis() {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.moveTo(15, 150);
      ctx.lineTo(285, 150);
      ctx.stroke();
      ctx.fillText("x", 270, 142);
      drawArrow(285, 150, 6, 7, "right");
      drawArrow(15, 150, 6, 7, "left");
    }

    function drawYAxis() {
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.moveTo(150, 285);
      ctx.lineTo(150, 15);
      ctx.stroke();
      ctx.fillText("y", 142, 30);
      drawArrow(150, 15, 6, 7, "up");
      drawArrow(150, 285, 6, 7, "down");
    }

    function drawArrow(x, y, width, height, direction) {
      var halfWidth = width/2;
      ctx.beginPath()
      ctx.moveTo(x, y);
      switch(direction) {
        case "right":
          ctx.lineTo(x - height, y - halfWidth);
          ctx.lineTo(x - height, y + halfWidth);
          break;
        case "left":
          ctx.lineTo(x + height, y - halfWidth);
          ctx.lineTo(x + height, y + halfWidth);
          break;
        case "up":
          ctx.lineTo(x - halfWidth, y + height);
          ctx.lineTo(x + halfWidth, y + height);
          break;
        case "down":
          ctx.lineTo(x - halfWidth, y - height);
          ctx.lineTo(x + halfWidth, y - height);
          break;
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    }
  }, [props.angleMeasureNumber])

  return (
    <canvas ref={canvasRef} id="unitCircle" width="300" height="300" />
  )
}
