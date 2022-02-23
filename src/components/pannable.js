import React, {useState, useRef} from "react";
import { useGesture, useDrag } from "@use-gesture/react";
import useWindowDimensions from "./useWindowDimensions";

function Pannable({ constraints, children, zoom }) {
  
  const interactiveEl = useRef(null);
  
  const { height, width } = useWindowDimensions(interactiveEl);
  
  const [camera, setCamera] = useState({ x: 425, y: -15, z: 1 });
  function screenToCanvas(screen, camera) {
    return {
      x: screen.x / zoom - camera.x,
      y: screen.y / zoom - camera.y
    };
  }

  function panCamera(camera, dx, dy) {
    let minX = 0 - constraints.maxX;
    let maxX = width / zoom - constraints.minX - 100;
    let minY = 0 - constraints.maxY;
    let maxY = height / zoom - constraints.minY - 50;
    return {
      x: Math.min(Math.max(camera.x - dx / zoom, minX), maxX),
      y: Math.min(Math.max(camera.y - dy / zoom, minY), maxY),
      z: zoom
    };
  }

  function zoomCamera(camera, screenPoint, zoom) {
    // let limited_zoom = Math.min(Math.max(zoom, 0.3), 3);
    // const zoom = zoom - dz * zoom;
    const p1 = screenToCanvas(screenPoint, camera);
    const p2 = screenToCanvas(screenPoint, {
      x: camera.x,
      y: camera.y,
      z: zoom
    });
    return {
      x: camera.x + (p2.x - p1.x),
      y: camera.y + (p2.y - p1.y),
      z: zoom
    };
  }

  function createScrollbars() {
    let fullwidth =
      width / zoom - constraints.minX + constraints.maxX - 200;
    let scrollwidth = (width / zoom / fullwidth) * 100;
    let widthpos =
      ((100 - scrollwidth) *
        (width / zoom - constraints.minX - camera.x - 200)) /
      fullwidth;

    let fullheight =
      height / zoom - constraints.minY + constraints.maxY - 200;
    let scrollheight = (height / zoom / fullheight) * 100;
    let heightpos =
      ((100 - scrollheight) *
        (height / zoom - constraints.minY - camera.y - 200)) /
      fullheight;
    
    let containerStyle = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "1",
      pointerEvents: "none"
    };
    
    let verticalStyle = {
      position:"absolute",
      height: `${scrollheight}%`,
      top: `${heightpos}%`,
    }
    
    let horizontalStyle = {
      position:"absolute",
      width: `${scrollwidth}%`,
      left: `${widthpos}%`,
    }

    return (
      <div className="scrollbars" style={containerStyle}>
        <div
          className="vertical"
          style={verticalStyle}
        ></div>
        <div
          className="horizontal"
          style={horizontalStyle}
        ></div>
      </div>
    );
  }

  useGesture(
    {
      onPinch: ({ origin, offset }) => {
        // console.log(delta,offset[0])
        setCamera(camera =>
          zoomCamera(
            camera,
            { x: origin[0], y: origin[1] },
            offset[0]
          )
        );
      },
      onWheel: ({ delta }) => {
        setCamera(camera => panCamera(camera, delta[0], delta[1]));
      }
    },
    {
      eventOptions: { passive: false, capture:true},
      target: interactiveEl,
      wheel: {
        preventDefault: true
      },
      pinch: {
          scaleBounds: {min:0.3,max:3}
      }
    }
  );

  const bind = useDrag(
    ({ delta, first, last, type, target, cancel }) => {
      console.log(target);
      if(target.className === "pan_container"){
        setCamera(camera => panCamera(camera, -delta[0], -delta[1]));
      }
      else{
        cancel();
      }
    },
    {
      preventDefault: true
    }
  );

  let pannableStyle = {
    transformOriginX: "0px",
    transformOriginY: "0px",
    transformBox: "view-box",
    transform: `scale(${zoom}) translate(${camera.x}px, ${camera.y}px)`,
    color: "blue",
    zIndex: `1`,
    padding: '0'
  };
  
  let containerStyle = {
    height: `100%`,
    touchAction: `none`,
    overflow: `hidden`,
    position: 'relative',
    padding: "0"
  }

  return (
    <div
      className="pan_container"
      style={containerStyle}
      {...bind()}
      ref={interactiveEl}
    >
      <div style={pannableStyle}>
        {children(zoom)}
      </div>
      {createScrollbars()}
      {/* {console.log(camera)} */}
    </div>
  );
}

export default Pannable;

