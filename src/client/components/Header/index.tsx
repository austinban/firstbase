import React, { FC } from "react";

import "./index.scss";

export type OwnProps = {};

const Header: FC<OwnProps> = ({}: OwnProps) => {
  return (
    <div className="headerWrapper">
      <div className="header">
        <div role="header" className="headerText">
          Firstbase Frontend Coding Challenge
        </div>
        <div className="headerSubtext">Completed by Austin Ban</div>
      </div>
    </div>
  );
};

export default Header;
