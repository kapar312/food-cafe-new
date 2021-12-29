import React from "react";

const Input = ({placeholder, addClass, value, type = "text", img, onChange}) => {
  return (
    <div className={`input ${addClass ? addClass : ""}`}>
      {img && <img src={img} alt="img" />}
      <input onChange={onChange} placeholder={placeholder} type={type} value={value} />
    </div>
  );
};

export default Input;
