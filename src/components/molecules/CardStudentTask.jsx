import React from 'react'
import MiniImg from '@components/atoms/MiniImg'
import TextCardAtom from '../atoms/TextCardAtom'
import clsx from 'clsx'
import { useTheme } from '@emotion/react'
import { IconButton, Tooltip } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
const CardStudentTask = ({ data, onSelect, isSelected }) => {
    const theme = useTheme();

    const template = (status) => {
        switch (status) {
            case "notDelivered":
                return theme.palette.mode === 'dark' ? "!text-red-500" : "text-red-500";
            case "delivered":
                return theme.palette.mode === 'dark' ? "!text-sky-500" : "text-sky-500";
            case "reviewed":
                return theme.palette.mode === 'dark' ? "!text-green-500" : "text-green-500";
            default:
                return "text-gray-500";
        }
    };
    return (
        <div
            onClick={onSelect}
            className={clsx(
                'cursor-pointer m-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4 transition-colors',
                {
                    'bg-primary text-white': isSelected && theme.palette.mode === 'light',
                    'bg-neutral-700 text-white': isSelected && theme.palette.mode === 'dark',
                    'bg-white hover:bg-primary': !isSelected && theme.palette.mode === 'light',
                    'bg-neutral-800 hover:bg-neutral-700': !isSelected && theme.palette.mode === 'dark',
                }
            )}
        >
            <MiniImg src="https://placeholder.co/60" />
            <TextCardAtom text={data.name} className="text-lg truncate" />
            <TextCardAtom
                text={data.status}
                className={clsx("text-lg", template(data.status), {
                    'text-white': isSelected && theme.palette.mode === 'light',
                })}
                isHighlighted={true}
            />
            <div className='lg:hidden '>

                <Tooltip title="Ver Archivo">
                    <IconButton aria-label="viewFile" color="secondary">
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default CardStudentTask;
