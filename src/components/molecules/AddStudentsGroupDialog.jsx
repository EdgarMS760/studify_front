import React, { useEffect, useState, useRef } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, DialogContentText, Button, Skeleton,
    CircularProgress
} from "@mui/material";
import { useDebounce } from '@libs/hooks/Debounce';
import { getStudent } from "@services/studentService";
import ButtonAtom from "@components/atoms/ButtonAtom";
import CardStudent from "@components/molecules/CardStudent";
import { addStudentToGroup } from "../../services/studentService";
import { useParams } from "react-router";

import { useSnackbar } from '@libs/store/SnackbarContext';
export default function AddStudentsGroupDialog({ open, onClose, onSelect }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const scrollContainerRef = useRef(null);
    const { id } = useParams();

    const { showSnackbar } = useSnackbar();
    const limit = 10;

    const fetchStudents = async (query, page) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await getStudent(query, page, limit);
            const newStudents = response.results || [];
            setStudents(prev =>
                page === 1 ? newStudents : [...prev, ...newStudents]
            );
            setHasMore(newStudents.length === limit);
        } catch (error) {
            console.error("Error fetching students:", error.message);
            showSnackbar(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedQuery) {
            setPage(1);
            fetchStudents(debouncedQuery, 1);
        } else {
            setStudents([]);
            setHasMore(false);
        }
    }, [debouncedQuery]);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (
            container &&
            container.scrollTop + container.clientHeight >= container.scrollHeight - 100 &&
            hasMore &&
            !loading
        ) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchStudents(debouncedQuery, nextPage);
        }
    };

    const handleSelectedStudent = (student) => {
        setSelectedStudent(student);
        setConfirmOpen(true);
    };

    const handleConfirmStudent = async () => {
        if (selectedStudent) {
            try {
                await addStudentToGroup(id, selectedStudent);
                onSelect(selectedStudent._id);
                showSnackbar("Alumno agregado al grupo", "success");
            } catch (error) {
                showSnackbar(error, "error");
                console.error("Error adding student:", error);
            }
            setConfirmOpen(false);
            setSelectedStudent(null);
        }
    };

    const renderSkeletons = (count = 5) => (
        Array.from({ length: count }).map((_, i) => (
            <div key={i} className="p-2 border rounded-md shadow-sm">
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="40%" height={16} />
            </div>
        ))
    );

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Agregar Alumno</DialogTitle>
                <DialogContent className="space-y-4">
                    <TextField
                        label="Buscar por nombre o email"
                        fullWidth
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="overflow-y-auto max-h-[300px] space-y-2 mt-4 pr-2"
                    >
                        {loading && page === 1 ? (
                            renderSkeletons(5)
                        ) : students.length > 0 ? (
                            students.map((student) => (
                                <CardStudent
                                    key={student._id}
                                    student={student}
                                    onSelected={handleSelectedStudent}
                                />
                            ))
                        ) : (
                            !loading && (
                                <span className="text-sm text-gray-500">
                                    No se encontraron resultados
                                </span>
                            )
                        )}
                        {loading && page > 1 && (
                            <div className="py-2 text-sm text-blue-500 text-center">
                                <CircularProgress />
                            </div>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <ButtonAtom onClick={onClose}>Cerrar</ButtonAtom>
                </DialogActions>
            </Dialog>

            {/* Confirmación */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirmar agregado</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas agregar a{" "}
                        <strong>{selectedStudent?.nombre}</strong> al grupo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmStudent} color="primary" variant="contained">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
