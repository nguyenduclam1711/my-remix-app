import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { RectPosition } from "./types";

type UseClickOutsideArgs = {
  onClickOutside: () => void;
  ref: RefObject<HTMLDivElement>;
};
export const useClickOutside = (args: UseClickOutsideArgs) => {
  const { ref: containerRef, onClickOutside } = args;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const onClick = (e: MouseEvent) => {
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
  }, [containerRef, onClickOutside]);
};

type UseUpdatePositionArgs = {
  containerRef: RefObject<HTMLDivElement>;
  childrenRef: RefObject<HTMLElement>;
  setPosition: Dispatch<SetStateAction<RectPosition>>;
}
export const useUpdatePosition = (args: UseUpdatePositionArgs) => {
  const { containerRef, childrenRef, setPosition } = args;

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current || !childrenRef.current) {
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
  }, [childrenRef.current]);
};
