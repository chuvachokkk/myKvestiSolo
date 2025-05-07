import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Button,
  ListGroup,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const CommentsSection = ({ questId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  // Загрузка комментариев
  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comments/${questId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке комментариев:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [questId]);

  // Отправка нового комментария
  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setToastMessage('Для добавления комментария необходимо авторизоваться');
      setToastVariant('danger');
      setShowToast(true);
      return;
    }

    try {
      const response = await axiosInstance.post(
        '/comments',
        { text: newComment, questId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setComments([response.data, ...comments]);
      setNewComment('');
      setToastMessage('Комментарий успешно добавлен');
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      setToastMessage('Произошла ошибка при добавлении комментария');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  // Удаление комментария
  const handleDelete = async (commentId) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setToastMessage('Для удаления комментария необходимо авторизоваться');
      setToastVariant('danger');
      setShowToast(true);
      return;
    }

    try {
      await axiosInstance.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Удаляем комментарий из списка на фронтенде
      setComments(comments.filter((comment) => comment.id !== commentId));

      setToastMessage('Комментарий успешно удален');
      setToastVariant('success');
      setShowToast(true);
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
      setToastMessage('Произошла ошибка при удалении комментария');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Комментарии</Card.Title>
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <strong>{comment.User.username}:</strong> {comment.text}
              <br />
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => handleDelete(comment.id)}
              >
                Удалить
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group controlId="formComment">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Оставьте комментарий"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-1">
            Отправить
          </Button>
        </Form>
      </Card.Body>
      <ToastContainer
        position="middle-center"
        className="p-3"
        style={{ zIndex: 1 }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Уведомление</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
};

export default CommentsSection;
