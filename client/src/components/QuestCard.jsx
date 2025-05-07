import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import StarRating from './StarRating';

const QuestCard = ({ quest, user }) => {
  const isAuthor = user && quest.authorId === user.id;

  return (
    <Card className="mb-4 bloody-card" style={{ height: '100%' }}>
      <Card.Img
        variant="top"
        src={
          quest.image
            ? `http://localhost:3000${quest.image}`
            : 'https://via.placeholder.com/300'
        }
        alt={quest.title}
        className="bloody-img"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="bloody-title-sm">{quest.title}</Card.Title>
        <Card.Text className="bloody-text">{quest.description}</Card.Text>
        <div className="bloody-text">
          <strong>Количество человек:</strong> {quest.teamSize}
        </div>
        <div className="bloody-text">
          <strong>Время:</strong> {quest.duration} минут
        </div>
        <div className="bloody-text">
          <strong>Сложность:</strong> {quest.difficulty}/5
        </div>
        <div className="bloody-text">
          <strong>Рейтинг:</strong>{' '}
          <StarRating rating={quest.rating} className="star-rating" />
        </div>
        <div className="bloody-text">
          <strong>Возрастное ограничение:</strong> {quest.ageLimit}+
        </div>
        <Link to={`/quests/${quest.id}`} className="mt-auto">
          <Button className="bloody-button w-100 mb-2">Подробнее</Button>
        </Link>
        {isAuthor && (
          <Link to={`/quests/${quest.id}/edit`} className="mt-auto">
            <Button className="bloody-button w-100">Редактировать</Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuestCard;