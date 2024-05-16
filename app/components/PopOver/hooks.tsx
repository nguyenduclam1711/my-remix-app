import { RefObject, useEffect } from "react";

type UseClickOutsideArgs = {
  onClickOutside: () => void;
  ref: RefObject<HTMLDivElement>;
};
export const useClickOutside = (args: UseClickOutsideArgs) => {
  const { ref, onClickOutside } = args;

  useEffect(() => {
    const element = ref.current;
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
  }, [ref, onClickOutside]);
};
