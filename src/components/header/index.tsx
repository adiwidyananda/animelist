import cx from "classnames";
import { Box } from "@components";
import { css } from "@emotion/css";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <>
      <Box
        className={cx(
          css`
            position: fixed;
            top: 0;
            height: 0;
            width: 100%;
            height: 76px;
            margin: auto auto;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 99;
            background-color: #101213;
          `,
          className
        )}
      >
        <Box className="header__wrapper"></Box>
      </Box>
    </>
  );
};

export default Header;
