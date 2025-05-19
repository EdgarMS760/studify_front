import React, { useState } from "react";
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
} from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteGroupStudent } from "@services/studentService";
import { useParams } from "react-router";

export default function RemoveStudentsGroupDialog({ open, onClose, students, onRemove }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const { id } = useParams();
    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedStudent) {

            try {
                await deleteGroupStudent(id, selectedStudent._id);
                onRemove(selectedStudent._id);
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        }
        setConfirmOpen(false);
        setSelectedStudent(null);
    };

    return (
        <>
            {/* Main Dialog */}
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Alumnos del Grupo</DialogTitle>
                <DialogContent>
                    {students.length === 0 ? (
                        <DialogContentText>No hay alumnos en este grupo.</DialogContentText>
                    ) : (
                        <List>
                            {students.map((student) => (
                                <ListItem
                                    key={student._id}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteClick(student)}
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={`${student.numero_lista}. ${student.nombre}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar a{" "}
                        <strong>{selectedStudent?.nombre}</strong> del grupo?
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
            </Dialog>
        </>
    );
}
