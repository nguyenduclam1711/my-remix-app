import { RefObject, useEffect } from "react";

type UseClickOutsideArgs = {
  onClickOutside: () => void;
  containerRef: RefObject<HTMLDivElement>;
};
export const useClickOutside = (args: UseClickOutsideArgs) => {
  const { containerRef, onClickOutside } = args;

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
