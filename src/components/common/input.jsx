import React from "react";

const Input = (props) => {
  const { name, label, value, onChange, error, type } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        // to control the element we should pass a value
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
