import React from "react";
import { NavBar } from "./NavBar";
import Head from "next/head";

type PageProps = {
    title?: string,
}

export const Page: React.FC<PageProps> = ({title, children}) => {
    return (
        <>
            {/* Head content TODO: improve me for metadata tags... */}
            <Head>
                <title>{title || "⚽ Bitly Ball"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Navigation */}
            <NavBar/>

            {/* Page content */}
            <div className="mx-auto max-w-6xl px-6">
                {children}
            </div>
        </>
    )
}