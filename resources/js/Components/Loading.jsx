import React from "react";

export default function Loading()
{
    return(
        <div
        className="d-flex justify-content-center align-items-center">
        <div
            className="spinner-border spinner-border-sm"
            role="status"
            style={{color: 'purple'}}
        >
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    )
}