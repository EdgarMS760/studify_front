import React, { useEffect } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, IconButton, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextCardAtom from '../atoms/TextCardAtom';
import clsx from 'clsx';
const CardMaterial = ({ data, isTeacher }) => {

    const theme = useTheme()

    return (
        <Box className={clsx('flex flex-row justify-between items-center rounded-lg shadow-md p-4 w-full h-20'
        )}
            sx={[
                (theme) => ({
                    backgroundColor: "white",
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
            ]}>
            <div className='flex flex-row items-center'>

                <IconButton aria-label="file" sx={[
                    (theme) => ({
                        color: theme.vars.palette.secondary.main,
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            color: "white",
                        }),
                ]}>
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
                <IconButton aria-label="download" sx={[
                    (theme) => ({
                        color: theme.vars.palette.secondary.main,
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            color: "white",
                        }),
                ]}>
                    <DownloadIcon />
                </IconButton>
                {isTeacher &&

                    (<IconButton aria-label="delete" sx={[
                        (theme) => ({
                            color: theme.vars.palette.secondary.main,
                        }),
                        (theme) =>
                            theme.applyStyles('dark', {
                                color: "white",
                            }),
                    ]}>
                        <DeleteForeverIcon />
                    </IconButton>)
                }
            </div>
        </Box>
    )
}

export default CardMaterial