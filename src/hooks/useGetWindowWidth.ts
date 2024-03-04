import { useEffect, useState } from "react";

const MIN_WIDTH = 800;

export const useGetWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < MIN_WIDTH;

  return {
    windowWidth,
    isMobile,
  };
};
