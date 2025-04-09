import React from "react";
import TextCardAtom from "../atoms/TextCardAtom";
import MiniImg from "../atoms/MiniImg";
import { Box, Tooltip, useTheme } from "@mui/material";
import clsx from "clsx";

const CardSideBarGroup = ({ imageSrc, text }) => {  
    const theme= useTheme();

    return (
        <Tooltip title={text} arrow placement="left">
            <Box className={clsx("rounded-lg p-3 flex items-center justify-between w-full cursor-pointer")}
             sx={[
                (theme) => ({
                    backgroundColor: theme.vars.palette.secondary.main,
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: theme.vars.palette.secondary.light,
                    }),
            ]}
            >
                
                <MiniImg 
                    src={imageSrc} 
                    alt={text + " imagen"} 
                    className="rounded-full w-12 h-12 flex-shrink-0" 
                />
                
                <div className="ml-3 flex-1 min-w-0">
                    <TextCardAtom text={text} className="truncate" />
                </div>
            </Box>
        </Tooltip>
    );
};

export default CardSideBarGroup;
