import React from "react"
import Layout from "./layout"
import paddingstyles from '../styles/pagePadding.module.css'
import "../styles/typography.css"
import "../styles/article.css"

export default function Article({ children, className }){
    return(
        <Layout>
            <main className={paddingstyles.padding}>
                <article className={className}>
                {children}
                </article>
                <hr />
            </main>
        </Layout>
    )
}