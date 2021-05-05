import React from 'react';
import '../styles/columnHeader.css';
type ColumnHeaderProps = {
  columnName: string;
  showAddTaskWindow: () => void;
};

const ColumnHeader = ({
  columnName,
  showAddTaskWindow,
}: ColumnHeaderProps): JSX.Element => {
  return (
    <div className="columnHeader">
      <span className="collumnName">{columnName}</span>{' '}
      <button
        className="addTaskButton"
        onClick={() => {
          showAddTaskWindow();
        }}
      >
        +
      </button>
    </div>
  );
};
export default ColumnHeader;
