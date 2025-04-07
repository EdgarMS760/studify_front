import React, { useState } from 'react'
import TextCardAtom from '@components/atoms/TextCardAtom'
import SelectAtom from '@components/atoms/SelectAtom'
import CardStudentTask from '../molecules/CardStudentTask';
import FullscreenFileModal from './FullscreenFileModal';
import FilePreview from './FilePreview';
import SliderGrades from '../atoms/SliderGrades';
import ButtonAtom from '../atoms/ButtonAtom';
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
            id: 3, name: "Maria perez perez", status: "reviewed", fileUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            fileType: 'video'
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

    const selectedStudent = students.find((s) => s.id === selectedStudentId);

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileType, setFileType] = useState(null);

    const handleSelect = (student) => {
        setSelectedStudentId(student.id);
        setSelectedFile(student.fileUrl);
        setFileType(student.fileType);
        console.log('files', student.fileUrl, student.fileType)
    };

    return (
        <>
            <div className="m-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4">
                <TextCardAtom text="nombre tarea" className="text-2xl" isHighlighted={true} />
                <SelectAtom
                    items={options}
                    placeholder="Ordenar"
                    value={selected}
                    onChange={handleSelectChange}
                />
            </div>

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
        </>
    );
}

export default DetailTaskTeacher