import React, {useState, memo, useRef, useEffect} from 'react'
import {useGesture, useDrag} from "@use-gesture/react"
import {useSpring, animated } from "@react-spring/web"
import {scrollbars, vertical_scrollbar,horizontal_scrollbar, currently_dragging,draggable} from '../styles/sketchbook2.module.css'


export function Pannable({children, constraints, camera, setCamera}){
    const interactiveRef = useRef(null);
    const {height, width} = useWindowDimensions(interactiveRef);

    //Functions to move the canvas
    function screenToCanvas(screen, camera){
        return {
            x: screen.x / camera.z - camera.x,
            y: screen.y / camera.z - camera.y
        };
    }
    function panCamera(camera, dx, dy){
        let xmin = 0 - constraints.xmax;
        let xmax = width / camera.z - constraints.xmin;
        let ymin = 0 - constraints.ymax;
        let ymax = height / camera.z - constraints.ymin;
        return {
            x: Math.min(Math.max(camera.x - dx / camera.z, xmin),xmax),
            y: Math.min(Math.max(camera.y - dy / camera.z, ymin), ymax),
            z: camera.z
        }
    }
    function zoomCamera(camera, screenPoint, dz){
        const zoom = dz;
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
    };

     // Gesture Handlers
    useGesture(
        {
            onPinch: ({origin, offset}) => {
                // setCamera(c => 
                //     zoomCamera(
                //         c,
                //         {x: origin[0], y: origin[1]},
                //         offset[0]
                //     )
                // );
            },
            onWheel: ({delta}) => {
                setCamera(camera => panCamera(camera, delta[0], delta[1]));
            }
        },
        {
            eventOptions: {passive: false, capture: true},
            target: interactiveRef,
            wheel:{
                preventDefault: true
            },
            pinch: {
                scaleBounds: {min:0.5,max:3}
            }
        }
    );

    const bind = useDrag(
        ({delta,target,cancel}) => {
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

    //Container Styles
    let panContainerStyle = {
        transformOriginX: "0px",
        transformOriginY: "0px",
        transformBox: "view-box",
        transform: `scale(${camera.z}) translate(${camera.x}px, ${camera.y}px)`,
        color: 'blue',
        zIndex: '1',
        padding: '0'
    }

    let containerStyle = {
        height: `100%`,
        touchAction: `none`,
        overflow: `hidden`,
        position: 'relative',
        padding: `0`
    }
    // console.log("Rendering Pannable")
    return(
        <div className="pan_container" style={containerStyle} {...bind()} ref={interactiveRef}>
            <div style={panContainerStyle}>
                {children}
            </div>
            <Scrollbars height={height} width={width} constraints={constraints} camera={camera} />
        </div>
    )
}

function Scrollbars({constraints, camera, width, height}){
    let full_width = constraints.xmax - (constraints.xmin - width / camera.z)
    let scroll_width = (width / camera.z) / (full_width + width/camera.z);
    let scroll_x = ((camera.x + constraints.xmax) / full_width)*(1-scroll_width);

    let full_height = constraints.ymax - (constraints.ymin - height / camera.z)
    let scroll_height = (height / camera.z) / (full_height + height/camera.z);
    let scroll_y = ((camera.y + constraints.ymax) / full_height)*(1-scroll_height);

    let horizontalStyle = {
        position: "absolute",
        width: `${scroll_width*100}%`,
        right: `${scroll_x*100}%`
    }

    let verticalStyle = {
        position: "absolute",
        height: `${scroll_height*100}%`,
        bottom: `${scroll_y*100}%`
    }

    let scrollbarStyle = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: "1",
        pointerEvents: 'none'
    }

    return(
        <div style={scrollbarStyle} className={scrollbars}>
            <div style={horizontalStyle} className={horizontal_scrollbar}></div>
            <div style={verticalStyle} className={vertical_scrollbar}></div>
        </div>
    )
}

function Draggable({xpos,ypos,updatePosition,zoom, index, getContent, zIndex}){
    const [dragging, setDragging] = useState(false);
    const [{x,y}, api] = useSpring(() => ({x:xpos, y:ypos}));

    const bind = useDrag(({event, tap, first, last, delta:[dx,dy], movement: [x,y]}) => {
        event.preventDefault();
        if(!tap) event.stopPropagation();
        if(first){
            setDragging(true)
        }
        if(last){
            setDragging(false);
            updatePosition(index, xpos+x, ypos+y);
        }
        api.start({x:xpos+x, y:ypos+y})
    },{
        eventOptions: {capture: true},
        preventDefault: true,
        filterTaps: true,
        transform: (([x,y]) => [x/zoom, y/zoom]),
    },[]);

    let elementStyle = {
        position: "absolute",
        top: '0',
        left: `0`,
        userSelect: "none",
        touchAction: "none",
    };

    // console.log("Draggable Rerendering", index);
    return(
        <animated.div style={{x, y,zIndex:`${zIndex ? zIndex : 'unset'}`, ...elementStyle}} {...bind()} className={dragging ? `${draggable} ${currently_dragging}` : draggable }>
            {getContent(index)}
        </animated.div>
    )
}
export const MemoDraggable = memo(Draggable);

function getWindowDimensions(element){
    const {offsetWidth: width, offsetHeight: height} = element.current;
    return{
        width,
        height
    };
}

function useWindowDimensions(ref){
    const [windowDimensions, setWindowDimensions] = useState({width:0,height:0});
    useEffect(() => {
        setWindowDimensions(getWindowDimensions(ref))
        
        function handleResize() {
          setWindowDimensions(getWindowDimensions(ref));
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [ref]);

    return windowDimensions;
}