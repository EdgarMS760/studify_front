import React, { useEffect, useState } from 'react'
import TextCardAtom from '@components/atoms/TextCardAtom'
import SelectAtom from '@components/atoms/SelectAtom'
import CardStudentTask from '@components/molecules/CardStudentTask';
import { useSnackbar } from '@libs/store/SnackbarContext';
import FilePreview from '@components/organisms/FilePreview';
import SliderGrades from '@components/atoms/SliderGrades';
import ButtonAtom from '@components/atoms/ButtonAtom';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, useTheme } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate, useParams } from 'react-router';
import { ROUTES } from '@libs/constants/routes';
import { getDetailTask, updateTask } from '@services/taskService';
import { setGradeToTask } from '@services/taskService';
import { deleteTask } from '@services/taskService';

const DetailTaskTeacher = () => {
    const { showSnackbar } = useSnackbar();
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(false);
    const options = [
        { value: "asc", label: 'Mas Recientes primero' },
        { value: "desc", label: 'Mas Antiguos primero' }
    ];
    const [errors, setErrors] = useState({});
    const [taskEdit, setTaskEdit] = useState({
        titulo: '',
        descripcion: '',
        fecha: dayjs(),
        puntos: 0,
    });
    const [originalTask, setOriginalTask] = useState(null);
const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const handleSelectChange = (event) => {
        setSelected(event.target.value);
    };

    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState(null);

    const [title, setTitle] = useState("");
    const [valueTask, setValueTask] = useState(0);
    const [submissions, setSubmissions] = useState([]);
    const [isGraded, setIsGraded] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!taskEdit.titulo.trim()) newErrors.titulo = 'El título es obligatorio';
        if (!taskEdit.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria';
        if (!taskEdit.puntos || isNaN(taskEdit.puntos) || Number(taskEdit.puntos) <= 0) {
            newErrors.puntos = 'Debe ser un número mayor a 0';
        }

        const now = dayjs();
        if (!taskEdit.fecha) {
            newErrors.fecha = 'La fecha es obligatoria';
        } else if (taskEdit.fecha.isBefore(now, 'day')) {
            newErrors.fecha = 'La fecha no puede ser anterior a hoy';
        }

        if (!taskEdit.fecha) {
            newErrors.time = 'La hora es obligatoria';
        } else if (
            taskEdit.fecha.isSame(now, 'day') &&
            taskEdit.fecha.isBefore(now.add(1, 'hour'))
        ) {
            newErrors.time = 'La hora debe ser al menos 1 hora después de la actual';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSelect = (submission) => {
        setSelectedStudentId(submission.id);
        setSelectedFile(submission.archivo_entregado);
        setFileType(submission.tipo_archivo);
        setValueTask(submission.calificacion || 0);
        setIsGraded(submission.calificacion != null);
    };
    const handleCloseModalEdit = () => {
        if (originalTask) {
            setTaskEdit(originalTask);
        }

        setOpenModalEdit(false);
    };
    const handleEditTask = async () => {
        if (!validateForm()) return;

        const finalTimestamp = taskEdit.fecha.toISOString(); // `taskEdit.fecha` ya es un `dayjs`

        const taskData = {
            titulo: taskEdit.titulo,
            descripcion: taskEdit.descripcion,
            fecha_vencimiento: finalTimestamp,
            puntos_totales: taskEdit.puntos,
            group_id: id,
        };

        try {
            const response = await updateTask(taskId, taskData);
            const updatedTask = response.task;
            setOriginalTask({
                titulo: updatedTask.titulo,
                descripcion: updatedTask.descripcion,
                fecha: dayjs(updatedTask.fecha_vencimiento),
                puntos: updatedTask.puntos_totales,
            });
            setTitle(updatedTask.titulo);
            showSnackbar(response.message, "success");
        } catch (error) {
            console.error("Error al actualizar tarea:", error);
            showSnackbar("Error al actualizar tarea", "error");
        }

    };

    useEffect(() => {
        if (openModalEdit) {
            handleCloseModalEdit();
        }
    }, [originalTask]);

    const theme = useTheme()
    const bgButtonDarkMode = theme.palette.mode === 'dark' ? '!bg-secondaryHover hover:!bg-black !font-bold' : '!bg-secondary hover:!bg-secondaryHover !font-bold';
    const navigate = useNavigate();
    const { id, taskId } = useParams()
    const returnToTask = () => {
        navigate(ROUTES.GROUP_TASKS(id))
    }

    const fetchDetailTask = async () => {
        try {
            setLoading(true);
            const { titulo, descripcion, fecha_vencimiento, puntos_totales, entregas } = await getDetailTask(taskId);

            const task = {
                titulo,
                descripcion,
                fecha: dayjs(fecha_vencimiento),
                puntos: puntos_totales,
            };
            setTaskEdit(task);
            setOriginalTask(task);
            setTitle(titulo);
            setSubmissions(entregas);
        } catch (error) {
            console.error("Error fetching task details:", error);
        }
        finally {
            setLoading(false);
        }
    }
    const handleDeleteTask = async () => {
        try {
            const response = await deleteTask(id, taskId);
            showSnackbar(response.message, "success");
            navigate(ROUTES.GROUP_TASKS(id));
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            showSnackbar("Error al eliminar la tarea", "error");
        }
    }
    const handleSetGrade = async () => {
        if (!valueTask || isNaN(valueTask) || Number(valueTask) <= 0) {
            showSnackbar("La calificación debe ser mayor a 0", "error");
            return;
        }
        const { message, entrega } = await setGradeToTask(taskId, valueTask, selectedStudentId,id);

        showSnackbar(message, "success");

        setSubmissions((prev) =>
            prev.map((item) =>
                item.id === entrega.alumno_id
                    ? { ...item, ...entrega }
                    : item
            )
        );
    };
    

    useEffect(() => {
        fetchDetailTask();
    }, []);

    const handleopenModalEdit = () => {
        setOpenModalEdit(true);
        setErrors({});
    }
    return (
        <>
            {loading ? (<div className='flex justify-center items-center'> <CircularProgress /></div>) : (


                <>
                    <Box sx={[
                        (theme) => ({
                            backgroundColor: "white",
                        }),
                        (theme) =>
                            theme.applyStyles('dark', {
                                backgroundColor: theme.vars.palette.secondary.main,
                            }),
                    ]} className="m-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4">
                        <div className='flex items-center justify-between'>
                            <IconButton onClick={returnToTask} aria-label="editTask" color="primary" size="large">
                                <KeyboardReturnIcon fontSize="inherit" />
                            </IconButton>
                            <TextCardAtom text={title || "sin nombre"} className="text-2xl" isHighlighted={true} />
                            <IconButton onClick={() => handleopenModalEdit()} aria-label="editTask" color="primary" size="large">
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    </Box>

                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-2/3">
                            {Array.isArray(submissions) ? (
                                submissions.map((submission) => (
                                    <CardStudentTask
                                        key={submission.id}
                                        data={submission}
                                        isSelected={selectedStudentId === submission.id}
                                        onSelect={() => handleSelect(submission)}
                                    />
                                ))
                            ) : (
                                <p>No hay entregas disponibles.</p>
                            )}

                        </div>

                        <div className="w-full lg:w-1/3 px-4 mt-4 lg:mt-0">
                            {selectedFile && <> <FilePreview fileUrl={selectedFile} fileType={fileType.toLowerCase()} />

                                <TextCardAtom text="Calificacion" className="text-2xl mt-3" isHighlighted={true} />
                                <SliderGrades onValGrade={setValueTask} grade={valueTask} />
                                <div className='flex justify-center mt-4'>

                                    <ButtonAtom onClick={handleSetGrade}>
                                        {isGraded ? "Actualizar calificación" : "Calificar"}
                                    </ButtonAtom>

                                </div></>}
                        </div>
                    </div>

                    <Dialog open={openModalEdit} onClose={handleCloseModalEdit} fullWidth maxWidth="sm">
                        <DialogTitle>Editar Tarea</DialogTitle>

                        <DialogContent>
                            <div className='flex flex-col gap-4 mt-2'>

                                <TextField
                                    value={taskEdit.titulo}
                                    onChange={(e) => setTaskEdit({ ...taskEdit, titulo: e.target.value })}
                                    fullWidth
                                    label="Título de la tarea..."
                                    variant="outlined"
                                    error={!!errors.titulo}
                                    helperText={errors.titulo}
                                />

                                <TextField
                                    value={taskEdit.descripcion}
                                    onChange={(e) => setTaskEdit({ ...taskEdit, descripcion: e.target.value })}
                                    fullWidth
                                    label="Descripción de la tarea..."
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    error={!!errors.descripcion}
                                    helperText={errors.descripcion}
                                />

                                <TextCardAtom text="Fecha de entrega" className="text-lg" />
                                <DatePicker
                                    label="Selecciona una fecha"
                                    value={taskEdit.fecha}
                                    onChange={(newValue) => setTaskEdit({ ...taskEdit, fecha: newValue })}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.fecha,
                                            helperText: errors.fecha,
                                        },
                                    }}
                                />
                                <TimePicker
                                    label="Selecciona una hora"
                                    value={taskEdit.fecha}
                                    onChange={(newTime) => {
                                        setTaskEdit((prev) => {
                                            if (!newTime) {
                                                return { ...prev, fecha: null };
                                            }

                                            if (prev.fecha) {
                                                return {
                                                    ...prev,
                                                    fecha: prev.fecha.hour(newTime.hour()).minute(newTime.minute())
                                                };
                                            }
                                            return {
                                                ...prev,
                                                fecha: newTime
                                            };
                                        });
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.time,
                                            helperText: errors.time,
                                        },
                                    }}
                                />

                                <TextCardAtom text="Valor de la tarea" className="text-lg" />
                                <FormControl className='sm:w-[15ch]' variant="outlined">

                                    <OutlinedInput
                                        value={taskEdit.puntos}
                                        onChange={(e) => setTaskEdit({ ...taskEdit, puntos: e.target.value })}
                                        error={!!errors.puntos}
                                        endAdornment={<InputAdornment position="end">Puntos</InputAdornment>}
                                    />
                                    {errors.puntos && (
                                        <p className="text-red-500 text-sm mt-1">{errors.puntos}</p>
                                    )}

                                </FormControl>
                            </div>
                        </DialogContent>

                        <DialogActions>
                            <div className="flex justify-between w-full">
                                <div>
                                    <ButtonAtom className='!bg-red-500 hover:!bg-red-800' onClick={() => setConfirmDeleteOpen(true)}>Eliminar</ButtonAtom>
                                </div>
                                <div className='flex gap-2'>
                                    <ButtonAtom className='!bg-primary hover:!bg-primaryHover !font-bold' onClick={handleEditTask}>Actualizar</ButtonAtom>
                                    <ButtonAtom onClick={handleCloseModalEdit} className="!bg-gray-500 hover:!bg-gray-600 !font-bold">Cancelar</ButtonAtom>
                                </div>
                            </div>
                        </DialogActions>
                    </Dialog>
                </>
            )}
            {/* Confirmation Dialog */}
            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar la tarea? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteTask} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DetailTaskTeacher