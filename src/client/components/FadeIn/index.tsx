import React, { useState, FC } from "react";

import "./index.scss";

export type OwnProps = {
  children: React.ReactNode;
};

const FadeIn: FC<OwnProps> = ({ children }: OwnProps) => {
  return <div className="fadeInContainer">{children}</div>;
};

export default FadeIn;
