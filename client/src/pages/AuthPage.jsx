import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Container } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const AuthPage = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = activeTab === 'login' ? '/auth/signin' : '/auth/signup';
    const data =
      activeTab === 'login'
        ? { email: formData.email, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

    try {
      const response = await axiosInstance.post(endpoint, data);
      const { accessToken, user } = response.data;

      login({ ...user, accessToken });
      navigate('/');
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#333',
            textAlign: 'center',
          }}
        >
          {activeTab === 'login' ? 'Вход' : 'Регистрация'}
        </h1>
        <Tabs
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="mb-3"
          style={{
            borderBottom: 'none',
          }}
        >
          <Tab eventKey="login" title="Вход">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                controlId="formEmail"
                style={{ marginBottom: '20px' }}
              >
                <Form.Label
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <FaEnvelope style={{ color: '#2575fc' }} /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    fontSize: '1rem',
                    width: '100%',
                  }}
                />
              </Form.Group>

              <Form.Group
                controlId="formPassword"
                style={{ marginBottom: '20px' }}
              >
                <Form.Label
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <FaLock style={{ color: '#2575fc' }} /> Пароль
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    fontSize: '1rem',
                    width: '100%',
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{
                  width: '100%',
                  background: '#2575fc',
                  border: 'none',
                  padding: '10px',
                  fontSize: '1.1rem',
                  borderRadius: '5px',
                  marginTop: '20px',
                }}
              >
                Войти
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="register" title="Регистрация">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                controlId="formUsername"
                style={{ marginBottom: '20px' }}
              >
                <Form.Label
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <FaUser style={{ color: '#2575fc' }} /> Имя пользователя
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Введите имя пользователя"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    fontSize: '1rem',
                    width: '100%',
                  }}
                />
              </Form.Group>

              <Form.Group
                controlId="formEmail"
                style={{ marginBottom: '20px' }}
              >
                <Form.Label
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <FaEnvelope style={{ color: '#2575fc' }} /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    fontSize: '1rem',
                    width: '100%',
                  }}
                />
              </Form.Group>

              <Form.Group
                controlId="formPassword"
                style={{ marginBottom: '20px' }}
              >
                <Form.Label
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <FaLock style={{ color: '#2575fc' }} /> Пароль
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    fontSize: '1rem',
                    width: '100%',
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{
                  width: '100%',
                  background: '#2575fc',
                  border: 'none',
                  padding: '10px',
                  fontSize: '1.1rem',
                  borderRadius: '5px',
                  marginTop: '20px',
                }}
              >
                Зарегистрироваться
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default AuthPage;
