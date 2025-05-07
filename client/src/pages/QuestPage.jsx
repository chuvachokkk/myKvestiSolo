import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestDetail from '../components/QuestDetail';
import CommentsSection from '../components/CommentsSection';
import { Button } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const QuestPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const response = await axiosInstance.get(`/quests/${id}`);
        setQuest(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке квеста:', error);
      }
    };

    fetchQuest();
  }, [id]);

  if (!quest) {
    return <div>Загрузка...</div>;
  }

  const isAuthor = user && quest.authorId === user.id;

  return (
    <div>
      <QuestDetail quest={quest} />
      {isAuthor && (
        <Button onClick={() => navigate(`/quests/${id}/edit`)}>
          Редактировать
        </Button>
      )}
      <CommentsSection questId={id} />
    </div>
  );
};

export default QuestPage;
