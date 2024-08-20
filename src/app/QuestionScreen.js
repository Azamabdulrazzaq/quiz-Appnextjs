"use client"
import React, { useEffect, useRef, useState } from 'react'
import { quiz } from '@/app/AllQuestions'

const QuestionScreen = ({ name }) => {
    const [activeQuestions, setActiveQuestions] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("")
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [isChecked, setIsChecked] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(Math.floor(time))
    const [isPaused, setIsPaused] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [visible, setVisible] = useState(false)
    const timerRef = useRef(null)
    const [quizResult, setQuizResult] = useState({
        score: 0,
        correctAnswer: 0,
        inCorectAnswer: 0,
        totalTime: 0
    })

    const { questions } = quiz;
    const { question, answer, options } = questions[activeQuestions]
    console.log(questions[activeQuestions])

    const addLeadingZero = (number) => {
        return number < 10 ? number : 0 + number
    }

    const formatTime = (time) => {
        const minute = Math.floor(time / 60);
        setMinutes(minute)
        console.log(minute)
        const second = time % 60;
        setSeconds(second)
        console.log(second)
        return `${addLeadingZero(minutes)} : ${addLeadingZero(seconds)}`
    }

    const startTimer = (time) => {
        const timeRemaining = time * 60;
        const interval = setInterval(() => {
            if (!isPaused) {
                timeRemaining--
                setElapsedTime(elapsedTime + 1)

                if (timeRemaining <= 0) {
                    clearInterval(interval)
                    setVisible(true)
                }

            } else {
                formatTime(timeRemaining)
            }
        }, 1000)
        return interval
    }

    useEffect(() => {
        const interval = startTimer();
        return () => clearInterval(interval);
    }, [isPaused])


    const onSelectedAnswer = (answers, index) => {
        setCurrentAnswer(answers)
        setSelectedAnswerIndex(index)
        setIsChecked(true)
        if (answers == answer) {
            setCurrentAnswer(true)
        }
        else {
            setCurrentAnswer(false)
        }
    }

    const nextQuestions = () => {
        if (currentAnswer == answer) {
            setQuizResult((prev) => ({
                ...prev,
                score: prev.score + 5,
                correctAnswer: prev.correctAnswer + 1
            }))
        }
        else {
            setQuizResult((prev) => ({
                ...prev,
                inCorectAnswer: prev.inCorectAnswer + 1
            }))
        }

        if (activeQuestions !== questions.length - 1) {
            setActiveQuestions((prev) => prev + 1)
        }
        else {
            setShowResult(true)
        }
        setCurrentAnswer("");
        setSelectedAnswerIndex(null)
        setIsChecked(false)
    }

    return (
        <div className='main-container'>
            <div>
                <h2 className='text'>
                    {activeQuestions + 1}/
                    <span>{questions.length}</span>
                </h2>
            </div>
            <div className={"question-container"}>
                {!showResult ? (
                    <div className='quiz-container'>
                        <h1 className={"question-text"}>{question}</h1>
                        <ul className='ul'>
                            {
                                options.map((answers, index) => (
                                    <li key={index}
                                        onClick={() => onSelectedAnswer(answers, index)}
                                        className={
                                            selectedAnswerIndex === index ? "li-selected" : "list"
                                        }
                                    >
                                        {answers}
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            {isChecked ? (
                                <button type={"submit"} className={"btn"} onClick={nextQuestions}>
                                    {activeQuestions == questions.length - 1 ? "Finish" : "Next"}
                                </button>
                            ) : (
                                <button type={'submit'} className={"btn"} disabled onClick={nextQuestions}>
                                    {" "}
                                    {activeQuestions == questions.length - 1 ? "Finish" : "Next"}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (<div className='quiz-container2'></div>)}
            </div>
        </div>
    )
}

export default QuestionScreen