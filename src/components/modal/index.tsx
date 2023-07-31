import { Box } from "@components";
import { css } from "@emotion/css";
import cx from "classnames";

const Modal = ({ children, isOpen, setIsOpen }: any) => {
  return (
    <>
      {isOpen && (
        <Box
          className={cx(
            "modal",
            css`
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 999;
              background-color: rgba(0, 0, 0, 0.4);
            `
          )}
        >
          <Box
            className={cx(
              "modal-wrapper",
              css`
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              `
            )}
          >
            <Box
              onClick={() => setIsOpen(false)}
              className={cx(
                "modal-wrapper-outsider",
                css`
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.4);
                  z-index: 10;
                `
              )}
            ></Box>
            <Box
              className={cx(
                "modal-wrapper-body",
                css`
                  position: relative;
                  z-index: 20;
                  height: fit-content;
                  width: fit-content;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `
              )}
            >
              {children}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Modal;
