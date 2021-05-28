import React, { FC } from "react";

import "./index.scss";

export type OwnProps = {};

const Footer: FC<OwnProps> = ({}: OwnProps) => {
  return (
    <div className="footerContainer">
      <div className="footer">
        <a className="footerHeader">Austin's Links</a>

        <div className="links">
          <a
            target="_blank"
            href="https://www.banban.io/"
            className="footerLink"
          >
            Portfolio Site
          </a>
          <a
            target="_blank"
            href="https://github.com/austinban"
            className="footerLink"
          >
            GitHub
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/austin-ban-4b719a89"
            className="footerLink"
          >
            LinkedIn
          </a>
          <a href="mailto:banaustinban@gmail.com" className="footerLink">
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
