import React from 'react';
import '../styles/icon_window.css';

type IconWindowProps = {
  offsetX: number;
  offsetY: number;
  handle: () => void;
  name: string;
  filterOnUser: (user: string) => void;
  onHeader: boolean;
  filter?: string[];
};

const IconWindow = ({
  offsetX,
  offsetY,
  handle,
  name,
  filterOnUser,
  filter = [''],
  onHeader,
}: IconWindowProps) => {
  const elementInTask = (
    <div>
      <button type="button">set as responsible</button>
      <button type="button">remove from task</button>
    </div>
  );

  const elementInHeader = (
    <div>
      {filter[0] === '' ? (
        <button
          className="icon_window_button"
          type="button"
          onClick={() => {
            filterOnUser(name);
          }}
        >
          filter on user
        </button>
      ) : (
        <button
          className="icon_window_button"
          type="button"
          onClick={() => {
            filterOnUser('');
          }}
        >
          reset filter
        </button>
      )}
    </div>
  );

  const element = onHeader ? elementInHeader : elementInTask;

  return (
    <div
      style={{
        top: offsetY,
        left: offsetX,
      }}
      className="icon_window"
    >
      <div>
        <span>{name}</span>
      </div>
      {element}
    </div>
  );
};

export default IconWindow;
