import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link} from 'gatsby'

export default function Sketch({ image, title, path, link, description }){
    return(
        <React.Fragment>
          {path && <Link to={`/sketchbook${path}`} className="sketch">
            {image && <div className="sketch-thumbnail"><GatsbyImage image={getImage(image)} style={{height:"100%"}} objectFit="contain" /></div>}
            <h1>{title}</h1>
        </Link>}

        {link && <a href={link} className="sketch">
            {image && <div className="sketch-thumbnail"><GatsbyImage image={getImage(image)} style={{height:"100%"}} objectFit="contain" /></div>}
            <h1>{title}</h1>
        </a>}  
        </React.Fragment>
    )
}



