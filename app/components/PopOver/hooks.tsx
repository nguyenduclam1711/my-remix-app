import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { RectPosition } from "./types";

type UseClickOutsideArgs = {
  onClickOutside: () => void;
  ref: RefObject<HTMLDivElement>;
  modalRef: RefObject<HTMLDivElement>;
};
export const useClickOutside = (args: UseClickOutsideArgs) => {
  const { ref, modalRef, onClickOutside } = args;

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const onClick = (e: MouseEvent) => {
      if (modalRef.current?.contains(e.target as Node)) {
        return;
      }
      if (e.target instanceof Node && !element.contains(e.target)) {
        onClickOutside();
      }
    };
    window.setTimeout(() => document.addEventListener("click", onClick), 0);
    return () => {
      window.setTimeout(
        () => document.removeEventListener("click", onClick),
        0
      );
    };
  }, [ref, modalRef]);
};

type UseUpdatePositionArgs = {
  childrenRef: RefObject<HTMLElement>;
  setPosition: Dispatch<SetStateAction<RectPosition>>;
}
export const useUpdatePosition = (args: UseUpdatePositionArgs) => {
  const { childrenRef, setPosition } = args;

  useEffect(() => {
    const updatePosition = () => {
      if (!childrenRef.current) {
        return;
      }
      const childrenRect = childrenRef.current.getBoundingClientRect();
      setPosition({
        top: childrenRect.y + childrenRect.height,
        left: childrenRect.x,
      });
    };
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [childrenRef]);
};
