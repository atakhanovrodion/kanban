import React from 'react';

type PseudoTaskProps = {
  text: string;
};

const PseudoTask = ({ text }: PseudoTaskProps): JSX.Element => (
  <div
    className="pseudo_task"
    onDragOver={(e) => {
      e.preventDefault();
    }}
  >
    <span className="task_text">{text}</span>
  </div>
);

export default PseudoTask;
