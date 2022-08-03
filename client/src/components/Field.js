import React, { useState } from 'react'
import { addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

addStyles();

export default function Field () {
  return (
    <div className="container">
      <h3>Derivatives</h3>
        <Question />
        <Answer />
        <Feedback />

    </div>
  )
}

function Question() {

  let questionLatex = '\\frac{3}{\\sqrt{2}}\\cdot 2'
  return (
    <div className="row">
      <p>f(x) = <StaticMathField>{questionLatex}</StaticMathField></p>
    </div>
  );
}

function Answer() {
  const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')

  function handleSubmit(event) {
    alert('Latex was submitted: ' + latex);
    event.preventDefault();
  }
  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <EditableMathField
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex())
          }}
        />
        <p>{latex}</p>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function Feedback() {
  return (
    <div className="row">
      <p>Correct!</p>
      <p>Slider</p>
    </div>
  );
}
