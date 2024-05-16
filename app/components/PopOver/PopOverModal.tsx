import { ReactNode, forwardRef, useEffect, useState } from "react";

import styles from "./styles.module.css";

type PopOverModalProps = {
  children: ReactNode;
}
const PopOverModal = forwardRef((props: PopOverModalProps, ref: any) => {
  const { children } = props;
  const [boxHeight, setBoxHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setBoxHeight(ref.current?.clientHeight);
    }
  }, [ref.current?.clientHeight]);

  return (
    <div
      className={styles.modal}
      style={{
        bottom: -boxHeight,
        opacity: boxHeight > 0 ? 1 : 0,
      }}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default PopOverModal;
