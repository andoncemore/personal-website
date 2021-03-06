import React from "react"
import parse, {attributesToProps} from "html-react-parser"

export default function ResponsiveIframe({ iframeString, className, style }){
    const options = {
        replace: ({attribs}) => {
            if(!attribs){
                return;
            }
            const props = attributesToProps(attribs);
            return (
            <div 
                style={{position: "relative", height: 0, overflow: "hidden", paddingBottom: `${props.height/props.width*100}%`, ...style}} 
                className={className}
            >
                <iframe style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} {...props} ></iframe>
            </div>)
        }
    }

    return(
        parse(iframeString, options)
    )
}
