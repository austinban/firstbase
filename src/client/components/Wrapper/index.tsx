import React, { useState, FC } from "react";

import "./index.scss";

export type OwnProps = {
  children: React.ReactNode;
};

const Wrapper: FC<OwnProps> = ({ children }: OwnProps) => {
  return (
    <div role="wrapper" className="wrapper">
      {children}
    </div>
  );
};

export default Wrapper;
