import React from 'react'
import MiniImg from '@components/atoms/MiniImg'
import TextCardAtom from '@components/atoms/TextCardAtom'
import clsx from 'clsx'
import { useTheme } from '@emotion/react'
import { Box, IconButton, Tooltip } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from '@libs/store/SnackbarContext'
const CardStudentTask = ({ data, onSelect, isSelected }) => {
    const theme = useTheme();
    const { showSnackbar } = useSnackbar();

    const handleClick = () => {
        if (data.estatus === "No entregado") {
            showSnackbar("El alumno no ha entregado la tarea", "error");
        } else {
            onSelect();
        }
    };
    const template = (status) => {
        switch (status) {
            case "No entregado":
                return theme.palette.mode === 'dark' ? "!text-red-500" : "text-red-500";
            case "Entregado":
                return theme.palette.mode === 'dark' ? "!text-sky-500" : "text-sky-500";
            case "Revisado":
                return theme.palette.mode === 'dark' ? "!text-green-500" : "text-green-500";
            default:
                return "text-gray-500";
        }
    };
    return (
        <Box
            onClick={handleClick}
            className={clsx(
                'm-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4 transition-colors'
            )}

            sx={[
                (theme) => ({
                    cursor: data.estatus !== "No entregado" ? "pointer" : "default",
                    color: isSelected ? theme.vars.palette.common.white : theme.vars.palette.text.primary,
                    backgroundColor: isSelected
                        ? theme.vars.palette.primary.main
                        : theme.vars.palette.common.white,
                    '&:hover': {
                        backgroundColor: theme.vars.palette.primary.main,
                        color: !isSelected ? theme.vars.palette.common.white : undefined,
                    },
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: isSelected
                            ? theme.vars.palette.neutral?.[700] ?? theme.vars.palette.grey[800]
                            : theme.vars.palette.neutral?.[800] ?? theme.vars.palette.grey[900],
                        color: theme.vars.palette.common.white,
                        '&:hover': {
                            backgroundColor:
                                theme.vars.palette.neutral?.[700] ?? theme.vars.palette.grey[800],
                        },
                    }),
            ]}
        >
            <MiniImg src={data.foto_perfil || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nombre_usuario)}`} />
            <TextCardAtom text={data.nombre_usuario} className="text-lg truncate" />
            <TextCardAtom
                text={data.estatus}
                className={clsx("text-lg", template(data.estatus), {
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
        </Box>
    );
};

export default CardStudentTask;
