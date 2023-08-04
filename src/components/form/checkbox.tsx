import React from "react";

interface Props {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={props.handleChange}
      />
    </div>
  );
};
export default Checkbox;
