import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Box} from '@mui/material';
import clsx from 'clsx';
import CardTask from '@components/molecules/CardTask';
import { getTasks } from '@services/taskService';
import AttendanceReportDialog from '@components/organisms/AttendanceReportDialog';
import PerformanceReportDialog from '@components/organisms/PerformanceReportDialog';
import { ROUTES } from '@libs/constants/routes';
import AssesmentReportDialog from '@components/organisms/AssesmentReportDialog';

const reportes = [
    { id: 1, nombre: 'Asistencia', color: 'bg-green-500', icono: '✅' },
    { id: 2, nombre: 'Tareas y Evaluaciones', color: 'bg-orange-500', icono: '📝' },
    { id: 3, nombre: 'Desempeño', color: 'bg-blue-600', icono: '📈' },
];


const ReportPage = () => {
    const navigate = useNavigate();
    const [modalAbierto, setModalAbierto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const irATarea = (idGroup, idTask) => {
        navigate(ROUTES.TASK_DETAIL(idGroup, idTask));
    };
    const [openAsistenciaDialog, setOpenAsistenciaDialog] = useState(false);
    const [openTareasDialog, setOpenTareasDialog] = useState(false);
    const [openDesempenoDialog, setOpenDesempenoDialog] = useState(false);
    const abrirDialogReporte = (nombre) => {
        if (nombre === "Asistencia") {
            setOpenAsistenciaDialog(true);
        } else if (nombre === "Tareas y Evaluaciones") {
            setOpenTareasDialog(true);
        } else if (nombre === "Desempeño") {
            setOpenDesempenoDialog(true);
        }
    };

    const cerrarDialogReporte = () => {
        setModalAbierto(null);
    };


    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { tasks } = await getTasks(undefined, undefined, undefined, 3);;
            setTasks(tasks);
        } catch (error) {
            console.error("Error al obtener tareas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <Box className={clsx("min-h-screen p-6 relative")}
                sx={[
                    (theme) => ({
                        backgroundColor: theme.vars.palette.secondary.main,
                    }),
                    (theme) =>
                        theme.applyStyles('dark', {
                            backgroundColor: theme.vars.palette.secondary.main,
                        }),
                ]}>
                <h1 className="text-3xl font-bold font-mono mb-10 text-center">Reportes</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="space-y-6">
                        {reportes.map(({ id, nombre, color, icono }) => (
                            <Box
                                key={id}
                                onClick={() => abrirDialogReporte(nombre)}
                                className={clsx(
                                    "shadow-lg rounded-2xl p-6 flex items-center gap-4 transition-colors duration-200 cursor-pointer"
                                )}
                                sx={[
                                    (theme) => ({
                                        backgroundColor: "white",
                                        color: "inherit",
                                        '&:hover': {
                                            backgroundColor: '#F25019',
                                            color: 'white',
                                        },
                                    }),
                                    (theme) =>
                                        theme.applyStyles?.('dark', {
                                            backgroundColor: 'black',
                                        }),
                                ]}
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${color}`}>
                                    {icono}
                                </div>
                                <span className="font-semibold text-lg">{nombre}</span>
                            </Box>
                        ))}
                    </div>

                    <Box className={clsx("lg:col-span-2 shadow-lg rounded-2xl p-6")}
                        sx={[
                            (theme) => ({
                                backgroundColor: "white",
                            }),
                            (theme) =>
                                theme.applyStyles('dark', {
                                    backgroundColor: 'black',
                                }),
                        ]}
                    >
                        <h2 className={"text-xl font-semibold mb-4"}>Últimas Tareas</h2>
                        <div className="space-y-4 rounded-xl py-2">
                            {tasks.map((item) => (
                                <CardTask key={item._id} taskData={item} onClickCard={irATarea} />
                            ))}
                        </div>
                    </Box>
                </div>

            </Box>
            <AttendanceReportDialog
                open={openAsistenciaDialog}
                onClose={() => setOpenAsistenciaDialog(false)}
            />

            <AssesmentReportDialog
                open={openTareasDialog}
                onClose={() => setOpenTareasDialog(false)}
            />
            <PerformanceReportDialog
                open={openDesempenoDialog}
                onClose={() => setOpenDesempenoDialog(false)}
            />

        </>
    );
};


export default ReportPage;
