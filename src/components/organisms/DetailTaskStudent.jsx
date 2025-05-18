import { useEffect, useState } from "react";
import TextCardAtom from "@components/atoms/TextCardAtom";
import ButtonAtom from "@components/atoms/ButtonAtom";
import clsx from "clsx";
import { Box, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@libs/constants/routes";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { getDetailTask } from "@services/taskService";
import { formatDateToLocal } from "@libs/helpers/dateUtils";
import { getFileType } from '@libs/helpers/filesUtils';
import { uploadImageAndGetUrl, deleteImage,deleteImageByUrl } from '@libs/helpers/firebaseUtils';
import { uploadTask } from "@services/taskService";
import { useSnackbar } from '@libs/store/SnackbarContext';
import { deleteUploadTask } from "../../services/taskService";
const DetailTaskStudent = () => {
    const { showSnackbar } = useSnackbar();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        date: null,
        value: 0,
        fileUrl: null,
        status: null,
        taskStatus: null,
        grade: null,
        gradedDate: null,
    });

    const { id, taskId } = useParams();
    const navigate = useNavigate();

    const returnToTask = () => {
        navigate(ROUTES.GROUP_TASKS(id));
    };

    const handleFileChange = (e) => {
        setUploadedFile(e.target.files[0]);
    };

    const fetchDetailTask = async () => {
        try {
            const data = await getDetailTask(taskId);
            setTaskData({
                title: data.titulo,
                description: data.descripcion,
                date: formatDateToLocal(data.fecha_vencimiento),
                value: data.puntos_totales,
                fileUrl: data.entrega?.archivo_entregado || null,
                status: data.entrega?.estatus || "No entregado",
                taskStatus: data.estatus,
                grade: data.entrega?.calificacion || null,
                gradedDate: formatDateToLocal(data.entrega?.fecha_revision) || null,
            });
        } catch (error) {
            console.error("Error fetching task details:", error);
        }
    };

    useEffect(() => {
        fetchDetailTask();
    }, []);

    const isExpired = taskData.taskStatus === "Cerrada";

    const handleDelivery = async () => {
        let fileRef;
        try {
            let fileURL = uploadedFile || null;


            if (uploadedFile && typeof uploadedFile !== "string") {
                const { url, fileRef: uploadedRef } = await uploadImageAndGetUrl(
                    uploadedFile,
                    "taskFiles"
                );
                fileURL = url;
                fileRef = uploadedRef;
            }
            const fileType = getFileType(uploadedFile?.name);

            const response = await uploadTask(taskId, {
                archivo_entregado: fileURL,
                tipo_archivo: fileType
            });

            showSnackbar(response.message, "success");
            setTaskData((prev) => ({
                ...prev,
                status: response.entrega?.estatus || "No entregado",
                fileUrl: response.entrega?.archivo_entregado || null,
            }));

        }
        catch (error) {
            console.error("Error uploading task:", error);
            const message = error.response?.data?.error || "Error al subir la tarea.";
            showSnackbar(message, "error");
            if (fileRef) {
                await deleteImage(fileRef);
            }
        }

    };
    const handleDeleteDelivery = async () => {
        let fileRef;
        const oldFile = taskData.fileUrl; 
        try {
            const response = await deleteUploadTask(taskId);
            showSnackbar(response.message, "success");
            if (
                oldFile &&
                oldFile.includes("firebasestorage.googleapis.com")
            ) {
                await deleteImageByUrl(oldFile);
            }
            fetchDetailTask();
        } catch (error) {
            console.error("Error deleting task delivery:", error);
            const message = error.response?.data?.error || "Error al deshacer la entrega.";
            showSnackbar(message, "error");
        }
    };
    return (
        <Box
            className={clsx("m-3 space-y-6 p-4")}
            sx={[
                (theme) => ({
                    backgroundColor: "white",
                }),
                (theme) =>
                    theme.applyStyles("dark", {
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
            ]}
        >
            <div className="flex items-center justify-between">
                <IconButton onClick={returnToTask} color="primary" size="large">
                    <KeyboardReturnIcon fontSize="inherit" />
                </IconButton>

                <TextCardAtom text={taskData.title} className="text-xl" isHighlighted />

                <div className="flex flex-col justify-center">
                    {!isExpired && taskData.status === "No entregado" && (
                        <ButtonAtom onClick={handleDelivery}>
                            Entregar
                        </ButtonAtom>
                    )}
                    {!isExpired && taskData.status === "Entregado" && (
                        <ButtonAtom onClick={handleDeleteDelivery}>
                            Deshacer entrega
                        </ButtonAtom>
                    )}

                    <TextCardAtom
                        text={
                            taskData.taskStatus === "Cerrada"
                                ? taskData.status === "No entregado"
                                    ? `La tarea expiró el ${taskData.date}`
                                    : taskData.status === "Entregado"
                                        ? `Tarea entregada el ${taskData.date}`
                                        : `Tarea revisada el ${taskData.date}`
                                : taskData.status === "No entregado"
                                    ? `Puedes entregar esta tarea hasta el ${taskData.date}`
                                    : taskData.status === "Entregado"
                                        ? `Tarea ya entregada (vence el ${taskData.date})`
                                        : `Tarea revisada el ${taskData.gradedDate}`
                        }
                        className="text-sm text-gray-500"
                    />

                </div>
            </div>

            <TextCardAtom text="Descripción de la tarea" className="mb-0 ml-2" />

            <Box
                sx={[
                    (theme) => ({
                        backgroundColor: theme.vars.palette.secondary.main,
                        borderRadius: "8px",
                    }),
                    (theme) =>
                        theme.applyStyles("dark", {
                            backgroundColor: "black",
                        }),
                ]}
            >
                <TextCardAtom
                    text={taskData.description}
                    className="text-lg p-3 rounded-md shadow-sm"
                />
            </Box>

            {(uploadedFile || taskData.fileUrl) && (
                <Box
                    className="border p-3 rounded-md shadow-sm"
                    sx={[
                        (theme) => ({ backgroundColor: "white" }),
                        (theme) =>
                            theme.applyStyles("dark", {
                                backgroundColor: theme.vars.palette.secondary.main,
                            }),
                    ]}
                >
                    <p className="text-sm font-medium">Archivo entregado:</p>
                    {uploadedFile ? (
                        <p className="text-sm text-blue-600 truncate">{uploadedFile.name}</p>
                    ) : (
                        <a
                            href={taskData.fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline"
                        >
                            Ver archivo
                        </a>
                    )}
                </Box>
            )}


            {/* Estado: Revisado */}
            {taskData.status === "Revisado" && (
                <Box className="p-3 rounded-md bg-green-100 text-green-800">
                    <p>
                        Tu calificación es de <strong>{taskData.grade}</strong> puntos.
                    </p>
                </Box>
            )}

            {/* Estado: Entregado */}
            {taskData.status === "Entregado" && !isExpired && (
                <Box className="p-3 rounded-md bg-yellow-100 text-yellow-800">
                    <p>Tu tarea ha sido entregada y está pendiente de revisión.</p>
                </Box>
            )}

            {/* Estado: No entregado */}
            {taskData.status === "No entregado" && !isExpired && (
                <>
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
                </>
            )}

            {/* Tarea expirada */}
            {isExpired && (
                <Box className="p-3 rounded-md bg-red-100 text-red-800">
                    <p>La tarea ha expirado. Ya no se aceptan entregas.</p>
                </Box>
            )}
        </Box>
    );
};

export default DetailTaskStudent;

