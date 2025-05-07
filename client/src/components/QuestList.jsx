import React from 'react';
import QuestCard from './QuestCard';

const QuestList = ({ quests }) => {
  return (
    <div className="quest-list">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} />
      ))}
    </div>
  );
};

export default QuestList;
