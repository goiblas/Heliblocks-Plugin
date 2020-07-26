import React from "react";
import ParserV1 from "./v1"

const Parser = ({ version, ...props}) => {
    switch (version) {
        case "v1":
            return <ParserV1 {...props} />
    
        default:
            return <ParserV1 {...props} />
    }
}

export const version = "v1"; 
export default Parser;