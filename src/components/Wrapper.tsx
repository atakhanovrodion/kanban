import React, { BaseSyntheticEvent } from 'react';

import '../styles/wrapper.css';

type WrapperProps = {
  children: JSX.Element;
  stateHandler?: (e?: BaseSyntheticEvent) => void;
  className: string;
};

const Wrapper = ({
  children,
  stateHandler = () => null,
  className,
}: WrapperProps): JSX.Element => (
  <div
    className={className}
    onClick={(e: BaseSyntheticEvent) => {
      if (className === 'wrapper' && e.target.className === 'wrapper') {
        stateHandler();
      } else if (className === 'wrapper_dark') {
        stateHandler(e);
      }
    }}
  >
    {children}
  </div>
);

export default Wrapper;
