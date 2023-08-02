import { Box } from "@components";
import { InfoType } from "@libs/utils/type";
import { css } from "@emotion/css";
import cx from "classnames";

const Info = ({ label, description }: InfoType) => {
  return (
    <Box
      className={cx(css`
        border-bottom: 2px solid #0f1834;
        padding-bottom: 4px;
        margin-top: 8px;
      `)}
    >
      {label} : {description}
    </Box>
  );
};

export default Info;
