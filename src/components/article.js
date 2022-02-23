import React from "react"
import Layout from "./layout"
import {padding} from '../styles/pagePadding.module.css'
import "../styles/typography.css"
import "../styles/article.css"

export default function Article({ children, className, location }){
    return(
        <Layout location={location}>
            <main className={padding}>
                <article className={className}>
                {children}
                </article>
                <hr />
            </main>
        </Layout>
    )
}