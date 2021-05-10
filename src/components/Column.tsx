import React from 'react';
import ColumnHeader from './ColumnHeader';
import ColumnBody from './ColumnBody';

type ColumnProps = {
  columnName: string;
  tasks: { name: string; color: string }[];
  showAddTaskWindow: (columnName?: string) => void;
};

const Column = ({ columnName, tasks, showAddTaskWindow }: ColumnProps): JSX.Element => (
  <div className="column">
    <ColumnHeader {...{ columnName }} showAddTaskWindow={showAddTaskWindow} />
    <ColumnBody {...{ tasks }} />
  </div>
);
export default Column;
