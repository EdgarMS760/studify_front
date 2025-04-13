import { useTheme } from '@emotion/react';
import clsx from 'clsx';
import React from 'react'
import TextCardAtom from '../atoms/TextCardAtom';
import { Box } from '@mui/material';

const CardTask = ({ taskData, onClickCard, isGeneral=false}) => {
    const theme = useTheme();
    const handleClick = () => {
        if (onClickCard) {
            onClickCard(taskData.id);
        }
    }
    
            //theme.palette.mode === 'dark' ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-white hover:bg-primary'
    return (
        <Box onClick={handleClick} className={clsx(
            "p-4 rounded-lg shadow-sm mx-3 transition duration-300 ease-in-out cursor-pointer"
        )}  sx={[
            (theme) => ({
                backgroundColor: theme.vars.palette.secondary.main,
            }),
            (theme) =>
                theme.applyStyles('dark', {
                    backgroundColor: theme.vars.palette.secondary.main,
                }),
        ]}>
            <div className="grid grid-cols-3 items-center">

                <div className="flex justify-start">
                    <TextCardAtom text={isGeneral ? taskData.groupName : taskData.date} className="text-lg" isHighlighted={true} />
                </div>

                <div className="flex justify-center text-center">
                    <TextCardAtom text={taskData.name} className="text-lg font-semibold" isHighlighted={true} />
                </div>

                <div className="flex flex-col items-end text-right">
                    <TextCardAtom text={taskData.points + " puntos"} className="text-lg font-semibold" isHighlighted={true} />
                    <TextCardAtom
                        text={`${taskData.expired ? "Venció" :"Vence"} el ${taskData.date} a las ${taskData.time}`}
                        className={clsx("text-sm font-semibold",
                            taskData.expired && "!text-red-500"
                        )}
                        isHighlighted={false}
                    />
                </div>
            </div>
        </Box>
    );
};

export default CardTask;
