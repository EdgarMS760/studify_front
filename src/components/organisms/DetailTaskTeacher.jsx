import React, { useState } from 'react'
import TextCardAtom from '@components/atoms/TextCardAtom'
import SelectAtom from '@components/atoms/SelectAtom'
import CardStudentTask from '../molecules/CardStudentTask';
import FullscreenFileModal from './FullscreenFileModal';
import FilePreview from './FilePreview';
import SliderGrades from '../atoms/SliderGrades';
import ButtonAtom from '../atoms/ButtonAtom';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, useTheme } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate, useParams } from 'react-router';
import { ROUTES } from '../../libs/constants/routes';
const DetailTaskTeacher = () => {
    const [selected, setSelected] = useState('');
    const options = [
        { value: "asc", label: 'Mas Recientes primero' },
        { value: "desc", label: 'Mas Antiguos primero' }
    ];


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
    const [description, setDescription] = useState("");

    const handleSelect = (student) => {
        setSelectedStudentId(student.id);
        setSelectedFile(student.fileUrl);
        setFileType(student.fileType);
        console.log('files', student.fileUrl, student.fileType)
    };
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
        setTitle("");
        setDescription("");
    };
    const handleEditTask = () => {
        console.log("Tarea editada:", { title, description });
        handleCloseModalEdit();
    };

    const [valueCalendar, setValueCalendar] = useState(dayjs('2022-04-17'));
    const [valueTime, setValueTime] = useState(dayjs('2022-04-17T23:59'));
    const theme = useTheme()
    const bgButtonDarkMode = theme.palette.mode === 'dark' ? '!bg-secondaryHover hover:!bg-black !font-bold' : '!bg-secondary hover:!bg-secondaryHover !font-bold';
    const navigate = useNavigate();
    const {id} = useParams()
    const returnToTask = () =>{
        navigate(ROUTES.GROUP_TASKS(id))
    }
    return (
        <>
            <Box  sx={[
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
                    <TextCardAtom text="nombre tarea" className="text-2xl" isHighlighted={true} />
                    <IconButton onClick={() => setOpenModalEdit(true)} aria-label="editTask" color="primary" size="large">
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            id="filled-basic"
                            label="Titulo de la tarea..."
                            multiline
                            maxRows={4}
                            variant="outlined"

                        />
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            id="outlined-basic"
                            label="Descripción de la tarea..."
                            multiline
                            rows={4}
                            maxRows={4}
                            variant="outlined"

                        />

                        <TextCardAtom text="Fecha de entrega" className="text-lg" />
                        <DatePicker
                            label="Selecciona una fecha"
                            value={valueCalendar}
                            onChange={(newValue) => setValueCalendar(newValue)}
                        />
                        <TimePicker
                            label="Selecciona una hora"
                            value={valueTime}
                            onChange={(newValue) => setValueTime(newValue)}
                        />
                        <TextCardAtom text="Valor de la tarea" className="text-lg" />
                        <SliderGrades />
                    </div>
                </DialogContent>

                <DialogActions>
                    <ButtonAtom onClick={handleEditTask}>Crear</ButtonAtom>
                    <ButtonAtom onClick={handleCloseModalEdit} className={bgButtonDarkMode}>Cancelar</ButtonAtom>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DetailTaskTeacher