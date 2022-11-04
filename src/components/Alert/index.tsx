import React from 'react';
import './styles.scss';

type Props = {
  notice: string;
  cardColor: string;
  timeBarColor: string;
  className: string;
};

const Alert = ({ notice, cardColor, timeBarColor, className }: Props) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: cardColor,
      }}
    >
      <div className="time-bar" style={{ backgroundColor: timeBarColor }} />
      <p>{notice}</p>
    </div>
  );
};

export default Alert;
