import { Box } from "@components";
import { css } from "@emotion/css";
import Link from "next/link";

interface CollectionTagComponent {
  linkUrl: string;
  name: string;
}

const CollectionTag = ({ linkUrl, name }: CollectionTagComponent) => {
  return (
    <Link
      className={css`
        text-decoration: none;
      `}
      href={linkUrl}
    >
      <Box
        className={css`
          background: rgb(26, 39, 82);
          border: none;
          padding: 4px 8px;
          color: white;
          cursor: pointer;
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
          font-size: 12px;
          font-weight: 500;
          &:hover {
            background: #141217;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
          }
        `}
      >
        {name}
      </Box>
    </Link>
  );
};

export default CollectionTag;
