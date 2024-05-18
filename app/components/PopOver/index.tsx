import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  useRef,
  useState,
} from "react";
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
  const childrenRef = useRef<any>(null);
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
    ref: childrenRef,
    onClickOutside: closePopOver,
    modalRef,
  });

  useUpdatePosition({
    childrenRef,
    setPosition,
  });

  return (
    <>
      {Children.map(children, (ele) => {
        return cloneElement(ele, { ref: childrenRef, onClick: togglePopOver });
      })}
      {open && (
        <PopOverModal ref={modalRef} position={position}>
          {content}
        </PopOverModal>
      )}
    </>
  );
}

export default PopOver;
