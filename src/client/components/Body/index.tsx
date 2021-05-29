import React, { useState, FC } from "react";
import "./index.scss";

var classNames = require("classnames");

export type OwnProps = {
  noFlex?: boolean;
  inset?: boolean;
  primary?: boolean;
  children: React.ReactNode;
};

const Body: FC<OwnProps> = ({ children, primary, inset, noFlex }: OwnProps) => {
  return (
    <div
      role="body"
      className={classNames("bodyContainer", { primary, inset, noFlex })}
    >
      <div className={classNames("body")}>{children}</div>
    </div>
  );
};

export default Body;
