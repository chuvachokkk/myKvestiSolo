const router = require('express').Router();
const { Quest, User } = require('../../db/models'); // Убедитесь, что User импортирован
const { verifyAccessToken } = require('../middleware/verifyToken');
const multer = require('multer');
const path = require('path');

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/quests/'); // Файлы будут сохраняться в папку uploads/quests
  },
  filename(req, file, cb) {
    cb(null, Date.now().toString() + path.extname(file.originalname)); // Уникальное имя файла
  },
});

const upload = multer({ storage });

// Получение всех квестов
router.get('/', async (req, res) => {
  try {
    const quests = await Quest.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'teamSize',
        'duration',
        'difficulty',
        'ageLimit',
        'rating',
        'image',
        'authorId',
      ],
    });
    res.json(quests);
  } catch (error) {
    console.error('Ошибка при получении квестов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение квеста по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const quest = await Quest.findByPk(id, {
      include: [{ model: User, attributes: ['username'] }], // Включаем данные автора
    });

    if (!quest) {
      return res.status(404).json({ message: 'Квест не найден' });
    }

    res.json(quest);
  } catch (error) {
    console.error('Ошибка при получении квеста:', error);
    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message, // Отправляем сообщение об ошибке клиенту
    });
  }
});

// Получение квестов по ID пользователя
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const quests = await Quest.findAll({ where: { authorId: userId } });
    res.json(quests || []); // Возвращаем пустой массив, если квестов нет
  } catch (error) {
    console.error('Ошибка при получении квестов пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создать новый квест с изображением
router.post(
  '/',
  verifyAccessToken,
  upload.single('image'),
  async (req, res) => {
    const {
      title,
      description,
      teamSize,
      duration,
      difficulty,
      ageLimit,
      rating,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Название и описание квеста обязательны' });
    }

    try {
      const imageUrl = req.file ? `/uploads/quests/${req.file.filename}` : null;

      const quest = await Quest.create({
        title,
        description,
        teamSize,
        duration,
        difficulty,
        ageLimit,
        rating,
        image: imageUrl, // Сохраняем путь к изображению
        authorId: res.locals.user.id,
      });

      res.status(201).json(quest);
    } catch (error) {
      console.error('Ошибка при создании квеста:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

// Обновить квест с изображением
router.put(
  '/:id',
  verifyAccessToken,
  upload.single('image'),
  async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      teamSize,
      duration,
      difficulty,
      ageLimit,
      rating,
    } = req.body;
    const authorId = res.locals.user.id;

    try {
      const quest = await Quest.findOne({ where: { id, authorId } });

      if (!quest) {
        return res.status(404).json({
          message: 'Квест не найден или у вас нет прав на его изменение',
        });
      }

      // Обновляем поля, если они переданы
      quest.title = title || quest.title;
      quest.description = description || quest.description;
      quest.teamSize = teamSize || quest.teamSize;
      quest.duration = duration || quest.duration;
      quest.difficulty = difficulty || quest.difficulty;
      quest.ageLimit = ageLimit || quest.ageLimit;
      quest.rating = rating || quest.rating;

      // Если загружено новое изображение, обновляем путь
      if (req.file) {
        quest.image = `/uploads/quests/${req.file.filename}`;
      }

      await quest.save();

      res.json(quest);
    } catch (error) {
      console.error('Ошибка при обновлении квеста:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

module.exports = router;
