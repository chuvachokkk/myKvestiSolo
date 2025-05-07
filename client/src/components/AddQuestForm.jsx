import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const AddQuestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamSize: 2,
    duration: 60,
    difficulty: 1,
    ageLimit: 14,
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <Container>
      <h2 className="text-center my-4">Добавить квест</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm={2}>
            Название
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="title"
              placeholder="Введите название квеста"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDescription">
          <Form.Label column sm={2}>
            Описание
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Введите описание квеста"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formTeamSize">
          <Form.Label column sm={2}>
            Количество человек
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              required
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDuration">
          <Form.Label column sm={2}>
            Время (минуты)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="duration"
              placeholder="Введите время квеста"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDifficulty">
          <Form.Label column sm={2}>
            Сложность
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAgeLimit">
          <Form.Label column sm={2}>
            Возраст
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="ageLimit"
              placeholder="Введите возрастное ограничение"
              value={formData.ageLimit}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formImage">
          <Form.Label column sm={2}>
            Фотография
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="file" onChange={handleFileChange} required />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Добавить квест
        </Button>
      </Form>
    </Container>
  );
};

export default AddQuestForm;
