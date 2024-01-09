import React from "react";

export default function useShowOnScroll(verticalScroll) {
  // Shows or hide an element beyond a certain vertical scroll Y amount

  if (
    typeof verticalScroll !== "integer" &&
    typeof verticalScroll !== "function"
  ) {
    console.warn("Invalid type for useShownOnScroll");
  }

  const [isShown, setIsShown] = React.useState(false);

  React.useEffect(() => {
    function handleScrollButtonVisibility() {
      if (window.scrollY > verticalScroll) {
        setIsShown(true);
      } else {
        setIsShown(false);
      }
    }
    window.addEventListener("scroll", handleScrollButtonVisibility);
    return () =>
      window.removeEventListener("scroll", handleScrollButtonVisibility);
  }, []);

  return { isShown, setIsShown };
}
