import React from "react"


export default function ResponsiveIframe({ iframeString, className, style }){
    const parser = new DOMParser();
    const iframeDOM = parser.parseFromString(iframeString, "text/html").querySelector('iframe');
    let width =  iframeDOM.getAttribute('width');
    let height = iframeDOM.getAttribute('height');
    iframeDOM.removeAttribute('width');
    iframeDOM.removeAttribute('height');
    iframeDOM.setAttribute('style', `position:absolute; top: 0; left:0; width:100%; height:100%;`)


    return(
        <div
        className={className}
        style={{position: "relative", height: 0, overflow: "hidden", paddingBottom: `${height/width*100}%`, ...style }}
         dangerouslySetInnerHTML={{ __html: iframeDOM.outerHTML}} />
    )
}