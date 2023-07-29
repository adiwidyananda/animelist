import React from "react";
import cx from "classnames";
import { css } from "@emotion/css";

import { Box } from "@components";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  style,
  ...props
}) => (
  <Box
    className={cx(
      css`
        width: 100%;
        max-width: 1200px;
        margin: auto auto;
      `,
      className
    )}
    style={{ ...style }}
    {...props}
  >
    {children}
  </Box>
);

export default Container;
