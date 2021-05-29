import React, { FC } from "react";

import "./index.scss";

export type OwnProps = {};

const Loader: FC<OwnProps> = ({}: OwnProps) => {
  return (
    <div role="loader" className="loaderWrapper">
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
    </div>
  );
};

export default Loader;
