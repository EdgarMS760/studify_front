import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    DialogContentText,
    TextField,
} from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteGroupStudent } from "@services/studentService";
import { useParams } from "react-router";
import { useDebounce } from '@libs/hooks/Debounce';
import { getStudent } from "../../services/studentService";
import ButtonAtom from "@components/atoms/ButtonAtom";
export default function AddStudentsGroupDialog({ open, onClose }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { id } = useParams();
    const [students, setStudents] = useState([]);
      const [query, setQuery] = useState('');
      const debouncedQuery = useDebounce(query, 400);
    // const handleConfirmDelete =  async() => {
    //     if (selectedStudent) {

    //          try {
    //                await deleteGroupStudent(id,selectedStudent._id);
    //               onRemove(selectedStudent._id);
    //             } catch (error) {
    //               console.error("Error deleting student:", error);
    //             }
    //     }
    //     setConfirmOpen(false);
    //     setSelectedStudent(null);
    // };

    const fetchStudents = async (query) => {
        try {
            const response = await getStudent(query);
            console.log(response);
            setStudents(response || []);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    }
      useEffect(() => {
        fetchStudents(debouncedQuery);
      }, [debouncedQuery]);
    return (
        <>
            {/* Main Dialog */}
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Agregar Alumno</DialogTitle>
                <DialogContent className="space-y-4">
                    <div className="mt-2">

                        <TextField
                            label="Buscar por nombre o email"
                            fullWidth
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>
                        <div className="space-y-2 mt-4">
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <CardStudent key={student._id} student={student} 
                                    onSelected={(data) => {
                                        console.log(data);
                                    }}
                                    />
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">No se encontraron resultados</span>
                            )}
                        </div>
                </DialogContent>
                <DialogActions>
                    <ButtonAtom onClick={onClose}>Cerrar</ButtonAtom>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog */}
            {/* <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas agregar a {" "}
                        <strong>{selectedStudent?.nombre}</strong> al grupo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
}
