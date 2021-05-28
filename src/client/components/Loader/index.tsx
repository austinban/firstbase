import React, { FC } from "react";

import "./index.scss";

export type OwnProps = {};

const Loader: FC<OwnProps> = ({}: OwnProps) => {
  return (
    <div className="loaderWrapper">
      <div className="ball ball1"></div>
      <div className="ball ball2"></div>
      <div className="ball ball3"></div>
      <div className="ball ball4"></div>
    </div>
  );
};

export default Loader;
