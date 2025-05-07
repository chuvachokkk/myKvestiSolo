import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Form,
  Button,
  Toast,
  ToastContainer,
  Alert,
} from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = activeTab === 'login' ? '/auth/signin' : '/auth/signup';
    const data =
      activeTab === 'login'
        ? { email, password }
        : { username, email, password };

    try {
      const response = await axiosInstance.post(endpoint, data);
      const { accessToken, user } = response.data;

      login({ ...user, accessToken });

      setToastMessage(
        activeTab === 'login'
          ? 'Вход выполнен успешно!'
          : 'Регистрация прошла успешно!'
      );
      setShowToast(true);

      navigate('/');
    } catch (error) {
      console.error(
        'Ошибка при авторизации:',
        error.response ? error.response.data : error.message
      );
      setError(
        error.response?.data?.message ||
          'Ошибка при авторизации. Проверьте данные и попробуйте снова.'
      );
      setShowToast(true);
    }
  };

  return (
    <div>
      <h1>{activeTab === 'login' ? 'Вход' : 'Регистрация'}</h1>
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => {
          setActiveTab(key);
          setError('');
        }}
        className="mb-3"
      >
        <Tab eventKey="login" title="Вход">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Войти
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="register" title="Регистрация">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Зарегистрироваться
            </Button>
          </Form>
        </Tab>
      </Tabs>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg={toastMessage.includes('Ошибка') ? 'danger' : 'success'}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              {toastMessage.includes('Ошибка') ? 'Ошибка' : 'Успех'}
            </strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AuthForm;
