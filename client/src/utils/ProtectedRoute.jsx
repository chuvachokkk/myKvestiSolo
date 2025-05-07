import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  // Если пользователь не авторизован, перенаправляем его на главную страницу
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Если пользователь авторизован, отображаем дочерние компоненты
  return children;
};

export default ProtectedRoute;
