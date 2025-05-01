import React, { useState } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextCardAtom from '@components/atoms/TextCardAtom';
import clsx from 'clsx';
import { deleteMaterial } from '@services/materialService';
import { useSnackbar } from '@libs/store/SnackbarContext';
import { deleteImageByUrl } from '@libs/helpers/firebaseUtils';

const CardMaterial = ({ data, isTeacher, onDelete }) => {
    const { showSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.download = ''; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleConfirm = () => {
        handleDelete(data._id);
        setOpen(false);
      };
    const handleDelete = async () => {
        try {
            const response = await deleteMaterial(data._id);
            if (response.message === "Material eliminado exitosamente") {
                await deleteImageByUrl(data.archivo);

                onDelete();
                showSnackbar(response.message, "success");
            }
        } catch (err) {
            console.error("Error al obtener materiales:", err);
            const message = err.response?.data?.error || "Error al obtener materiales.";
            showSnackbar(message, "error");
        }
    }
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
                        text={data.tipo || 'Archivo'}
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
                    (
                        <>
                            <IconButton aria-label="delete" onClick={() => { setOpen(true); }} sx={[
                                (theme) => ({
                                    color: theme.vars.palette.secondary.main,
                                }),
                                (theme) =>
                                    theme.applyStyles('dark', {
                                        color: "white",
                                    }),
                            ]}>
                                <DeleteForeverIcon />
                            </IconButton>

                            <Dialog
                                open={open}
                                onClose={() => setOpen(false)}
                            >
                                <DialogTitle>¿Confirmar eliminación?</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Esta acción no se puede deshacer. ¿Seguro que quieres eliminarlo?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpen(false)} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={handleConfirm} color="error" variant="contained">
                                        Eliminar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
            </div>
        </Box>
    )
}

export default CardMaterial