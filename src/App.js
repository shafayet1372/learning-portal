import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Student/Login';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute';
import Assignment from './Components/Admin/Assignment/Assignment';
import AssignmentMark from './Components/Admin/Assignment/AssignmentMark';
import AdminDashBoard from './Components/Admin/AdminDashBoard';
import Quize from './Components/Admin/Quiz/Quiz.jsx';
import Videos from './Components/Admin/Videos/Videos';
import { useAdminAuth } from './hooks/useAdminAuth';
import AddVideos from './Components/Admin/Videos/AddVideos';
import EditVedio from './Components/Admin/Videos/EditVideo';
import AdminLoginRoute from './Components/Admin/AdminLoginRoute';
import { ToastContainer } from 'react-toastify';
import AddAssignment from './Components/Admin/Assignment/AddAssignment';
import EditAssignment from './Components/Admin/Assignment/EditAssignment';
import AddQuiz from './Components/Admin/Quiz/AddQuiz';
import EditQuiz from './Components/Admin/Quiz/EditQuiz';
import CoursePlayer from './Components/Student/CoursePlayer';
import StudentProtectedRoute from './Components/Student/StudentProtectedRoute';
import StudentLoginRoute from './Components/Student/StudentLoginRoute';
import Registration from './Components/Student/Registration';
import CurrentVideo from './Components/Student/CurrentVideo';
import Quiz from './Components/Student/Quiz';
import LeaderBoard from './Components/Student/LeaderBoard';

function App() {
  // const checkedAdminAuth = useAdminAuth()
  // console.log(checkedAdminAuth)
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path='/' element={<StudentLoginRoute><Login /></StudentLoginRoute>} />

          <Route path='/register' element={<StudentLoginRoute><Registration /></StudentLoginRoute>} />
          <Route path='/admin' element={<AdminLoginRoute><AdminLogin /></AdminLoginRoute>} />




          <Route path='/admin/assignment' element={<AdminProtectedRoute><Assignment /></AdminProtectedRoute>} />
          <Route path='/admin/add-assignment' element={<AdminProtectedRoute><AddAssignment /></AdminProtectedRoute>} />
          <Route path='/admin/edit-assignment/:id' element={<AdminProtectedRoute><EditAssignment /></AdminProtectedRoute>} />
          <Route path='/admin/assignment-mark' element={<AdminProtectedRoute><AssignmentMark /></AdminProtectedRoute>} />
          <Route path='/admin/dashboard' element={<AdminProtectedRoute><AdminDashBoard /></AdminProtectedRoute>} />
          <Route path='/admin/quize' element={<AdminProtectedRoute><Quize /></AdminProtectedRoute>} />
          <Route path='/admin/add-quize' element={<AdminProtectedRoute><AddQuiz /></AdminProtectedRoute>} />
          <Route path='/admin/edit-quize/:id' element={<AdminProtectedRoute><EditQuiz /></AdminProtectedRoute>} />
          <Route path='/admin/videos' element={<AdminProtectedRoute><Videos /></AdminProtectedRoute>} />
          <Route path='/admin/add-video' element={<AdminProtectedRoute><AddVideos /></AdminProtectedRoute>} />
          <Route path='/admin/edit-video/:id' element={<AdminProtectedRoute><EditVedio /></AdminProtectedRoute>} />



          <Route path='/course-videos' element={<StudentProtectedRoute><CoursePlayer /></StudentProtectedRoute>} >

            <Route path=':id' element={<CurrentVideo />} />
          </Route>
          <Route path='/quize/video/:id' element={<StudentProtectedRoute><Quiz /></StudentProtectedRoute>} />
          <Route path='/leaderboard' element={<StudentProtectedRoute><LeaderBoard /></StudentProtectedRoute>} />
        </Routes>



        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
