/* eslint-disable react/display-name */
import React from "react";
import cx from "classnames";

interface CustomProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

type BoxProps = CustomProps & React.HTMLAttributes<HTMLDivElement>;

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, style, children, ...rest }, ref) => (
    <div
      className={cx("box", className)}
      style={{ ...style }}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  )
);

export default Box;
