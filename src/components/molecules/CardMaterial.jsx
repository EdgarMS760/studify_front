import React, { useEffect } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { IconButton, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextCardAtom from '../atoms/TextCardAtom';
import clsx from 'clsx';
const CardMaterial = ({ data, isTeacher }) => {

    const theme = useTheme()

    return (
        <div className={clsx('flex flex-row justify-between items-center rounded-lg shadow-md p-4 w-full h-20',
            theme.palette.mode === "dark" ? "bg-neutral-800" : "bg-white"
        )}>
            <div className='flex flex-row items-center'>

                <IconButton aria-label="file" color="secondary">
                    <InsertDriveFileIcon />
                </IconButton>

                <div className="flex flex-col justify-center">

                    <TextCardAtom
                        text={data.name}
                        className="text-lg"
                        isHighlighted={true}
                    />
                    <TextCardAtom
                        text={data.type}
                        className="text-sm text-gray-500"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <IconButton aria-label="download" color="secondary">
                    <DownloadIcon />
                </IconButton>
                {isTeacher &&

                    (<IconButton aria-label="delete" color="secondary">
                        <DeleteForeverIcon />
                    </IconButton>)
                }
            </div>
        </div>
    )
}

export default CardMaterial