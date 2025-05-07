import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Carousel, Button } from 'react-bootstrap';
import StarRating from '../components/StarRating';

const HomePage = () => {
  const featuredQuests = [
    {
      id: 1,
      title: 'Загадочный лес',
      description:
        'Погрузитесь в атмосферу таинственного леса, где вас ждут загадки и приключения.',
      image:
        'https://tumen.mir-kvestov.ru/uploads/quests/13103/original/adventura_zagadochnyi_les_photo1.jpg?1692193849',
      difficulty: 'Средняя',
      duration: '60 минут',
      players: '2-4 человека',
      rating: 3,
    },
    {
      id: 2,
      title: 'Побег из тюрьмы',
      description:
        'Спланируйте побег из тюрьмы, решая головоломки и взаимодействуя с другими игроками.',
      image:
        'https://mir-kvestov.ru/uploads/quests/346/large/chyo_za_kvest_pobeg_iz_azkabana_photo1.jpg?1702279362',
      difficulty: 'Высокая',
      duration: '90 минут',
      players: '3-6 человек',
      rating: 5,
    },
  ];

  return (
    <Container className="my-5">
      <h1 className="bloody-title">Добро пожаловать на сайт квестов!</h1>
      <p className="text-center mb-4 bloody-text">
        Найдите свой идеальный квест и начните приключение!
      </p>

      <Carousel className="bloody-carousel">
        {featuredQuests.map((quest) => (
          <Carousel.Item key={quest.id}>
            <img
              className="d-block w-100"
              src={quest.image}
              alt={quest.title}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="bloody-caption">
              <h3 className="bloody-title bloody-title-sm">{quest.title}</h3>
              <p className="bloody-text">{quest.description}</p>
              <ul className="list-unstyled mb-3 bloody-text">
                <li>
                  <strong>Сложность:</strong> {quest.difficulty}
                </li>
                <li>
                  <strong>Время:</strong> {quest.duration}
                </li>
                <li>
                  <strong>Игроки:</strong> {quest.players}
                </li>
                <li>
                  <strong>Рейтинг:</strong>{' '}
                  <StarRating rating={quest.rating} isEditable={false} />
                </li>
              </ul>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="text-center mb-5 mt-4">
        <Link to="/quests">
          <Button
            className="bloody-button me-2"
            style={{
              backgroundColor: 'transparent !important',
              color: '#ff0000 !important',
              border: '2px solid #4b0000 !important',
            }}
          >
            Все квесты
          </Button>
        </Link>
        <Link to="/add-quest">
          <Button
            className="bloody-button"
            style={{
              backgroundColor: 'transparent !important',
              color: '#ff0000 !important',
              border: '2px solid #4b0000 !important',
            }}
          >
            Добавить квест
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;