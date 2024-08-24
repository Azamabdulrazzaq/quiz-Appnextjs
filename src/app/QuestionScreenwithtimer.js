"use client"
import React, { useEffect, useState, useRef } from 'react';
import { quiz } from '@/app/AllQuestions';

const QuestionScreen = ({ name }) => {
    const [activeQuestions, setActiveQuestions] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);
    const [quizResult, setQuizResult] = useState({
        score: 0,
        correctAnswer: 0,
        inCorectAnswer: 0,
        totalTime: 0,
    });

    const { questions } = quiz;
    const { question, answer, options } = questions[activeQuestions];
    console.log(questions[activeQuestions]);

    const addLeadingZero = (number) => {
        return number < 9 ? "0" + number : number;
    }

    const formatTime = (time) => {
        const minute = Math.floor(time / 60);
        const second = time % 60;
        return `${addLeadingZero(minute)} : ${addLeadingZero(second)}`;
    }

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isPaused]);

    useEffect(() => {
        setMinutes(Math.floor(seconds / 60));
    }, [seconds]);

    const onSelectedAnswer = (answers, index) => {
        setCurrentAnswer(answers);
        setSelectedAnswerIndex(index);
        setIsChecked(true);
    }

    const nextQuestions = () => {
        if (currentAnswer === answer) {
            setQuizResult((prev) => ({
                ...prev,
                score: prev.score + 5,
                correctAnswer: prev.correctAnswer + 1
            }));
        } 
        else {
            setQuizResult((prev) => ({
                ...prev,
                inCorectAnswer: prev.inCorectAnswer + 1
            }));
        }

        if (activeQuestions !== questions.length - 1) {
            setActiveQuestions((prev) => prev + 1);
        } else {
            setShowResult(true);
            setQuizResult((prev) => ({
                ...prev,
                totalTime: seconds, // Save the total time spent on the quiz
            }));
            clearInterval(timerRef.current); // Stop the timer when quiz ends
        }

        setCurrentAnswer("");
        setSelectedAnswerIndex(null);
        setIsChecked(false);
    }

    const pauseTimer = () => {
        setIsPaused(true);
        clearInterval(timerRef.current);
    }

    const resumeTimer = () => {
        setIsPaused(false);
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
                                    {activeQuestions === questions.length - 1 ? "Finish" : "Next"}
                                </button>
                            ) : (
                                <button type={'submit'} className={"btn"} disabled>
                                    {activeQuestions === questions.length - 1 ? "Finish" : "Next"}
                                </button>
                            )}
                        </div>
                        <div className='timer-container'>
                            <p>Time: {formatTime(seconds)}</p>
                            <button onClick={pauseTimer} className={"btn"}>Pause</button>
                            <button onClick={resumeTimer} className={"btn"}>Resume</button>
                        </div>
                    </div>
                ) : (
                    <div className='quiz-container2'>
                        <h1>Quiz Completed</h1>
                        <p>Total Time: {formatTime(quizResult.totalTime)}</p>
                        <p>Score: {quizResult.score}</p>
                        <p>Correct Answers: {quizResult.correctAnswer}</p>
                        <p>Incorrect Answers: {quizResult.inCorectAnswer}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionScreen;
