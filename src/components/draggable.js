import React, { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from '@react-spring/web'

function Draggable({xposition, yposition, updatePositions, zoom, children, zindex}) {

  const [dragging, setDragging] = useState(false);
  
  const [{x,y}, api] = useSpring(() => ({x:xposition, y:yposition}), { mass: 0.5, tension: 50, friction: 5 })
  
  const bind = useDrag(({event,tap,first,last,delta:[dx,dy], movement:[x,y]}) => {
    event.preventDefault();
    if(!tap) event.stopPropagation();
    if(first){
      setDragging(true);
      console.log("Started Dragging Element");
    }
    if(last){
      setDragging(false);
      updatePositions(xposition+x,yposition+y);
      console.log("Done Dragging Element")
    }
    api.start({x:xposition+x,y:yposition+y})
  },{
    transform: ([x, y]) => [x / zoom, y / zoom],
    eventOptions: {capture: true},
    preventDefault: true,
    filterTaps: true
  });
  
  let elementStyle={
    position: "absolute",
    top: "0",
    left: "0",
    userSelect: "none",
    touchAction: "none"
  };
  
  return (
    <animated.div className={`draggable ${dragging ? "dragging" : ""}`} {...bind()} style={{x,y,zIndex:`${zindex ? zindex : 0}`, ...elementStyle}}>
      {children}
    </animated.div>
  );
}

export default Draggable;

