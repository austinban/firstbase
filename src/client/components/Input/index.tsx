import React, { Fragment, FC } from "react";

import "./index.scss";

export type OwnProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  label?: string;
  role?: string;
};

const Input: FC<OwnProps> = ({
  value,
  onChange,
  placeholder,
  label,
  role
}: OwnProps) => {
  const renderLabel = () => {
    if (!label) return null;

    return (
      <label role="label" className="label">
        {label}
      </label>
    );
  };

  return (
    <div className="inputContainer">
      {renderLabel()}
      <input
        role={role}
        className="input"
        onChange={e => onChange(e.target.value)}
        value={value}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
