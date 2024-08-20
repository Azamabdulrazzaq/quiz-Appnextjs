// "use client"
// import axios from 'axios';
// import React, { useState } from 'react'
// const AdminPanel = () => {
//     const [quizTopic, setQuizTopic] = useState("");
//     const [quizTime, setQuizTime] = useState("");
//     const [quizTotalScore, setQuizTotalScore] = useState("");
//     const [numberOfQuestion, setNumberOfQuestion] = useState("");
//     const [passingMarks, setPassingMarks] = useState("");
//     const [questions, setQuestions] = useState([{ question: "", answer: ["", "", "", ""], correct_Answer: "" }]);

//     const addQuestions = () => {
//         setQuestions([...questions, { question: "", answer: ["", "", "", ""], correct_Answer: "" }]);
//     }
//     const handleQuestionChange = (index, field, value) => {
//         const newQuestions = [...questions]
//         if (field === 'question') {
//             newQuestions[index].question = value
//         }
//         else if (field == 'correct_Answer') {
//             newQuestions[index].correct_Answer = value
//         }
//         else {
//             newQuestions[index].answer[field] = value
//         }
//         setQuestions(newQuestions)
//     }



//     const questionHandler = () => {
//         const questionData = {
//             quizTopic: quizTopic,
//             quiz_time: quizTime,
//             quiz_TotalScore: quizTotalScore,
//             Number_ofQuestion: numberOfQuestion,
//             passing_Marks: passingMarks,
//             quiz_Questions: questions,
//         }
//         if (quizTopic && quizTime && quizTotalScore && numberOfQuestion && passingMarks && questions) {
//             axios.post("http://localhost:8080/quiz/add-new/question", questionData)
//                 .then((res) => {
//                     console.log(res.data)
//                     if (res.data.status == true) {
//                         alert("User Register Successfully")
//                     }
//                 })
//                 .catch((error) => {
//                     console.log("Error :", error);

//                     if (error.response && error.response.data.status !== true) {
//                         alert(err.response.data.message)
//                     }
//                 });
//         } else {
//             alert("Please fill All feilds")
//         }

//     }



//     return (
//         <>
//             <div>
//                 <div className='container'>
//                     <h2 className='heading'>QuizTopic:</h2>
//                     <input className='text'
//                         title='QuizTopic'
//                         value={quizTopic}
//                         onChange={(e) => setQuizTopic(e.target.value)}
//                     />
//                     <h2 className='heading'>Quiz_Time:</h2>
//                     <input className='text'
//                         title='QuizTopic'
//                         value={quizTime}
//                         onChange={(e) => setQuizTime(e.target.value)}
//                     />
//                     <h2 className='heading'>QuizTotalScore:</h2>
//                     <input className='text'
//                         title='QuizTopic'
//                         value={quizTotalScore}
//                         onChange={(e) => setQuizTotalScore(e.target.value)}
//                     />
//                     <h2 className='heading'>NumberOfQuestion:</h2>
//                     <input className='text'
//                         title='QuizTopic'
//                         value={numberOfQuestion}
//                         onChange={(e) => setNumberOfQuestion(e.target.value)}
//                     />
//                     <h2 className='heading'>PassingMarks:</h2>
//                     <input className='text'
//                         title='QuizTopic'
//                         value={passingMarks}
//                         onChange={(e) => setPassingMarks(e.target.value)}
//                     />
//                 </div>
//                 <div className='question-section'>
//                     <h2 className='heading'>All Question here</h2>
//                     {
//                         questions.map((q, index) => {
//                             <div className="question-container" key={index}>
//                                 <input type="text" placeholder="Enter your Qusetions" className='text'
//                                     value={q.question}
//                                     onChange={() => handleQuestionChange(index, 'question', e.target.value)}
//                                 />
//                                 {
//                                     q.answer.map((option, optIndex) => {
//                                         <input type="text" label="Options" key={optIndex} placeholder={`option ${optIndex}`} className='text'
//                                             value={option}
//                                             onChange={(e) => handleQuestionChange(index, optIndex, e.target.value)}
//                                         />
//                                     })
//                                 }
//                                 <input type="text" placeholder="CorrectAnswer" className='text'
//                                     value={q.correct_Answer}
//                                     onChange={(e) => handleQuestionChange(index, 'correct_Answer', e.target.value)}
//                                 />
//                             </div>
//                         })
//                     }

//                     <button className='btn' onClick={addQuestions}>Add Another Question</button>
//                     <div className='btn1'>
//                         <button className='btn' onClick={questionHandler}>Submitquestion</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AdminPanel



// "use client"
// import axios from 'axios';
// import React, { useState } from 'react';

// const AdminPanel = () => {
//     const [quizTopic, setQuizTopic] = useState("");
//     const [quizTime, setQuizTime] = useState("");
//     const [quizTotalScore, setQuizTotalScore] = useState("");
//     const [numberOfQuestion, setNumberOfQuestion] = useState("");
//     const [passingMarks, setPassingMarks] = useState("");
//     const [questions, setQuestions] = useState([{ question: "", answer: ["", "", "", ""], correct_Answer: "" }]);

//     const addQuestion = () => {
//         setQuestions([...questions, { question: "", answer: ["", "", "", ""], correct_Answer: "" }]);
//     };

//     const handleQuestionChange = (index, field, value) => {
//         const newQuestions = [...questions];
//         if (field === 'question') {
//             newQuestions[index].question = value;
//         } else if (field === 'correct_Answer') {
//             newQuestions[index].correct_Answer = value;
//         } else {
//             newQuestions[index].answer[field] = value;
//         }
//         setQuestions(newQuestions);
//     };

//     const handleSubmit = () => {
//         const questionData = {
//             quizTopic,
//             quiz_time: quizTime,
//             quiz_TotalScore: quizTotalScore,
//             Number_ofQuestion: numberOfQuestion,
//             passing_Marks: passingMarks,
//             questions,
//         };

//         if (quizTopic && quizTime && quizTotalScore && numberOfQuestion && passingMarks && questions.length) {
//             axios.post("http://localhost:8080/quiz/add-new/question", questionData)
//                 .then((res) => {
//                     console.log(res.data);
//                     if (res.data.status === true) {
//                         alert("Quiz added successfully");
//                     }
//                 })
//                 .catch((error) => {
//                     console.log("Error:", error);
//                     if (error.response && error.response.data.status !== true) {
//                         alert(error.response.data.message);
//                     }
//                 });
//         } else {
//             alert("Please fill all the fields");
//         }
//     };

//     return (
//         <>
//             <div className='container'>
//                 <h2 className='heading'>Quiz Topic:</h2>
//                 <input className='text' title='Quiz Topic' value={quizTopic} onChange={(e) => setQuizTopic(e.target.value)} />

//                 <h2 className='heading'>Quiz Time:</h2>
//                 <input className='text' title='Quiz Time' value={quizTime} onChange={(e) => setQuizTime(e.target.value)} />

//                 <h2 className='heading'>Quiz Total Score:</h2>
//                 <input className='text' title='Quiz Total Score' value={quizTotalScore} onChange={(e) => setQuizTotalScore(e.target.value)} />

//                 <h2 className='heading'>Number of Questions:</h2>
//                 <input className='text' title='Number of Questions' value={numberOfQuestion} onChange={(e) => setNumberOfQuestion(e.target.value)} />

//                 <h2 className='heading'>Passing Marks:</h2>
//                 <input className='text' title='Passing Marks' value={passingMarks} onChange={(e) => setPassingMarks(e.target.value)} />
//             </div>

//             <div className='question-section'>
//                 <h2 className='heading'>Questions</h2>
//                 {questions.map((q, index) => (
//                     <div className="question-container" key={index}>
//                         <input type="text" placeholder="Enter your Question" className='text'
//                             value={q.question} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} />

//                         {q.answer.map((option, optIndex) => (
//                             <input type="text" key={optIndex} placeholder={`Option ${optIndex + 1}`} className='text'
//                                 value={option} onChange={(e) => handleQuestionChange(index, optIndex, e.target.value)} />
//                         ))}

//                         <input type="text" placeholder="Correct Answer" className='text'
//                             value={q.correct_Answer} onChange={(e) => handleQuestionChange(index, 'correct_Answer', e.target.value)} />
//                     </div>
//                 ))}
//                 <button className='btn' onClick={addQuestion}>Add Another Question</button>
//                 <div className='btn1'>
//                     <button className='btn' onClick={handleSubmit}>Submit Quiz</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminPanel;
