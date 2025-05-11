import { useEffect, useState } from "react";
import TextCardAtom from "@components/atoms/TextCardAtom";
import ButtonAtom from "@components/atoms/ButtonAtom";
import clsx from "clsx";
import { Box, IconButton, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from '@libs/constants/routes';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { getDetailTask } from '@services/taskService';

import dayjs from "dayjs";
import { formatDateToLocal } from "../../libs/helpers/dateUtils";
const DetailTaskStudent = () => {
    const [isDelivered, setIsDelivered] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const { id, taskId } = useParams()
    const navigate = useNavigate();
    const handleDeliveryToggle = () => {
        setIsDelivered(!isDelivered);
    };
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        date: null,
        value: 0,
    });


    const handleFileChange = (e) => {
        setUploadedFile(e.target.files[0]);
    };
    const returnToTask = () => {
        navigate(ROUTES.GROUP_TASKS(id));
    }

    const fetchDetailTask = async () => {
        try {
            const { titulo, descripcion, fecha_vencimiento, puntos_totales } = await getDetailTask(taskId);
            setTaskData({
                title: titulo,
                description: descripcion,
                Date: formatDateToLocal(fecha_vencimiento),
                value: puntos_totales,
            });
        } catch (error) {
            console.error("Error fetching task details:", error);
        }
    }


    useEffect(() => {
        fetchDetailTask();
    }, []);

    return (
        <Box className={clsx("m-3 space-y-6 p-4")}
            sx={[
                (theme) => ({
                    backgroundColor: "white",
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
            ]}>

            <div className="flex items-center justify-between">
                <IconButton onClick={returnToTask} aria-label="editTask" color="primary" size="large">
                    <KeyboardReturnIcon fontSize="inherit" />
                </IconButton>
                <TextCardAtom
                    text={taskData.title}
                    className="text-xl"
                    isHighlighted={true}
                />

                <div className="flex flex-col justify-center">
                    <ButtonAtom
                        onClick={handleDeliveryToggle}
                    >
                        {isDelivered ? "Deshacer entrega" : "Entregar"}
                    </ButtonAtom>
                    <TextCardAtom
                        text={`Fecha de entrega: ${taskData.Date} `}
                        className="text-sm text-gray-500"
                    />
                </div>
            </div>

            <Box sx={[
                (theme) => ({
                    backgroundColor: theme.vars.palette.secondary.main,
                    borderRadius: "8px",
                }),
                (theme) =>
                    theme.applyStyles('dark', {
                        backgroundColor: 'black',
                    })]}>

                <TextCardAtom
                    text="Descripción de la tarea"
                    className={clsx("text-lg p-3 rounded-md shadow-sm"
                    )}

                />
            </Box>


            {uploadedFile && (
                <Box className={clsx("border p-3 rounded-md shadow-sm"
                )}
                    sx={[
                        (theme) => ({
                            backgroundColor: "white",
                        }),
                        (theme) =>
                            theme.applyStyles('dark', {
                                backgroundColor: theme.vars.palette.secondary.main,
                            })]}
                >
                    <p className="text-sm font-medium">Archivo subido:</p>
                    <p className="text-sm text-blue-600 truncate">{uploadedFile.name}</p>
                </Box>
            )}


            {!isDelivered && (
                <div>
                    <label
                        htmlFor="fileUpload"
                        className="bg-primary inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-primaryHover transition"
                    >
                        {uploadedFile ? "Cambiar archivo" : "Subir archivo"}
                    </label>
                    <input
                        id="fileUpload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            )}
        </Box>
    );
};

export default DetailTaskStudent;
