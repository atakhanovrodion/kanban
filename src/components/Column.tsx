import React from 'react';
import ColumnHeader from './ColumnHeader';
import ColumnBody from './ColumnBody';

type ColumnProps = {
  columnName: string;
  tasks: { name: string }[];
  showAddTaskWindow: () => void;
};

const Column = ({
  columnName,
  tasks,
  showAddTaskWindow,
}: ColumnProps): JSX.Element => {
  return (
    <div className="column">
      <ColumnHeader {...{ columnName }} showAddTaskWindow={showAddTaskWindow} />
      <ColumnBody {...{ tasks }} />
    </div>
  );
};
export default Column;
