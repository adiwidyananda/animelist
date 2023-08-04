import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { css } from "@emotion/css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  errorMessage?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, errorMessage, ...otherProps },
  ref
) => {
  return (
    <>
      <label>{label}</label>
      <input
        className={css`
          width: 100%;
          height: 20px;
          margin-top: 8px;
        `}
        {...otherProps}
        name={name}
        ref={ref}
      />
      {errorMessage && (
        <div
          className={css`
            color: red;
            font-size: 12px;
          `}
        >
          {errorMessage}
        </div>
      )}
    </>
  );
};

const FormInput = React.forwardRef(Input);

export default FormInput;
