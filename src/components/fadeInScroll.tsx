import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
  fadeInSection: {
    opacity: 0.1,
    transition: "opacity 1.2s ease-in-out",
  },
  fadeInSectionActive: {
    opacity: 1,
  },
}));

export const FadeInScroll: React.FC<{ children: React.ReactNode }> = (prop) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [contentRef, setContentRef] = useState<HTMLElement | any>(null);

  useEffect(() => {
    function handleScroll() {
      if (!contentRef) {
        return;
      }

      const contentRect = contentRef.getBoundingClientRect();
      const isVisible = contentRect.top < window.innerHeight;

      setIsVisible(isVisible);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [contentRef]);

  return (
    <div
      ref={setContentRef}
      className={`${classes.fadeInSection} ${
        isVisible ? classes.fadeInSectionActive : ""
      }`}
    >
      {prop.children}
    </div>
  );
};
