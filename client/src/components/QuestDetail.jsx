import React from 'react';
import { Button } from 'react-bootstrap';

const QuestDetail = ({ quest, user }) => {
  const isAuthor = user && quest.authorId === user.id;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Выравнивание по центру по горизонтали
        justifyContent: 'center', // Выравнивание по центру по вертикали
        minHeight: '100vh', // Занимает всю высоту экрана
        textAlign: 'center', // Текст по центру
        padding: '20px', // Отступы
      }}
    >
      <h1>{quest.title}</h1>
      <img
        src={`http://localhost:3000${quest.image}`}
        alt={quest.title}
        style={{
          width: '400px', // Фиксированная ширина
          height: '300px', // Фиксированная высота
          borderRadius: '10px', // Скругленные углы
          marginBottom: '20px', // Отступ снизу
          objectFit: 'cover', // Сохраняем пропорции изображения
        }}
      />
      <p>{quest.description}</p>
      <div>
        <h2>Характеристики:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>Команда: {quest.teamSize}</li>
          <li>Время: {quest.duration}</li>
          <li>Сложность: {quest.difficulty}</li>
          <li>Страх: {quest.fearLevel}</li>
          <li>Возраст: {quest.ageLimit}</li>
          <li>Загадки: {quest.puzzlesCount}</li>
        </ul>
      </div>
      {isAuthor && (
        <Button onClick={() => navigate(`/quests/${quest.id}/edit`)}>
          Редактировать
        </Button>
      )}
    </div>
  );
};

export default QuestDetail;
