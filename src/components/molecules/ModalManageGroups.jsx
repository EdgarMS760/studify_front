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
    initialGroup = { name: "", image: null },
    mode = "create",
}) => {
    const [groupData, setGroupData] = useState(initialGroup);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({ name: false, image: false });

    useEffect(() => {
        setGroupData(initialGroup);
        console.log(initialGroup);
        if (initialGroup.image) {
            setPreviewImage(initialGroup.image);
        } else {
            setPreviewImage(null);
        }
    }, [initialGroup]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGroupData({ ...groupData, image: file });
            setPreviewImage(URL.createObjectURL(file));
            setErrors((prev) => ({ ...prev, image: false }));
        }
    };

    const handleChange = (e) => {
        setGroupData({ ...groupData, name: e.target.value });
        setErrors((prev) => ({ ...prev, name: false }));
    };

    const handleSubmit = () => {
        const newErrors = {
            name: groupData.name.trim() === "",
            image: !previewImage && mode !== "edit",
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (hasErrors) return;

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
                        src={previewImage}
                        alt="Preview"
                        sx={{
                            width: "100%",
                            maxHeight: 200,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: errors.image ? "2px solid red" : "none",
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
                            border: `1px dashed ${errors.image ? "red" : "grey"}`,
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
                    {errors.image && (
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
                    value={groupData.name}
                    onChange={handleChange}
                    fullWidth
                    error={errors.name}
                    helperText={errors.name && "Este campo es obligatorio"}
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
