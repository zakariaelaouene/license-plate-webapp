import { motion } from "framer-motion";
import For from "../for";
import Show from "../show";
import { useEffect, useMemo, useState } from "react";

interface TabsProps {
  labels: (string | React.ReactNode)[];
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  activeClassName?: string;
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
  index: number;
  onChange: (index: number) => void;

  indicator?: boolean;
}

function getLabelWidth(index: number) {
  const activeLabel = document.getElementById(`tab-${index}`);
  if (activeLabel) {
    return activeLabel.getBoundingClientRect().width;
  }
  return 0;
}

function getLabelScreenX(index: number) {
  const activeLabel = document.getElementById(`tab-${index}`);
  const tabs = document.getElementById(`tabs`);
  if (activeLabel && tabs) {
    return (
      activeLabel.getBoundingClientRect().x - tabs.getBoundingClientRect().x
    );
  }
  return 0;
}

type Position = {
  x: number;
  width: number;
};

function getPositions(total: number): Position[] {
  const positions: {
    x: number;
    width: number;
  }[] = [];
  for (let i = 0; i < total; i++) {
    positions.push({
      x: getLabelScreenX(i),
      width: getLabelWidth(i),
    });
  }
  return positions;
}

function Tabs({ labels, indicator = true, ...props }: TabsProps) {
  const [index, setIndex] = useState(props.index);
  const [width, setWidth] = useState(0);
  function ResizeObserver() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);
  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    window.addEventListener("resize", ResizeObserver);
    return () => {
      window.removeEventListener("resize", ResizeObserver);
    };
  }, []);

  useEffect(() => {
    setPositions(getPositions(labels.length));
  }, [labels, labels.length, width]);

  return (
    <div id="tabs" className="relative flex w-fit h-fit">
      <For each={labels}>
        {(item, i) => (
          <div
            id={`tab-${i}`}
            className={`px-2  py-1 cursor-pointer ${props.labelClassName} ${
              index === i && props.activeClassName
            }`}
            onClick={() => {
              setIndex(i);
              props.onChange(i);
            }}
            style={{
              ...props.labelStyle,
              ...(index === i && props.activeStyle),
            }}
          >
            {item}
          </div>
        )}
      </For>
      {indicator !== false && (
        <motion.div
          className={`absolute h-1  bottom-0 bg-primary rounded ${props.indicatorClassName}}`}
          animate={{
            x: positions[index]?.x,
            width: getLabelWidth(index),
          }}
          style={props.indicatorStyle}
        ></motion.div>
      )}
    </div>
  );
}

export default Tabs;
