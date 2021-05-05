import React from 'react';
import '../styles/columnHeader.css';

type ColumnHeaderProps = {
  columnName: string;
  showAddTaskWindow: (columnName?: string) => void;
};

const ColumnHeader = ({
  columnName,
  showAddTaskWindow,
}: ColumnHeaderProps): JSX.Element => (
  <div className="columnHeader">
    <span className="collumnName">{columnName}</span>
    <button
      type="button"
      className="addTaskButton"
      onClick={() => {
        showAddTaskWindow(columnName);
      }}
    >
      +
    </button>
  </div>
);
export default ColumnHeader;
