import { useState, useEffect } from 'react';

function getWindowDimensions(element) {
  // console.log(element);
  const { offsetWidth: width, offsetHeight: height } = element.current;
  // console.log(width,height);
  return {
    width,
    height
  };
}

export default function useWindowDimensions(ref) {
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