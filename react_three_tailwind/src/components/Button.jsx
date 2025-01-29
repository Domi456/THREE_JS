import React from "react";

const Button = ({href, name, isBeam = false, containerClass}) => {
    return(
        <a href={href} className={`btn ${containerClass} flex items-center rounded bg-gray-800 text-white font-generalsans text-base py-2 px-4`}>
            {isBeam && (
                <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"/>
                </span>
            )}
            {name}
        </a>
    )
}

export default Button;