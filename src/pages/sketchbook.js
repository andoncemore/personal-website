import React, {useState, useCallback, useMemo, useEffect} from 'react'
import Navbar from '../components/navbar'
import {interactive_container, message} from '../styles/sketchbook2.module.css'
import {Pannable, MemoDraggable} from '../components/canvas'
import {Sketch, Sticky, SketchbookControls, DetailPanel} from '../components/sketchbookElements'
import Seo from "../components/SEO"

import { useStaticQuery, graphql } from 'gatsby'
import sketchContent from "../../content/sketchbook/sketches.json"


function Sketchbook({location}) {
    const [camera, setCamera] = useState({x:360, y:450, z:1});
    const [activeSketch, setActiveSketch] = useState(null);
    const [sketches, setSketches] = useState([]);
    const [stickies, setStickies] = useState([]);

    const spreadsheetID = "10M2ECbg4MBqcMOa-bRA-ZDgHVHlcXjScfvtBFL_kSN0"


    //Mockdata
    // const [sketches, setSketches] = useState([
    //     { id: "blackout-poems", x: 100, y: 100 },
    //     { id: "manual-learning", x: 200, y: 100 },
    //     { id: "predpol-is", x: 0, y: 0 },
    //     { id: "reciept-cardsorting", x: 500, y: 500 }
    // ]);
    // const [stickies, setStickies] = useState([
    //     {title: "making before you know what you are making", link:"https://www.are.na/adit-dhanushkodi/making-before-knowing-what-you-re-making", x:100, y:300},
    //     {title:"unconventional interactions", link:"https://www.are.na/adit-dhanushkodi/unconventional-interactions", x:200, y:500},
    //     {title: "into the black box", link:"https://www.are.na/adit-dhanushkodi/into-the-black-box",x:300,y:300}
    // ]);

    useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/Sheet1!A2:D?key=AIzaSyCnC-tVQgJgiC5kdsyHjGfw5lCsx6TbRRs`)
            .then((res) => res.json())
            .then((data) => {
                setSketches(data.values.map((raw) => ({
                    id:raw[0],
                    x: parseFloat(raw[1]),
                    y: parseFloat(raw[2]),
                    order: parseInt(raw[3])
                    })
                ));
        });
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/Sheet2!A2:D?key=AIzaSyCnC-tVQgJgiC5kdsyHjGfw5lCsx6TbRRs`)
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

    const imageData = useStaticQuery(graphql`
        query SketchbookImages2 {
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


    const constraints = useMemo(() => {
        // console.log("calculating constraints")
        let allThings = [...sketches, ...stickies];
        if(allThings.length > 0){
          let xmax = allThings.reduce((a, b) => Math.max(a, b.x), allThings[0].x);
          let xmin = allThings.reduce((a, b) => Math.min(a, b.x), allThings[0].x);
          let ymax = allThings.reduce((a, b) => Math.max(a, b.y), allThings[0].y);
          let ymin = allThings.reduce((a, b) => Math.min(a, b.y), allThings[0].y);
          return {xmin, xmax,ymin, ymax}
        }
        else{
          return {xmin:0, xmax: 0, ymin: 0, ymax: 0}
        }
    }, [sketches, stickies]);

    const getThumbnail = (key) => {
        let value = imageData.allFile.edges.find((edge) => edge.node.name === key);
        if(value){
            return value.node
        }
        else{
            return null;
        }
    }

    const updateSketches = useCallback((index,newX, newY) => {
        setSketches(original => {
            let updated = [...original];
            updated[index].x = newX;
            updated[index].y = newY;
            return updated;
        })
    },[]);

    const updateStickies = useCallback((index,newX,newY) => {
        setStickies(original => {
            let updated = [...original];
            updated[index].x = newX;
            updated[index].y = newY;
            return updated;
        })
    },[]);

    const getSketch = useCallback((index) => {
        return(
            <Sketch 
                image={getThumbnail(sketches[index].id)}
                {...sketchContent[sketches[index].id]}
                active={sketches[index].id === activeSketch}
                setActive={() => setActiveSketch(id => (id === sketches[index].id ? null : sketches[index].id))} 
            />
        )
    },[activeSketch,sketches]);

    const getSticky = useCallback((index) => {
        return(
            <Sticky text={stickies[index].title} link={stickies[index].link} />
        )
    },[stickies]);

    const toggleZoom = () => {
        setCamera(camera => {
            return({
                x: camera.x,
                y: camera.y,
                z: (camera.z === 0.75 ? 1 : 0.75)
            })
        })
    }

    const printPositions = () => {
        console.log(sketches.map((val) => `${val.id}, ${val.x}, ${val.y}, ${val.order}`).join("\n"));
        console.log("\n\n");
        console.log(stickies.map((val) => `${val.title}, ${val.x}, ${val.y}`).join("\n"));
        console.log("\n\n");
        console.log(sketches);
    }

    // const publishToSpreadsheet = () => {
    //     let data = {
    //         range: 'Sheet1!A2:D',
    //         majorDimension: 'ROWS',
    //         values: sketches.map((val) => [val.id, val.x, val.y, val.order])
    //     }
    //     fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${data.range}?valueInputOption=USER_ENTERED&key=${process.env.GATSBY_SHEETS_KEY}`,{
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then(res => res.json()).then(d => console.log('Success', d))
    // }


    return(
        <React.Fragment>
            <Seo title="Sketchbook" />
            <Navbar location={location} />
            <div className={message}>
                <p>Experimental functionality: Pan around and drag anything!</p>
                <p>Click on a sketch to see more about the work.</p>
            </div>
            <SketchbookControls
                checked={camera.z === 0.75}
                onCheckedChanged={toggleZoom}
                exportFunction={printPositions}
            />
            {activeSketch && <DetailPanel
                close={() => setActiveSketch(null)}
                image={getThumbnail(activeSketch)}
                {...sketchContent[activeSketch]} 
             />}
            <div className={interactive_container}>
                <Pannable camera={camera} setCamera={setCamera} constraints={constraints}>
                    {[...sketches.filter(val => val.id in sketchContent).map((sketch,index) => 
                        <MemoDraggable 
                            xpos={sketch.x}
                            ypos={sketch.y}
                            zoom={camera.z}
                            index={index}
                            key={sketch.id}
                            getContent={getSketch}
                            updatePosition={updateSketches}
                        />
                    ), ...stickies.map((sticky, index) => 
                        <MemoDraggable 
                            xpos={sticky.x}
                            ypos={sticky.y}
                            zoom={camera.z}
                            index={index}
                            key={index}
                            getContent={getSticky}
                            updatePosition={updateStickies}
                            zIndex={-1}
                        />
                    )]}
                </Pannable>
            </div>
        </React.Fragment>
    )
}

export default Sketchbook;