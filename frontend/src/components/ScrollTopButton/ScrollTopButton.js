import useShowOnScroll from "@/hooks/useWindowScroll";
import { MoveUp } from "lucide-react";
import React from "react";
import styles from "./ScrollTopButton.module.css";

export default function ScrollTopButton({
  scrollTarget: scrollTargetSelectorString,
  ...rest
}) {
  const { isShown } = useShowOnScroll(120);

  function handleScrollTopButtonClick() {
    const target = document.querySelector(scrollTargetSelectorString);
    target.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }

  return (
    <button
      className={styles.scrollTopBtn}
      style={{
        opacity: isShown ? 1 : 0,
        transform: isShown ? "translateY(0px)" : "translateY(100px)",
        transition: "opacity, transform",
        transitionTimingFunction: isShown
          ? "linear, cubic-bezier(0,1.47,.82,1.56)"
          : "linear, ease-in",
        transitionDuration: isShown ? "300ms, 400ms" : "300ms, 400ms",
      }}
      type="button"
      onClick={handleScrollTopButtonClick}
      onTouchStart={handleScrollTopButtonClick}
      {...rest}
    >
      <div className={styles.scrollTopBtnContents}>
        <MoveUp className={styles.upIcon} strokeWidth={1.5} />
        <span>To top</span>
      </div>
    </button>
  );
}
