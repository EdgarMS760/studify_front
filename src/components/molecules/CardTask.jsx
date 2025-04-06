import { useTheme } from '@emotion/react';
import clsx from 'clsx';
import React from 'react'
import TextCardAtom from '../atoms/TextCardAtom';

const CardTask = ({ taskData }) => {
    const theme = useTheme();

    return (
        <div className={clsx(
            "p-4 rounded-lg shadow-sm mx-3",
            theme.palette.mode === 'dark' ? 'bg-neutral-800' : 'bg-white'
        )}>
            <div className="grid grid-cols-3 items-center">

                <div className="flex justify-start">
                    <TextCardAtom text={taskData.date} className="text-lg" isHighlighted={true} />
                </div>

                <div className="flex justify-center text-center">
                    <TextCardAtom text={taskData.name} className="text-lg font-semibold" isHighlighted={true} />
                </div>

                <div className="flex flex-col items-end text-right">
                    <TextCardAtom text={taskData.points + " puntos"} className="text-lg font-semibold" isHighlighted={true} />
                    <TextCardAtom
                        text={`${taskData.expired ? "Venció" :"Vence"} el ${taskData.date} a las ${taskData.time}`}
                        className={clsx("text-sm font-semibold",
                            taskData.expired ? "!text-red-500" : "text-black"
                        )}
                        isHighlighted={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardTask;
