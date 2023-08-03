/* eslint-disable react/display-name */
import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  loading?: Boolean;
  submit?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: string;
}

type TBoxProps = IButtonProps & React.HTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, TBoxProps>(
  ({
    children,
    className,
    loading,
    submit = false,
    fullWidth = false,
    disabled = false,
    type,
    ...rest
  }) => (
    <button
      className={cx(
        css`
          border: none;
          padding: 18px 32px;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          &:hover {
            background: #141217;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
          }
        `,
        type === "danger"
          ? css`
              background: #7d0322;
            `
          : css`
              background: rgb(26, 39, 82);
            `,
        fullWidth &&
          css`
            width: 100%;
          `,
        className
      )}
      type={submit ? "submit" : "button"}
      disabled={disabled}
      {...rest}
    >
      <span>{children}</span>
    </button>
  )
);

export default Button;
