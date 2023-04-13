import React from "react";

interface Props {
  onClick?: () => void;
  text: string;
  type?: string;
  name?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  onClick,
  text,
  type,
  name,
  className,
  id,
  disabled,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick != undefined) {
      onClick();
    }
  };
  return (
    <button
      disabled={disabled}
      className={className}
      id={id}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
