"use client"
import { useState } from 'react';
import Start from './components/start.js'
import {decode} from 'html-entities';
import Question from './components/question.js';
import { nanoid } from 'nanoid'
import styles from './components/main.module.css'

export default function Home() {
  const [question, setQuestion] = useState([])
  const [start, setStart] = useState(false)
  const [checkBtn, setCheckBtn] = useState(false)
  const [tryAgainBtn, setTryAgainBtn] = useState(false)
  const [correct, setCorrect] = useState(0)

  async function getQuestions(){
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await response.json();
        dataHandler(data.results);
    } catch (error) {
        getQuestions()
    }
}

    function dataHandler(data){
      const decodedQuestion = data.map(prevQuestion => {
        return {...prevQuestion, 
          question: decode(prevQuestion.question), 
          id: nanoid(),
          incorrect_answers: decode(prevQuestion.incorrect_answers), 
          correct_answer: decode(prevQuestion.correct_answer)}
      })
      addId(decodedQuestion)
  }
  
  function addId(addingId){
    const allAnswers = addingId.map(currentEl => {
    const obj = {...currentEl.incorrect_answers, correct_answer: currentEl.correct_answer}
    const arr = Object.values(obj)
    arr.sort(()=> Math.random()-0.5)
    const arrWithId = arr.map(value => {
      return {
        id: nanoid(),
        answer: value, 
        isHeld: false, 
        questionId: currentEl.id, 
        isCorrect: false,
      isIncorrect: false}
    })
    return arrWithId
  })
  combine(allAnswers, addingId)
}

function combine(allAns, allQuest){
  let popi = []
    for(let i=0; i<5; i++){
      const EverythingArray = {...allQuest[i], answers: allAns[i]}
      popi.push(EverythingArray)
  }
  setQuestion(popi)
  setStart(true)
  setCheckBtn(true)
  setTryAgainBtn(false)
}
  
  let quest = question.map(currentQuestion => {
      return (
        <Question 
        question={currentQuestion.question} 
        id={currentQuestion.id}
        key={currentQuestion.id}
        correctAns={currentQuestion.correct_answer}
        answers={currentQuestion.answers}
        clickHandler={(e) => holdAnswer(e.target.id, e.target.parentElement.parentElement.id)}
          
        />
      )
    })

    function holdAnswer(id, questionId) {
      setQuestion(prevState => {
        let ans2 = []
        let ans3 = []
        let isHeldFound = false 
    
        prevState.forEach(answers => {
          let ans1 = []
          for (let ans of answers.answers) {
            if (ans.questionId === questionId) { 
              if (ans.id === id) { 
                ans.isHeld = true 
                isHeldFound = true
              } else {
                ans.isHeld = false 
              }
            }
            ans1.push(ans)
          }
          ans2 = {...answers, answers: ans1}
          ans3.push(ans2)
        })
    
        if (!isHeldFound) { 
          prevState.forEach(answers => {
            let ans1 = []
    
            for (let ans of answers.answers) {
              if (ans.questionId === questionId) { 
                if (ans.id === id) { 
                  ans.isHeld = true 
                } else {
                  ans.isHeld = false
                }
              }
              ans1.push(ans)
            }
            ans2 = {...answers, answers: ans1}
            ans3.push(ans2)
          })
        }
        return ans3
      })
    }

    function checkAnswers(){
      setQuestion(prevState => {
        let ans2 = []
        let ans3 = []
        let correctAns = 0
        prevState.forEach(answers => {
          let ans1 = []
          for(let ans of answers.answers){
            if(ans.isHeld && ans.answer === answers.correct_answer){
              ans.isCorrect = true
              correctAns++
            }
            else if(ans.isHeld && ans.answer != answers.correct_answer){
              ans.isIncorrect = true
            }
            else if(ans.answer === answers.correct_answer){
              ans.isCorrect = true
            }
            ans1.push(ans)
          }
          ans2 = {...answers, answers: ans1}
          ans3.push(ans2)
        })
        setCorrect(correctAns)
        setCheckBtn(false)
        setTryAgainBtn(true)
        return ans3
      })
    }
  
  return (
    <main>
    <Start clickHandler={getQuestions} start={start}/>
    {quest}
    <button className={checkBtn ? styles.btn: styles.start} onClick={checkAnswers}>Check answers</button>
    <button className={tryAgainBtn ? styles.btn : styles.start} onClick={getQuestions}>Try again!</button>
    <h4 className={tryAgainBtn ? styles.score : styles.start}>{correct} OUT OF 5!</h4>
    </main>
  )
}
