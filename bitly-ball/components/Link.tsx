import NextLink from "next/link";
import React from "react";
import clsx from 'clsx';


type LinkProps = {
    href: string
};

const Link: React.FC<LinkProps> = ({children, href}) => {

    return (
        <NextLink href={href}>
            <a
                className={clsx(
                    "text-sm", 
                    "font-semibold",
                    "text-gray-500", 
                    "hover:text-gray-700",
                    "hover:underline"
                )}>
                {children}
            </a>
        </NextLink>
    );
};

export default Link;