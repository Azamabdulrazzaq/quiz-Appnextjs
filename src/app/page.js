// "use client"
// import{ useState } from 'react'
// import QuestionScreen from './QuestionScreen'

// const page = () => {
//   const [quizApp, setQuizApp] = useState(false);
//   const [quizName, setQuizName] = useState("");

//   return (
//     <div className="container mt-5">
//       <div className="text-center">
//         <h1 className='text-success mtb-1 '>create a quiz App</h1>
//         <h3 className='mb-4 text heading'>All quiz category are available here</h3>
//       </div>
//       {quizApp ?
//         (
//           <QuestionScreen name={quizName} />
//         ) :
//         (
//           <>
//             <div className="mb-3">
//               <label className="form-label">
//                 Choose your quiz Name
//               </label>
//               <input
//                 className="form-control"
//                 id="nameInput"
//                 type="text"
//                 value={quizName}
//                 onChange={(e) => setQuizName(e.target.value)}
//               />
//             </div>
//             <button className="btn btn-primary" type="submit" disabled={!quizName.trim()} onClick={() => setQuizApp(true)}>
//               Start Quiz
//             </button>
//           </>
//         )}
//     </div>
//   )
// }

// export default page


import React from 'react'
import AdminPanel from '../app/component/AdminPanel'
import AdminPanelDrawer from '../app/component/AdminPanelDrawer'
import QuestionScreen from '../app/QuestionScreenwithtimer'

const page = () => {
  return (
    // <div><AdminPanel /></div>
    // <div><AdminPanelDrawer /></div>
    <div><QuestionScreen /></div>
  )
}

export default page