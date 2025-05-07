import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import StarRating from '../components/StarRating';

const EditQuestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);
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

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const response = await axiosInstance.get(`/quests/${id}`);
        setQuest(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setTeamSize(response.data.teamSize);
        setDuration(response.data.duration);
        setDifficulty(response.data.difficulty);
        setAgeLimit(response.data.ageLimit);
        setRating(response.data.rating);
      } catch (error) {
        console.error('Ошибка при загрузке квеста:', error);
      }
    };

    fetchQuest();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axiosInstance.put(`/quests/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setToastMessage('Квест успешно обновлен!');
        setShowToast(true);
        setTimeout(() => navigate('/quests'), 2000);
      }
    } catch (error) {
      console.error('Ошибка при обновлении квеста:', error);
      setToastMessage('Ошибка при обновлении квеста');
      setShowToast(true);
    }
  };

  if (!quest) {
    return <div>Загрузка...</div>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Редактировать квест</h2>
      <Form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
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
          <Form.Control
            type="number"
            placeholder="Введите количество человек"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            required
          />
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
          <Form.Control
            type="number"
            placeholder="Введите сложность квеста"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            required
          />
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
          Сохранить изменения
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
    </Container>
  );
};

export default EditQuestPage;
