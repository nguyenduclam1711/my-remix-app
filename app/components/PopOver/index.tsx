import { ReactNode, useRef, useState } from "react";
import { useClickOutside } from "./hooks";
import PopOverModal from "./PopOverModal";
import styles from "./styles.module.css";

type PopOverProps = {
  children: ReactNode;
  content: ReactNode;
}
function PopOver(props: PopOverProps) {
  const { children, content } = props;
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  const closePopOver = () => {
    setOpen(false);
  };

  const togglePopOver = () => {
    setOpen(!open);
  };

  useClickOutside({
    ref,
    onClickOutside: () => {
      closePopOver();
    },
  });

  return (
    <div
      ref={ref}
      onClick={(e) => {
        if (e.target === modalRef.current) {
          // not close the modal when click to the modal
          return;
        }
        togglePopOver();
      }}
      aria-hidden
      className={styles.container}
    >
      {children}
      {open && (
        <PopOverModal ref={modalRef}>
          {content}
        </PopOverModal>
      )}
    </div>
  );
}

export default PopOver;
