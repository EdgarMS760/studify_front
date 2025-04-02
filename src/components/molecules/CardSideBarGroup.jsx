import React from "react";
import TextCardAtom from "../atoms/TextCardAtom";
import MiniImg from "../atoms/MiniImg";
import { Tooltip } from "@mui/material";

const CardSideBarGroup = ({ imageSrc, text }) => {  
    return (
        <Tooltip title={text} arrow placement="left">
            <div className="bg-secondary rounded-lg p-3 flex items-center justify-between w-full">
                {/* Imagen */}
                <MiniImg 
                    src={imageSrc} 
                    alt={text + " imagen"} 
                    className="rounded-full w-12 h-12 flex-shrink-0" 
                />

                {/* Texto (se adapta al espacio disponible) */}
                <div className="ml-3 flex-1 min-w-0">
                    <TextCardAtom text={text} className="truncate" />
                </div>
            </div>
        </Tooltip>
    );
};

export default CardSideBarGroup;
