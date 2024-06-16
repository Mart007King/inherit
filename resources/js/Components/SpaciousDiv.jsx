import React from "react"

export default function SpaciousDiv({children, className, ...props})
{
    return(
        <div 
        {...props}
        className={
            `mt-2 mb-2` + className
        }
        >
            {children}
        </div>
    )
}