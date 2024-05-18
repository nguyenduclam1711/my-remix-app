import { ReactNode, forwardRef, useRef } from "react";

import styles from "./styles.module.css";
import { RectPosition } from "./types";

type PopOverModalProps = {
  children: ReactNode;
  position: RectPosition;
};
const PopOverModal = forwardRef<HTMLDivElement, PopOverModalProps>(
  (props, ref) => {
    const { children, position } = props;
    const currRef = useRef<HTMLDivElement | null>(null);

    return (
      <div
        className={styles.modal}
        style={{
          top: position.top,
          left: position.left,
          opacity: position.top > 0 ? 1 : 0,
        }}
        ref={(node) => {
          currRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      >
        {children}
      </div>
    );
  }
);

PopOverModal.displayName = "PopOverModal";

export default PopOverModal;
