import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import { useClickOutside } from "./hooks";
import PopOverModal from "./PopOverModal";
import { RectPosition } from "./types";

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
    containerRef,
    onClickOutside: () => {
      closePopOver();
    },
  });

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current || !childrenRef.current) {
        return;
      }
      const style = window.getComputedStyle(childrenRef.current);
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom - parseFloat(style.marginBottom),
        left: rect.left + parseFloat(style.marginLeft),
      });
    };
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [containerRef.current, childrenRef.current]);

  return (
    <>
      <div
        ref={containerRef}
        onClick={(e) => {
          if (modalRef.current?.contains(e.target as Node)) {
            // not close the modal when click to the modal
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
      </div>
      {open && (
        <PopOverModal ref={modalRef} position={position}>
          {content}
        </PopOverModal>
      )}
    </>
  );
}

export default PopOver;
