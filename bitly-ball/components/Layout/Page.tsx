import React from "react";

type PageProps = {}

export const Page: React.FC<PageProps> = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen h-screen items-center">
            {children}
        </div>
    )
}