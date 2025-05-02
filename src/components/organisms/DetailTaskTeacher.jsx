import React, { useState } from 'react'
import TextCardAtom from '@components/atoms/TextCardAtom'
import SelectAtom from '@components/atoms/SelectAtom'
import CardStudentTask from '@components/molecules/CardStudentTask';
import { useSnackbar } from '@libs/store/SnackbarContext';
import FilePreview from './FilePreview';
import SliderGrades from '@components/atoms/SliderGrades';
import ButtonAtom from '@components/atoms/ButtonAtom';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, useTheme } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate, useParams } from 'react-router';
import { ROUTES } from '@libs/constants/routes';
import { getDetailTask, updateTask } from '@services/taskService';
import { formatToISOString } from '@libs/helpers/dateUtils';
const DetailTaskTeacher = () => {
    const { showSnackbar } = useSnackbar();
    const [selected, setSelected] = useState('');
    const options = [
        { value: "asc", label: 'Mas Recientes primero' },
        { value: "desc", label: 'Mas Antiguos primero' }
    ];
    const [errors, setErrors] = useState({});


    const students = [
        {
            id: 1, name: "Juan perez perez", status: "notDelivered", fileUrl: '/imageTest.jpg',
            fileType: 'image'
        },
        {
            id: 2, name: "Pedro perez perez", status: "delivered", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
        {
            id: 3, name: "Maria perez perez", status: "reviewed", fileUrl: '/example.pdf',
            fileType: 'pdf'
        },
        {
            id: 4, name: "Jose perez perez", status: "notDelivered", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
        {
            id: 5, name: "Ana perez perez", status: "delivered", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
        {
            id: 6, name: "Luis perez perez", status: "reviewed", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
        {
            id: 7, name: "Laura perez perez", status: "notDelivered", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
        {
            id: 8, name: "Carlos perez perez", status: "delivered", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
        {
            id: 9, name: "Sofia perez perez", status: "reviewed", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
        {
            id: 10, name: "Andres perez perez", status: "notDelivered", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
        },
    ];
    const handleSelectChange = (event) => {
        setSelected(event.target.value);
    };

    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const selectedStudent = students.find((s) => s.id === selectedStudentId);

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState(null);

    const [title, setTitle] = useState("");
    const [titleEdit, setTitleEdit] = useState("");
    const [description, setDescription] = useState("");
    const [valueTask, setValueTask] = useState(0);
    const validateForm = () => {
        const newErrors = {};

        if (!titleEdit.trim()) newErrors.titleEdit = 'El título es obligatorio';
        if (!description.trim()) newErrors.description = 'La descripción es obligatoria';
        if (!valueCalendar) newErrors.valueCalendar = 'La fecha es obligatoria';
        if (!valueTime) newErrors.valueTime = 'La hora es obligatoria';
        if (!valueTask || isNaN(valueTask) || Number(valueTask) <= 0) {
            newErrors.valueTask = 'El valor debe ser un número mayor a 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSelect = (student) => {
        setSelectedStudentId(student.id);
        setSelectedFile(student.fileUrl);
        setFileType(student.fileType);
        console.log('files', student.fileUrl, student.fileType)
    };
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
    };
    const handleEditTask = async () => {
        if (!validateForm()) return;
        const finalTimestamp = formatToISOString(valueCalendar, valueTime);
        console.log("Tarea editada:", { titleEdit, description, valueTask, finalTimestamp });
        const taskData = {
            titulo: titleEdit, descripcion: description,
            fecha_vencimiento: finalTimestamp,
            puntos_totales: valueTask
        }
        const response = await updateTask(taskId, taskData);
        showSnackbar(response.message, "success");
        handleCloseModalEdit();
    };

    const [valueCalendar, setValueCalendar] = useState(dayjs('2022-04-17'));
    const [valueTime, setValueTime] = useState(dayjs('2022-04-17T23:59'));
    const theme = useTheme()
    const bgButtonDarkMode = theme.palette.mode === 'dark' ? '!bg-secondaryHover hover:!bg-black !font-bold' : '!bg-secondary hover:!bg-secondaryHover !font-bold';
    const navigate = useNavigate();
    const { id, taskId } = useParams()
    const returnToTask = () => {
        navigate(ROUTES.GROUP_TASKS(id))
    }

    const fetchDetailTask = async () => {
        try {
            const { titulo, descripcion, fecha_vencimiento, puntos_totales } = await getDetailTask(taskId);
            setTitle(titulo);
            setTitleEdit(titulo);
            setDescription(descripcion);
            setValueCalendar(dayjs(fecha_vencimiento));
            setValueTime(dayjs(fecha_vencimiento));
            setValueTask(puntos_totales);
        } catch (error) {
            console.error("Error fetching task details:", error);
        }
    }


    React.useEffect(() => {
        fetchDetailTask();
    }, []);

    const handleopenModalEdit = () => {
        setOpenModalEdit(true);
        setErrors({});
    }
    return (
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
                <SelectAtom
                    items={options}
                    placeholder="Ordenar"
                    value={selected}
                    onChange={handleSelectChange}
                />
            </Box>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/3">
                    {students.map((student) => (
                        <CardStudentTask
                            key={student.id}
                            data={student}
                            isSelected={selectedStudentId === student.id}
                            onSelect={() => handleSelect(student)}
                        />
                    ))}
                </div>

                <div className="w-full lg:w-1/3 px-4 mt-4 lg:mt-0">

                    {selectedFile && <FilePreview fileUrl={selectedFile} fileType={fileType} />}
                    <TextCardAtom text="Calificacion" className="text-2xl mt-3" isHighlighted={true} />
                    <SliderGrades />
                    <div className='flex justify-center mt-4'>

                        <ButtonAtom
                            onClick={() => alert("Calificado")}
                        >
                            Calificar
                        </ButtonAtom>
                    </div>
                </div>
            </div>
            {/* <FullscreenFileModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                fileUrl={selectedStudent?.file}
            /> */}
            <Dialog open={openModalEdit} onClose={handleCloseModalEdit} fullWidth maxWidth="sm">
                <DialogTitle>Editar Tarea</DialogTitle>

                <DialogContent>
                    <div className='flex flex-col gap-4 mt-2'>

                        <TextField
                            value={titleEdit}
                            onChange={(e) => setTitleEdit(e.target.value)}
                            fullWidth
                            label="Título de la tarea..."
                            variant="outlined"
                            error={!!errors.titleEdit}
                            helperText={errors.titleEdit}
                        />

                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            id="outlined-basic"
                            label="Descripción de la tarea..."
                            multiline
                            rows={4}
                            variant="outlined"
                            error={!!errors.description}
                            helperText={errors.description}
                        />

                        <TextCardAtom text="Fecha de entrega" className="text-lg" />
                        <DatePicker
                            label="Selecciona una fecha"
                            value={valueCalendar}
                            onChange={(newValue) => setValueCalendar(newValue)}
                            slotProps={{
                                textField: {
                                    error: !!errors.valueCalendar,
                                    helperText: errors.valueCalendar,
                                },
                            }}
                        />
                        <TimePicker
                            label="Selecciona una hora"
                            value={valueTime}
                            onChange={(newValue) => setValueTime(newValue)}
                            slotProps={{
                                textField: {
                                    error: !!errors.valueTime,
                                    helperText: errors.valueTime,
                                },
                            }}
                        />
                        <TextCardAtom text="Valor de la tarea" className="text-lg" />
                        <FormControl className='sm:w-[15ch]' variant="outlined">

                            <OutlinedInput
                                value={valueTask}
                                onChange={(e) => setValueTask(e.target.value)}
                                error={!!errors.valueTask}
                                endAdornment={<InputAdornment position="end">Puntos</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{ 'aria-label': 'puntos' }}
                            />
                            {errors.valueTask && (
                                <p className="text-red-500 text-sm mt-1">{errors.valueTask}</p>
                            )}

                        </FormControl>
                    </div>
                </DialogContent>

                <DialogActions>
                    <ButtonAtom onClick={handleEditTask}>Actualizar</ButtonAtom>
                    <ButtonAtom onClick={handleCloseModalEdit} className={bgButtonDarkMode}>Cancelar</ButtonAtom>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DetailTaskTeacher