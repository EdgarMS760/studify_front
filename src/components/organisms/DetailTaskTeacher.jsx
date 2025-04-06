import React, { useState } from 'react'
import TextCardAtom from '@components/atoms/TextCardAtom'
import SelectAtom from '@components/atoms/SelectAtom'
import CardStudentTask from '../molecules/CardStudentTask';
const DetailTaskTeacher = () => {

    const [selected, setSelected] = useState('');
    const options = [
        { value: "asc", label: 'Mas Recientes primero' },
        { value: "desc", label: 'Mas Antiguos primero' }
    ];
    const handleSelectChange = (event) => {
        setSelected(event.target.value);
    };
    const students = [
        { id: 1, name: "Juan perez perez", status: "notDelivered" },
        { id: 2, name: "Pedro perez perez", status: "delivered" },
        { id: 3, name: "Maria perez perez", status: "reviewed" },
        { id: 4, name: "Jose perez perez", status: "notDelivered" },
    ];

    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const handleSelect = (id) => {
      setSelectedStudentId(id);
    };
    return (
        <>
            <div className='m-3 flex flex-wrap items-center justify-between px-4 py-2 shadow-sm rounded-md border-b gap-y-4'>
                <TextCardAtom text="nombre tarea" className="text-2xl" isHighlighted={true} />
                <SelectAtom
                    items={options}
                    placeholder="Ordenar"
                    value={selected}
                    onChange={handleSelectChange}
                />
            </div>
            <div>
                {students.map((student) => (
                    <CardStudentTask
                        key={student.id}
                        data={student}
                        isSelected={selectedStudentId === student.id}
                        onSelect={() => handleSelect(student.id)}
                    />
                ))}
                componente extra
            </div>
        </>
    );
}

export default DetailTaskTeacher