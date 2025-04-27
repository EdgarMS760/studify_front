import React, { useEffect } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextCardAtom from '@components/atoms/TextCardAtom';
import clsx from 'clsx';
const CardMaterial = ({ data, isTeacher }) => {
    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank'; // para abrir en nueva pestaña (opcional)
        link.download = ''; // nombre del archivo (opcional, Firebase suele mandar el nombre correcto)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
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
                        text={data.titulo}
                        className="text-lg"
                        isHighlighted={true}
                    />
                    <TextCardAtom
                        text={'archivo'}
                        className="text-sm text-gray-500"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <IconButton
                    aria-label="download"
                    onClick={() => handleDownload(data.archivo)}
                    sx={[
                        (theme) => ({
                            color: theme.vars.palette.secondary.main,
                        }),
                        (theme) =>
                            theme.applyStyles('dark', {
                                color: "white",
                            }),
                    ]}
                >
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