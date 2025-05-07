import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Импортируем иконку звезды

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null); // Состояние для hover-эффекта

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }} // Скрываем радио-кнопки
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer', marginRight: '5px' }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
