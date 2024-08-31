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
    const [minutes, setMinutes] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [visible, setVisible] = useState(false)
    const [timeExpire, setTimeExpire] = useState(false)
    const timerRef = useRef(null)
    const [quizResult, setQuizResult] = useState({
        score: 0,
        correctAnswer: 0,
        inCorrectAnswer: 0,
        totalTime: 0
    })

    const { questions } = quiz;
    const { question, answer, options } = questions[activeQuestions]
    console.log(questions[activeQuestions])

    const addLeadingZero = (number) => {
        return number < 10 ? "0" + number : number
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${addLeadingZero(minutes)} : ${addLeadingZero(seconds)}`
    }

    // const startTimer = (time) => {
    //     const timeRemaining = time * 60;
    //     const interval = setInterval(() => {
    //         if (!isPaused) {
    //             timeRemaining--
    //             setElapsedTime(elapsedTime + 1)

    // if (timeRemaining <= 0) {
    //     clearInterval(interval)
    //     setVisible(true)
    // }

    //         } else {
    //             formatTime(timeRemaining)
    //         }
    //     }, 1000)
    //     return interval
    // }

    useEffect(() => {

        if (!isPaused && !showResult && !timeExpire) {
            timerRef.current = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1)
            }, 1000);
        }

        if (elapsedTime >= 600) {
            clearInterval(timerRef.current)
            setTimeExpire(true)
            setShowResult(true)
            setQuizResult((prev) => ({
                ...prev,
                totalTime: elapsedTime
            }))
        }
        return () => clearInterval(timerRef.current);
    }, [isPaused, showResult, elapsedTime, timeExpire])

    useEffect(() => {
        setMinutes(Math.floor(elapsedTime / 60));
        setSeconds(elapsedTime % 60)
    }, [elapsedTime]);


    const onSelectedAnswer = (answers, index) => {
        setCurrentAnswer(answers)
        setSelectedAnswerIndex(index)
        setIsChecked(true)
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
                inCorrectAnswer: prev.inCorrectAnswer + 1
            }))
        }

        if (activeQuestions !== questions.length - 1) {
            setActiveQuestions((prev) => prev + 1)
        }
        else {
            setShowResult(true)
            setQuizResult((prev) => ({
                ...prev,
                totalTime: elapsedTime, // Save the total time spent on the quiz
            }))
            clearInterval(timerRef.current); // Stop the timer when quiz ends
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
                    <p>Time: {formatTime(elapsedTime)}</p>
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
                ) : (<div className='quiz-container2'>
                    <h1>Results</h1>
                    <p>Score: {quizResult.score}</p>
                    <p>Correct Answers: {quizResult.correctAnswer}</p>
                    <p>Incorrect Answers: {quizResult.inCorrectAnswer}</p>
                    <p>Total Time Spent: {formatTime(quizResult.totalTime)}</p>
                </div>)}
            </div>
        </div>
    )
}

export default QuestionScreen