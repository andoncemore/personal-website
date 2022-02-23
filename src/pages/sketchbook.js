import React, {useState, useEffect} from "react"
import { useStaticQuery, graphql } from 'gatsby'
import Navbar from '../components/navbar'
import Pannable from "../components/pannable"
import Draggable from "../components/draggable"
import Sketch from "../components/sketch"
import Sticky from "../components/sticky"
import "@fontsource/ibm-plex-serif/400.css"
import "@fontsource/ibm-plex-serif/600.css"
import "@fontsource/ibm-plex-serif/400-italic.css"
import "@fontsource/ibm-plex-serif/600-italic.css"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/700.css"
import "@fontsource/dm-sans/400.css"
import "@fontsource/dm-sans/400-italic.css"
import "../styles/site.css"
import SEO from "../components/SEO"
import "../styles/sketchbook.css"
import sketchContent from "../../content/sketchbook/sketches.json"



export default function Sketchbook({location}) {

    // const [pos, setPos] = useState([
    //     { id: "blackout-poems", x: 100, y: 100 },
    //     { id: "manual-learning", x: 200, y: 100 },
    //     { id: "predpol-is", x: 0, y: 0 },
    //     { id: "reciept-cardsorting", x: 500, y: 500 }
    // ]);
    // const [stickies, setStickies] = useState([
    //     {title: "making before you know what you are making", link:"https://www.are.na/adit-dhanushkodi/making-before-knowing-what-you-re-making", x:100, y:300},
    //     {title:"unconventional interactions", link:"https://www.are.na/adit-dhanushkodi/unconventional-interactions", x:200, y:500},
    //     {title: "into the black box", link:"https://www.are.na/adit-dhanushkodi/into-the-black-box",x:300,y:300}
    // ])
    const [pos, setPos] = useState([]);
    const [stickies, setStickies] = useState([]);
    const [zoom, setZoom] = useState(false)

    const spreadsheetID = "10M2ECbg4MBqcMOa-bRA-ZDgHVHlcXjScfvtBFL_kSN0"

    useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/Sheet1!A2:D?key=${process.env.GATSBY_SHEETS_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                setPos(data.values.map((raw) => ({
                    id:raw[0],
                    x: parseFloat(raw[1]),
                    y: parseFloat(raw[2]),
                    order: parseInt(raw[3])
                    })
                ));
            });

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/Sheet2!A2:D?key=${process.env.GATSBY_SHEETS_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                setStickies(data.values.map((raw) => ({
                    title:raw[0],
                    x: parseFloat(raw[1]),
                    y: parseFloat(raw[2]),
                    link: raw[3]
                    })
                ));
            });
        
    },[]);

    const publishToSpreadsheet = () => {
        let data = {
            range: 'Sheet1!A2:D',
            majorDimension: 'ROWS',
            values: pos.map((val) => [val.id, val.x, val.y, val.order])
        }
        console.log(pos.map((val) => `${val.id}, ${val.x}, ${val.y}, ${val.order}`).join("\n"));
        console.log("\n\n");
        console.log(stickies.map((val) => `${val.title}, ${val.x}, ${val.y}`).join("\n"));
        console.log("\n\n");
        console.log(pos);
        // fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${data.range}?valueInputOption=USER_ENTERED&key=${process.env.GATSBY_SHEETS_KEY}`,{
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // }).then(res => res.json()).then(d => console.log('Success', d))
    }

    const updatePositions = (index, newX, newY) => {
        let newArr = [...pos];
        newArr[index].x = newX;
        newArr[index].y = newY;
        setPos(newArr);
    };

    const updateStickies = (index, newX, newY) => {
        let newArr = [...stickies];
        newArr[index].x = newX;
        newArr[index].y = newY;
        setStickies(newArr)
    }

    const getConstraints = () => {
        let allThings = [...pos, ...stickies];
        if(allThings.length > 0){
            let maxX = allThings.reduce((a, b) => Math.max(a, b.x), allThings[0].x);
            let minX = allThings.reduce((a, b) => Math.min(a, b.x), allThings[0].x);
            let maxY = allThings.reduce((a, b) => Math.max(a, b.y), allThings[0].y);
            let minY = allThings.reduce((a, b) => Math.min(a, b.y), allThings[0].y);
            return {
                maxX: maxX,
                minX: minX,
                maxY: maxY,
                minY: minY
            };
        }
        else{
            return {
                maxX: 0,
                minX: 0,
                maxY: 0,
                minY: 0
            };
        }
    };

    const data = useStaticQuery(graphql`
        query SketchbookImages {
            allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, sourceInstanceName: {eq: "sketchbook"}, relativeDirectory: {eq: ""}}) {
            edges {
                node {
                name
                childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED, width: 350, placeholder:TRACED_SVG, transformOptions: {grayscale: true})
                }
                }
            }
            }
        }
    `);

    const getThumbnail = (key) => {
        let value = data.allFile.edges.find((edge) => edge.node.name === key);
        if(value){
            return value.node;
            // return value.node.childImageSharp.fluid
        }
        else{
            return undefined;
        }
    } 

    const getProjects = (zoom) => {
        return pos.filter((val) => val.id in sketchContent).map((val,index) => (
            <Draggable
                key={val.id}
                xposition={val.x}
                yposition={val.y}
                updatePositions={(x,y) => updatePositions(index,x,y)}
                zoom={zoom}
                zindex={1}
            >
                <Sketch image={getThumbnail(val.id)} {...sketchContent[val.id]} />
            </Draggable>
        ))
    }

    const getStickies = (zoom) => {
        return stickies.map((val, index) => (
            <Draggable
                key={index}
                xposition={val.x}
                yposition={val.y}
                updatePositions={(x,y) => updateStickies(index,x,y)}
                zoom={zoom}
            >
                <Sticky text={val.title} link={val.link} />
            </Draggable>
        ))
    }


    return (
        <React.Fragment>
            <SEO 
                meta={[{
                    name: `viewport`,
                    content: `width=device-width, user-scalable=no`
                    }
                ]}
                title="Sketchbook"
            />
            <Navbar location={location} />
            <div className="sketchbook-controls">
                {/* <button onClick={() => publishToSpreadsheet()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H9H15H16.5858C17.1162 3 17.6249 3.21071 18 3.58579L20.7071 6.29289C20.8946 6.48043 21 6.73478 21 7V19C21 20.1046 20.1046 21 19 21H15H9H5C3.89543 21 3 20.1046 3 19V5ZM9 19H15V13H9V19ZM17 19H19V7.41421L17 5.41421V7C17 8.10457 16.1046 9 15 9H9C7.89543 9 7 8.10457 7 7V5H5V19H7V13C7 11.8954 7.89543 11 9 11H15C16.1046 11 17 11.8954 17 13V19ZM9 5V7H15V5H9Z"/>
                    </svg>
                </button> */}
                {/* <button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 4.80713C3 3.70256 3.89543 2.80713 5 2.80713H19C20.1046 2.80713 21 3.70256 21 4.80713V5.77259V9.6121V11.0142C21 11.8268 20.6703 12.6047 20.0864 13.1699L19 14.2213L14.4142 18.8071L13.3059 19.9221C12.7428 20.4886 11.977 20.8071 11.1782 20.8071H8.88006H5C3.89543 20.8071 3 19.9117 3 18.8071V4.80713ZM19 4.80713V10.6735V11.3929L17.7072 12.6857L12.9803 17.4126L11.5858 18.8071H11.0108H5V4.80713H19Z"/>
                        <path d="M19 11.3929V10.6735H13.0108C11.9063 10.6735 11.0108 11.5689 11.0108 12.6735V18.8071H11.5858L12.9803 17.4126V13.6857C12.9803 13.1335 13.428 12.6857 13.9803 12.6857H17.7072L19 11.3929Z"/>
                    </svg>
                </button> */}
                <div className="icon-toggle">
                    <input type="checkbox" checked={zoom} onChange={() => setZoom(zoom => !zoom)} />
                    <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" />
                    </svg>
                    <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"/>
                    </svg>
                </div>
            </div>
            <div className="message">
                <p>*The functionality and content here is a work in progress.</p>
            </div>
            <div className="fullpage">
                <Pannable constraints={getConstraints()} zoom={(zoom ? 0.55 : 1)}>
                    {(zoom) => {
                        return getProjects(zoom).concat(getStickies(zoom));
                    }}
                </Pannable>
                <svg width="900" height="600" viewBox="0 0 900 600" style={{position: 'absolute', height: 0}}>
                    <filter id="myfilter2">
                        <feColorMatrix type="matrix" values=".33 .33 .33 0 0
                        .33 .33 .33 0 0
                        .33 .33 .33 0 0
                        0   0   0  1 0">
                        </feColorMatrix>
                        <feComponentTransfer colorInterpolationFilters="sRGB">
                        <feFuncR type="table" tableValues=".25490196  1"></feFuncR>
                            <feFuncG type="table" tableValues=".32941176  1"></feFuncG>
                            <feFuncB type="table" tableValues=".90980392  1"></feFuncB>
                        </feComponentTransfer>
                    </filter>
        </svg>
            </div>
        </React.Fragment>
    )
}

