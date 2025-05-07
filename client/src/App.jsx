import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AllQuests from './pages/AllQuests';
import QuestPage from './pages/QuestPage';
import AuthPage from './pages/AuthPage';
import AddQuestPage from './pages/AddQuestPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './utils/ProtectedRoute';
import EditQuestPage from './pages/EditQuestPage';
import { useAuth } from './utils/useAuth'; // Импортируем хук

const App = () => {
  const { user, isAuthenticated, login, logout, updateUser } = useAuth();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header user={user} isAuthenticated={isAuthenticated} logout={logout} />
        <div className="flex-grow-1 pb-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/quests"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AllQuests user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-quest"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AddQuestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage user={user} updateUser={updateUser} />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage login={login} />} />
            <Route path="/quests/:id" element={<QuestPage />} />
            <Route
              path="/quests/:id/edit"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EditQuestPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </div>
    </Router>
  );
};

export default App;
