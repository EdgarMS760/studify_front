import React, { useState } from 'react'
import CardMaterial from '@components/molecules/CardMaterial'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Pagination, styled, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ButtonAtom from '@components/atoms/ButtonAtom';
import { useAuth } from '@libs/store/AuthProvider';
import { uploadImageAndGetUrl } from '@libs/helpers/firebaseUtils';
import { useSnackbar } from '@libs/store/SnackbarContext';
import { deleteImage } from '../libs/helpers/firebaseUtils';
import { postMaterial } from '../services/materialService';
import { useParams } from 'react-router';
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

const MaterialPage = () => {
  const dummy = [
    {
      id: 1,
      name: "Material 1",
      type: "pdf"
    },
    {
      id: 2,
      name: "Material 2",
      type: "video"
    },
    {
      id: 3,
      name: "Material 3",
      type: "audio"
    },
    {
      id: 4,
      name: "Material 4",
      type: "pdf"
    },
    {
      id: 5,
      name: "Material 5",
      type: "video"
    },
    {
      id: 6,
      name: "Material 6",
      type: "audio"
    },
    {
      id: 7,
      name: "Material 7",
      type: "pdf"
    },
    {
      id: 8,
      name: "Material 8",
      type: "video"
    },
    {
      id: 9,
      name: "Material 9",
      type: "audio"
    }
  ]
  const { user } = useAuth();
  const isTeacher = user?.rol === "maestro";
  const [open, setOpen] = useState(false); // Para manejar la apertura del diálogo
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    file: "",
  });
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
    setErrors({
      title: "",
      description: "",
      file: "",
    });
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    let formIsValid = true;
    let newErrors = { title: "", description: "", file: "" };

    // Validación para el título
    if (!title.trim()) {
      newErrors.title = "El título es obligatorio.";
      formIsValid = false;
    } else if (title.length > 100) {
      newErrors.title = "El título no debe exceder los 100 caracteres.";
      formIsValid = false;
    }

    // Validación para la descripción
    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
      formIsValid = false;
    } else if (description.length > 500) {
      newErrors.description = "La descripción no debe exceder los 500 caracteres.";
      formIsValid = false;
    }

    // Validación para el archivo
    if (!file) {
      newErrors.file = "Debes seleccionar un archivo.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      let fileRef;
      try {
        setLoading(true);

        let fileURL = file || null;

        // Subir imagen si es nueva
        if (file && typeof file !== "string") {
          const { url, fileRef: uploadedRef } = await uploadImageAndGetUrl(
            file,
            "materialClass"
          );
          fileURL = url;
          fileRef = uploadedRef;
        }

        const response = await postMaterial({
          grupo_id: id,
          titulo: title,
          descripcion: description,
          archivo: fileURL,
        });

        showSnackbar(response.message, "success");

      } catch (err) {
        console.error("Error al registrar:", err);
        const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
        showSnackbar(message, "error");

        //se elimina la imagen si hubo un error en el post
        if (fileRef) {
          await deleteImage(fileRef);
        }

      } finally {
        setLoading(false);
      }

      console.log({ title, description, file });
      setOpen(false); // Cerrar el diálogo
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between m-4 gap-4">
        <TextField
          id="search-task"
          variant="standard"
          placeholder="Buscar..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 180 }}
        />
        {isTeacher && (
          <div className="flex justify-center sm:justify-end">
            <ButtonAtom onClick={handleClickOpen}>
              Subir Material
            </ButtonAtom>
          </div>
        )}
      </div>

      {dummy.map((item, index) => (
        <div key={index} className="m-3">
          <CardMaterial data={item} isTeacher={isTeacher} />
        </div>
      ))}
      <div className="flex justify-center m-4">

        <Pagination count={10} showFirstButton showLastButton color="primary" />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subir Material</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
          />
          <div className="flex flex-col justify-center items-center mt-4">
            <Button
              component="label"
              variant="contained"
            >
              <Typography
                sx={[
                  (theme) => ({
                    color: "white",
                    fontWeight: "medium",
                  }),
                  (theme) =>
                    theme.applyStyles('dark', {
                      color: theme.vars.palette.secondary.main,
                    }),
                ]}
              >Subir material</Typography>
              <VisuallyHiddenInput type="file" accept="*" onChange={handleFileChange} />
            </Button>
            {file && (
              <div className="mt-2 text-sm text-gray-600">
                <strong>Archivo seleccionado:</strong> {file.name}
              </div>
            )}
            {errors.file && (
              <div className="mt-2 text-sm text-red-600">{errors.file}</div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">Subir</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MaterialPage