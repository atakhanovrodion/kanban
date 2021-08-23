import React, { useState } from 'react';
import ColorMenu from './ColorMenu';

import '../styles/edit_task_page.css';

type EditTaskPageProps = {
  color: string;
};

const EditTaskPage = ({ color }: EditTaskPageProps): JSX.Element => {
  const className = `edit_task_page ${color}`;
  return (
    <div className={className}>
      <button type="button">delete</button>
      <button type="button">close</button>
    </div>
  );
};

export default EditTaskPage;
