import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Provider, { useProvider } from "../provider";

interface PopoverProps {
  children: [React.ReactElement, React.ReactNode];
  className?: string;
}

function Popover(props: PopoverProps) {
  const [openPopover, setOpenPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const context = useProvider();
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPopover(false);
      }
    };
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpenPopover(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const DropIn = {
    initial: {
      x: "-50%",
      clipPath: "circle(0% at 50% 0%)",
    },
    animate: {
      x: "-50%",
      clipPath: "circle(200% at 50% 0%)",
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      x: "-50%",
      clipPath: "circle(0% at 50% 0%)",
    },
  };
  return (
    <Provider
      value={{
        ...context,
        popover: {
          open: openPopover,
        },
      }}
    >
      <div ref={popoverRef} className={`relative w-fit ${props.className}`}>
        <span
          className="cursor-pointer"
          onClick={() => {
            setOpenPopover((current) => !current);
          }}
        >
          {props.children[0]}
        </span>
        <AnimatePresence>
          {openPopover && (
            <motion.div
              variants={DropIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-full left-1/2 z-10"
            >
              {props.children[1]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Provider>
  );
}

export default Popover;
