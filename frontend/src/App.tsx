import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLayout from './layouts/AdminLayout';
import ManageQuiz from './pages/admin/ManageQuiz';
import CreateQuiz from './pages/admin/CreateQuiz';
import AuthLayout from './layouts/AuthLayout';
import StudentSignup from './pages/auth/StudentSignup';
import StudentLogin from './pages/auth/StudentLogin';
import PublicStudentRoute from './routes/PublicStudentRoute';
import StudentLayout from './components/layout/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentHomework from './pages/student/StudentHomework';
import StudentQuizAttempt from './pages/student/StudentQuizAttempt';
import './index.css';


// Simple Dashboard Placeholder
const Dashboard = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500">Welcome to your admin control center.</p>
    </div>
  );
};

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes with Sidebar Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="quiz" element={<ManageQuiz />} />
          <Route path="create-quiz" element={<CreateQuiz />} />
          <Route path="edit-quiz/:id" element={<CreateQuiz />} />

        </Route>

        {/* Student Auth Routes */}
        <Route path="/student" element={<AuthLayout />}>
          <Route element={<PublicStudentRoute />}>
            <Route path="signup" element={<StudentSignup />} />
            <Route path="login" element={<StudentLogin />} />
          </Route>
        </Route>

        {/* Student Dashboard Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="homework" element={<StudentHomework />} />
          <Route path="homework/:id" element={<StudentQuizAttempt />} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
