import React, { ForwardRefRenderFunction, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  label?: string;
  ref?: string;
  options?:any
}

const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, options, ...otherProps },
  ref
) => {
  return (
    <label>
      {label}
      <select {...otherProps} name={name} ref={ref} >
      {options.map((item:any, index:number ) => (
        <option key={index} value={item?.id} >
          {item?.name}
        </option>
      ))}
      </select>
    </label>
  );
};

const FormSelect = React.forwardRef(Select);

export default FormSelect;