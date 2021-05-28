import React, { FC } from "react";
import "./index.scss";

var classNames = require("classnames");

export type OwnProps = {
  onClick: () => void;
  disabled?: boolean;
  grey?: boolean;
  children: React.ReactNode;
};

const Button: FC<OwnProps> = ({
  onClick,
  children,
  disabled,
  grey
}: OwnProps) => {
  return (
    <div onClick={onClick} className={classNames("button", { disabled, grey })}>
      {children}
    </div>
  );
};

export default Button;
