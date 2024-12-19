"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export default function Page() {
  const scrollDirection = useScrollDirectionWithEffect();
  // const scrollDirection = useScrollDirectionWithUSES();

  console.log(scrollDirection);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center text-4xl m-[500px] bg-white text-black">
        {scrollDirection}
      </div>
      <Colours />
      <Colours />
      <Colours />
      <Colours />
    </div>
  );
}

const Colours = () => (
  <div>
    <div className="h-[400px] bg-amber-200" />
    <div className="h-[400px] bg-red-200" />
    <div className="h-[400px] bg-blue-200" />
    <div className="h-[400px] bg-green-200" />
    <div className="h-[400px] bg-fuchsia-200" />
  </div>
);

const useScrollDirectionWithEffect = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    const getScrollDirection = () => {
      const currentScrollTop = document.documentElement.scrollTop;

      if (Math.abs(scrollTop - currentScrollTop) < 20) return;

      const isScrolledDown = scrollTop < currentScrollTop;

      setScrollTop(currentScrollTop);
      setScrollDirection(isScrolledDown ? "down" : "up");
    };

    window.addEventListener("scroll", getScrollDirection);

    return () => {
      window.removeEventListener("scroll", getScrollDirection);
    };
  });

  return scrollDirection;
};

const useScrollDirectionWithUSES = () => {
  return useSyncExternalStore(subscribeToScrollEvent, getScrollDirection);
};

const subscribeToScrollEvent = (onStoreChange: () => void) => {
  window.addEventListener("scroll", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
  };
};

let previousScrollTop = 0;
let previousScrollDirection = "";

const getScrollDirection = () => {
  const currentScrollTop = document.documentElement.scrollTop;

  if (Math.abs(previousScrollTop - currentScrollTop) < 20) {
    return previousScrollDirection;
  }

  const isScrolledDown = previousScrollTop < currentScrollTop;
  const currentScrollDirection = isScrolledDown ? "down" : "up";

  previousScrollTop = currentScrollTop;
  previousScrollDirection = currentScrollDirection;

  return currentScrollDirection;
};
