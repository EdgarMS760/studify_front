import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    styled,
    Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ModalManageGroups = ({
    open,
    onClose,
    onSave,
    initialGroup = { nombre: "", foto: null, descripcion: "" },
    mode = "create",
}) => {
    const [groupData, setGroupData] = useState(initialGroup);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({ nombre: false, foto: false, descripcion: false });

    useEffect(() => {
        setGroupData(initialGroup);
        if (initialGroup.foto) {
            setPreviewImage(initialGroup.foto);
        } else {
            setPreviewImage(null);
        }
    }, [initialGroup]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGroupData({ ...groupData, foto: file });
            setPreviewImage(URL.createObjectURL(file));
            setErrors((prev) => ({ ...prev, foto: false }));
        }
    };

    const handleChangeName = (e) => {
        setGroupData({ ...groupData, nombre: e.target.value });
        setErrors((prev) => ({ ...prev, nombre: false }));
    };

    const handleChangeDescription = (e) => {
        setGroupData({ ...groupData, descripcion: e.target.value });
        setErrors((prev) => ({ ...prev, descripcion: false }));
    };

    const handleSubmit = () => {
        const newErrors = {
            nombre: groupData.nombre.trim() == "",
            descripcion: groupData.descripcion.trim() == "",
            foto: !previewImage && mode !== "edit",
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (hasErrors) return;
        groupData.mode = mode;
        onSave(groupData);
        onClose();
    };
    useEffect(() => {
        if (open) {
            // Resetear errores cuando se abra el modal
            setErrors({});
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{mode === "edit" ? "Editar grupo" : "Crear nuevo grupo"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                {previewImage || mode === "edit" ? (
                    <Box
                        component="img"
                        src={previewImage  || `https://ui-avatars.com/api/?name=${encodeURIComponent(groupData.nombre)}` }
                        alt="Preview"
                        sx={{
                            width: "100%",
                            maxHeight: 200,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: errors.foto ? "2px solid red" : "none",
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            height: 200,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            bgcolor: "grey.100",
                            border: `1px dashed ${errors.foto ? "red" : "grey"}`,
                        }}
                    >
                        <InsertPhotoIcon sx={{ fontSize: 60, color: "grey.500" }} />
                    </Box>
                )}

                <Box className="flex flex-col items-center justify-center">
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<UploadIcon />}
                    >
                        {mode === "edit" ? "Cambiar imagen" : "Subir imagen"}
                        <VisuallyHiddenInput type="file" onChange={handleImageChange} accept="image/*" />
                    </Button>
                    {errors.foto && (
                        <Typography
                            variant="caption"
                            color="error"
                            sx={{ display: "block", mt: 0.5 }}
                        >
                            Debe subir una imagen
                        </Typography>
                    )}
                </Box>

                <TextField
                    label="Nombre del grupo"
                    value={groupData.nombre || ""}
                    onChange={handleChangeName}
                    fullWidth
                    error={errors.nombre}
                    helperText={errors.nombre && "Este campo es obligatorio"}
                />
                <TextField
                    label="Descripción del grupo"
                    value={groupData.descripcion || ""}
                    onChange={handleChangeDescription}
                    fullWidth
                    error={errors.descripcion}
                    helperText={errors.descripcion && "Este campo es obligatorio"}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {mode === "edit" ? "Actualizar" : "Guardar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalManageGroups;
