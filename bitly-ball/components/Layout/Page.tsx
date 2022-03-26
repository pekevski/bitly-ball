import React from "react";
import { NavBar } from "./NavBar";

type PageProps = {}

export const Page: React.FC<PageProps> = ({children}) => {
    return (
        <>
            <NavBar/>
            <div className="mx-auto max-w-6xl px-6">
                {children}
            </div>
        </>
    )
}