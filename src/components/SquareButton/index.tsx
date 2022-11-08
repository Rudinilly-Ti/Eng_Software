import React from 'react';
import './styles.scss';

type Props = {
  char: string;
  click?(): void;
};

const SquareButton = ({ char, click }: Props) => {
  return (
    <div
      tabIndex={0}
      role="link"
      onClick={click}
      onKeyDown={click}
      className="button-container"
    >
      {char}
    </div>
  );
};

SquareButton.defaultProps = {
  click: null,
};

export default SquareButton;
