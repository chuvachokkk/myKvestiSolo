import React, { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Toast,
  ToastContainer,
  Row,
  Col,
} from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const AddQuestPage = ({ onQuestAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState(1);
  const [ageLimit, setAgeLimit] = useState(14);
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setToastMessage('Название и описание квеста обязательны');
      setShowToast(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('teamSize', teamSize);
    formData.append('duration', duration);
    formData.append('difficulty', difficulty);
    formData.append('ageLimit', ageLimit);
    formData.append('rating', rating);
    if (image) {
      formData.append('image', image);
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.post('/quests', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setToastMessage('Квест успешно создан!');
        setShowToast(true);

        if (typeof onQuestAdded === 'function') {
          onQuestAdded();
        }

        setTimeout(() => navigate('/quests'), 2000);
      }
    } catch (error) {
      console.error('Ошибка при создании квеста:', error);
      setToastMessage('Ошибка при создании квеста');
      setShowToast(true);
    }
  };

  return (
    <Container
      fluid // Растягиваем на всю ширину
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh', // Минимальная высота — 100% экрана
        // background: 'linear-gradient(135deg, rgb(132, 110, 156), #2575fc)', // Градиентный фон
        padding: '20px', // Добавляем отступы
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px', // Ограничиваем ширину формы
          background: 'white', // Белый фон для формы
          borderRadius: '10px', // Скругленные углы
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Тень
          padding: '20px', // Внутренние отступы
        }}
      >
        <h2 className="text-center mb-4">Добавить квест</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название квеста"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Введите описание квеста"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTeamSize">
            <Form.Label>Количество человек</Form.Label>
            <Row>
              {[1, 2, 3, 4, 5].map((size) => (
                <Col key={size}>
                  <Button
                    variant={teamSize === size ? 'primary' : 'outline-primary'}
                    onClick={() => setTeamSize(size)}
                    className="w-100 mb-2"
                  >
                    {size}
                  </Button>
                </Col>
              ))}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDuration">
            <Form.Label>Время (минуты)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите время квеста"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDifficulty">
            <Form.Label>Сложность</Form.Label>
            <Row>
              {[1, 2, 3, 4, 5].map((level) => (
                <Col key={level}>
                  <Button
                    variant={
                      difficulty === level ? 'primary' : 'outline-primary'
                    }
                    onClick={() => setDifficulty(level)}
                    className="w-100 mb-2"
                  >
                    {level}
                  </Button>
                </Col>
              ))}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAgeLimit">
            <Form.Label>Возрастное ограничение</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите возрастное ограничение"
              value={ageLimit}
              onChange={(e) => setAgeLimit(Number(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Рейтинг</Form.Label>
            <StarRating rating={rating} setRating={setRating} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Изображение</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Добавить квест
          </Button>
        </Form>

        <ToastContainer position="top-end" className="p-3">
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Уведомление</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </Container>
  );
};

export default AddQuestPage;
