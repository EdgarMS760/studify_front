import React from "react";
import TextCardAtom from "../atoms/TextCardAtom";
import MiniImg from "../atoms/MiniImg";
import { Tooltip, useTheme } from "@mui/material";
import clsx from "clsx";

const CardSideBarGroup = ({ imageSrc, text }) => {  
    const theme= useTheme();
    return (
        <Tooltip title={text} arrow placement="left">
            <div className={clsx("rounded-lg p-3 flex items-center justify-between w-full",  theme.palette.mode === "dark" ? "bg-neutral-600" : "bg-secondary" )}>
                
                <MiniImg 
                    src={imageSrc} 
                    alt={text + " imagen"} 
                    className="rounded-full w-12 h-12 flex-shrink-0" 
                />
                
                <div className="ml-3 flex-1 min-w-0">
                    <TextCardAtom text={text} className="truncate" />
                </div>
            </div>
        </Tooltip>
    );
};

export default CardSideBarGroup;
