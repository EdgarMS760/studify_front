import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    Avatar,
    Snackbar,
    Alert,
} from "@mui/material";
import { useState } from "react";

const FlowLoginGoogleDialog = ({
    open,
    onClose,
    selectedRole,
    setSelectedRole,
    finalUserData,
    onContinue,
}) => {
    const { nombre, email, foto_perfil } = finalUserData || {};
    const [errorOpen, setErrorOpen] = useState(false);

    const handleContinueClick = () => {
        if (!selectedRole) {
            setErrorOpen(true);
            return;
        }
        onContinue(); 
    };

    return (
        <>
            <Dialog open={open} onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
            }} disableEscapeKeyDown>
                <DialogTitle>Selecciona tu rol</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <Box className="flex items-center gap-3">
                        <Avatar src={foto_perfil} alt={nombre} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {nombre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {email}
                            </Typography>
                        </Box>
                    </Box>

                    <FormControl fullWidth>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            label="Rol"
                        >
                            <MenuItem value="alumno">Alumno</MenuItem>
                            <MenuItem value="maestro">Maestro</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" onClick={handleContinueClick}>
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={errorOpen}
                autoHideDuration={3000}
                onClose={() => setErrorOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="warning" onClose={() => setErrorOpen(false)} sx={{ width: '100%' }}>
                    Debes seleccionar un rol para continuar.
                </Alert>
            </Snackbar>
        </>
    );
};

export default FlowLoginGoogleDialog;
