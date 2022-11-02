import React from 'react';
import './buttons.scss';

type Props = {
  submit?(): void;
  edit?(): void;
  remove?(): void;
};

function execute(submit: any, edit: any, remove: any) {
  if (submit != null) submit();
  if (edit != null) edit();
  if (remove != null) remove();
}

const FinallyButton = ({ submit, edit, remove }: Props) => {
  return (
    <div className="container">
      <button
        type="button"
        onClick={() => {
          execute(submit, edit, remove);
        }}
        className="buttonss"
      >
        Finalizar
      </button>
    </div>
  );
};

FinallyButton.defaultProps = {
  submit: null,
  edit: null,
  remove: null,
};

export default FinallyButton;
