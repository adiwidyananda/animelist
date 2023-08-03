import cx from "classnames";
import { Box, Container } from "@components";
import { css } from "@emotion/css";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const headerItem = css`
    color: rgb(103, 102, 110);
    font-size: 18px;
    &:hover {
      color: rgb(26, 39, 82);
    }
  `;
  return (
    <>
      <Box
        className={cx(
          css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 76px;
            margin: auto auto;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 99;
            background-color: #101213;
          `,
          className
        )}
      >
        <Container>
          <Box>
            <Link
              className={css`
                text-decoration: none;
              `}
              href="/"
            >
              <span className={headerItem}>Home</span>
            </Link>
            <Link
              className={css`
                text-decoration: none;
              `}
              href="/collections"
            >
              <span
                className={cx(
                  headerItem,
                  css`
                    margin-left: 8px;
                  `
                )}
              >
                Collections
              </span>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
