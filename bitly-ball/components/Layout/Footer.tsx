import React from "react";

type FooterProps = {}

export const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className="flex items-center justify-center w-full h-24 border-t">
            <a
                className="flex items-center justify-center"
                href="https://pekevski.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Created by Daniel Pekevski
            </a>
        </footer>
    )
}