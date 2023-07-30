import React from "react";
import cx from "classnames";
import { Box, Header } from "@components";
import { css } from "@emotion/css";

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return (
    <>
      <Header />
      <Box
        className={cx(
          css`
            padding-top: 76px;
          `,
          className
        )}
      >
        {children}
      </Box>
      <Box
        className={css`
          height: 200px;
        `}
      ></Box>
    </>
  );
};

export default Layout;
