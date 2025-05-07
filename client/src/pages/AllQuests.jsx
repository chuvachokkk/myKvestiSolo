import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import QuestCard from '../components/QuestCard';

const AllQuests = ({ user }) => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuests = async () => {
    try {
      const response = await axiosInstance.get('/quests');
      setQuests(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке квестов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Все квесты</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {quests.map((quest) => (
            <Col key={quest.id} md={4} className="mb-4">
              <QuestCard quest={quest} user={user} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllQuests;
