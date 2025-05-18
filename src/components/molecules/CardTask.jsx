import { useTheme } from '@emotion/react';
import clsx from 'clsx';
import React from 'react'
import TextCardAtom from '../atoms/TextCardAtom';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';

dayjs.extend(utc);
dayjs.extend(timezone);

const CardTask = ({ taskData, onClickCard, isGeneral = false }) => {
    const handleClick = () => {
        if (onClickCard) {
            onClickCard(taskData.grupo._id, taskData._id);
        }

    }
    const fechaUTC = dayjs.utc(taskData.fecha_vencimiento);
    const fechaLocal = fechaUTC.tz('America/Monterrey');

    const fechaGeneral = fechaLocal.locale('es').format('DD MMMM YYYY');
    const fechadetalle = fechaLocal.locale('es').format('DD [de] MMMM [a las] HH:mm');



    return (
        <Box
            onClick={handleClick}
            className={clsx(
                "p-4 rounded-lg shadow-sm mx-3 transition duration-300 ease-in-out cursor-pointer"
            )}
            sx={[
                (theme) => ({
                    backgroundColor: theme.vars.palette.secondary.main,
                    '&:hover': {
                        backgroundColor: theme.vars.palette.secondary.dark || theme.palette.secondary.dark,
                        transform: 'scale(1.02)',
                    },
                }),
                (theme) =>
                    theme.applyStyles?.('dark', {
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
            ]}
        >

            <div className="grid grid-cols-3 items-center">

                <div className="flex justify-start">
                    <TextCardAtom text={isGeneral ? taskData.grupo.nombre : fechaGeneral} className="text-lg truncated" isHighlighted={true} />
                </div>

                <div className="flex justify-center text-center">
                    <TextCardAtom text={taskData.titulo} className="text-lg font-semibold" isHighlighted={true} />
                </div>

                <div className="flex flex-col items-end text-right">
                    <TextCardAtom text={taskData.puntos_totales + " puntos"} className="text-lg font-semibold" isHighlighted={true} />
                    <TextCardAtom
                        text={taskData.estatus === "Cerrada" ? "Expiró el " + fechadetalle : "Expira el " + fechadetalle}
                        className={clsx("text-sm font-semibold",
                            taskData.estatus === "Cerrada" && "!text-red-500"
                        )}
                        isHighlighted={false}
                    />
                </div>
            </div>
        </Box >
    );
};

export default CardTask;
