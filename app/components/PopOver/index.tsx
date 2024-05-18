import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import { RectPosition } from "./types";
import { useClickOutside, useUpdatePosition } from "./hooks";
import PopOverModal from "./PopOverModal";

type PopOverProps = {
  children: ReactElement;
  content: ReactNode;
};
function PopOver(props: PopOverProps) {
  const { children, content } = props;
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<RectPosition>({
    top: 0,
    left: 0,
  });

  const closePopOver = () => {
    setOpen(false);
  };

  const togglePopOver = () => {
    setOpen(!open);
  };

  useClickOutside({
    ref: containerRef,
    onClickOutside: () => {
      closePopOver();
    },
  });

  useUpdatePosition({
    containerRef,
    childrenRef,
    setPosition,
  });

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        if (modalRef.current?.contains(e.target as Node)) {
          return;
        }
        togglePopOver();
      }}
      className={styles.container}
      aria-hidden
    >
      {Children.map(children, (ele) => {
        return cloneElement(ele, { ref: childrenRef });
      })}
      {open && (
        <PopOverModal ref={modalRef} position={position}>
          {content}
        </PopOverModal>
      )}
    </div>
  );
}

export default PopOver;
