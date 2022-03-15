import React, {memo} from 'react'
import {sketchbook_controls, icon_toggle, detail_panel, detail_content, detail_title, mobile, sketch, selected, large, sketch_thumbnail, sticky, image_wrapper} from '../styles/sketchbook2.module.css'
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {Link} from 'gatsby'


export function Sketch({title,active,setActive, image}){
    // console.log("Sketch Rerendering");
    return(
        <div className={ active ? `${sketch} ${selected}` : sketch } onClick={setActive}>
            {image && <div className={sketch_thumbnail}><GatsbyImage image={getImage(image)} style={{height:"100%"}} objectFit="contain" /></div>}
            {title !== "" && <h1 className={image ? "" : large}>{title}</h1>}
        </div>
    )
}

export function Sticky({text, link}){
    return(
        <React.Fragment>
            {!link && <div className={sticky}>
                <p>{text}</p>
            </div>}
            {link && <a href={link} target="_blank" className={sticky}>
                <p>{text}</p>
                <svg viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.05458 0.100495C7.02779 -0.0334977 6.83622 -0.0334987 6.80943 0.100494L5.98522 4.22315C5.97044 4.2971 5.89402 4.34122 5.82258 4.31705L1.84016 2.96951C1.71072 2.92571 1.61494 3.09162 1.71758 3.18181L4.8758 5.95692C4.93246 6.0067 4.93246 6.09494 4.8758 6.14472L1.71758 8.91983C1.61494 9.01003 1.71072 9.17594 1.84016 9.13214L5.82258 7.7846C5.89402 7.76042 5.97044 7.80454 5.98522 7.8785L6.80943 12.0011C6.83622 12.1351 7.02779 12.1351 7.05458 12.0012L7.87879 7.8785C7.89357 7.80454 7.96999 7.76042 8.04143 7.7846L11.8166 9.062C11.8364 9.12254 11.9005 9.16838 11.976 9.14282L12.0157 9.12939L12.0239 9.13214C12.0884 9.15399 12.1447 9.12363 12.172 9.07651L15.9585 7.79528C16.0299 7.77111 16.1063 7.81523 16.1211 7.88918L16.9453 12.0118C16.9721 12.1458 17.1637 12.1458 17.1905 12.0118L18.0147 7.88918C18.0295 7.81523 18.1059 7.77111 18.1773 7.79528L22.1597 9.14282C22.2892 9.18662 22.385 9.02071 22.2823 8.93052L19.1241 6.15541C19.0674 6.10562 19.0674 6.01739 19.1241 5.96761L22.2823 3.19249C22.385 3.1023 22.2892 2.93639 22.1597 2.98019L18.1773 4.32773C18.1059 4.3519 18.0295 4.30779 18.0147 4.23383L17.1905 0.111178C17.1637 -0.022815 16.9721 -0.022816 16.9453 0.111177L16.1211 4.23383C16.1063 4.30779 16.0299 4.3519 15.9585 4.32773L12.1833 3.05033C12.1634 2.98979 12.0994 2.94395 12.0239 2.96951L11.9842 2.98294L11.976 2.98019C11.9114 2.95833 11.8552 2.9887 11.8279 3.03582L8.04143 4.31705C7.96999 4.34122 7.89357 4.2971 7.87879 4.22315L7.05458 0.100495ZM11.9939 3.31587L8.98821 5.95692C8.93156 6.0067 8.93156 6.09494 8.98821 6.14472L12.006 8.79646L15.0117 6.1554C15.0683 6.10562 15.0683 6.01739 15.0117 5.96761L11.9939 3.31587Z"
                    />
                </svg>
            </a>}
        </React.Fragment>
    )
}

export function SketchbookControls({checked, onCheckedChanged, exportFunction}){
    return(
        <div className={sketchbook_controls}>
            {/* <button onClick={exportFunction}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 5C3 3.89543 3.89543 3 5 3H9H15H16.5858C17.1162 3 17.6249 3.21071 18 3.58579L20.7071 6.29289C20.8946 6.48043 21 6.73478 21 7V19C21 20.1046 20.1046 21 19 21H15H9H5C3.89543 21 3 20.1046 3 19V5ZM9 19H15V13H9V19ZM17 19H19V7.41421L17 5.41421V7C17 8.10457 16.1046 9 15 9H9C7.89543 9 7 8.10457 7 7V5H5V19H7V13C7 11.8954 7.89543 11 9 11H15C16.1046 11 17 11.8954 17 13V19ZM9 5V7H15V5H9Z"/>
                </svg>
            </button>
            <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 4.80713C3 3.70256 3.89543 2.80713 5 2.80713H19C20.1046 2.80713 21 3.70256 21 4.80713V5.77259V9.6121V11.0142C21 11.8268 20.6703 12.6047 20.0864 13.1699L19 14.2213L14.4142 18.8071L13.3059 19.9221C12.7428 20.4886 11.977 20.8071 11.1782 20.8071H8.88006H5C3.89543 20.8071 3 19.9117 3 18.8071V4.80713ZM19 4.80713V10.6735V11.3929L17.7072 12.6857L12.9803 17.4126L11.5858 18.8071H11.0108H5V4.80713H19Z"/>
                    <path d="M19 11.3929V10.6735H13.0108C11.9063 10.6735 11.0108 11.5689 11.0108 12.6735V18.8071H11.5858L12.9803 17.4126V13.6857C12.9803 13.1335 13.428 12.6857 13.9803 12.6857H17.7072L19 11.3929Z"/>
                </svg>
            </button> */}
            <div className={icon_toggle}>
                <input type="checkbox" checked={checked} onChange={onCheckedChanged} />
                <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" />
                </svg>
                <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"/>
                </svg>
            </div>
        </div>
    )
}

export function DetailPanel({close, image, path, link, description, title}){
    const breakpoints = useBreakpoint();

    return(
        <div className={(breakpoints.sm ? `${detail_panel} ${mobile}` : detail_panel)}>
            <div className={detail_title}>
                <h3>{title}</h3>
                <button onClick={close}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                    </svg>
                </button>
            </div>
            <div className={detail_content}>
                <GatsbyImage image={getImage(image)} style={{width:"75%"}} objectFit="contain" className={image_wrapper} />
                <p>{description}</p>
                {link && <a href={link[0]}>{link[1]}</a>}
                {path && <Link to={`/sketchbook${path[0]}`}>{path[1]}</Link>}
            </div>
        </div>
    )
}