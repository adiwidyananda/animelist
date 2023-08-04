import React, { ForwardRefRenderFunction, SelectHTMLAttributes } from "react";
import { css } from "@emotion/css";
import { SelectOptionsProps } from "@libs/utils/type";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  label?: string;
  options?: [SelectOptionsProps];
}

const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, options, ...otherProps },
  ref
) => {
  return (
    <label>
      {label}
      <select
        {...otherProps}
        className={css`
          width: 100%;
          padding: 8px;
        `}
        name={name}
        ref={ref}
      >
        {options &&
          options.map((item: SelectOptionsProps, index: number) => (
            <option key={index} value={item?.id}>
              {item?.name}
            </option>
          ))}
      </select>
    </label>
  );
};

const FormSelect = React.forwardRef(Select);

export default FormSelect;
