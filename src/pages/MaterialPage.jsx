import React, { useEffect, useState } from 'react'
import CardMaterial from '@components/molecules/CardMaterial'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Pagination, styled, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ButtonAtom from '@components/atoms/ButtonAtom';
import { useAuth } from '@libs/store/AuthProvider';
import { uploadImageAndGetUrl } from '@libs/helpers/firebaseUtils';
import { useSnackbar } from '@libs/store/SnackbarContext';
import { deleteImage } from '@libs/helpers/firebaseUtils';
import { getMaterials, postMaterial } from '@services/materialService';
import { useParams } from 'react-router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDebounce } from '@libs/hooks/Debounce';
import { getFileType } from '@libs/helpers/filesUtils';
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

  const { user } = useAuth();
  const isTeacher = user?.rol === "maestro";
  const [open, setOpen] = useState(false); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    file: "",
  });
  const { showSnackbar } = useSnackbar();
  const { id } = useParams();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [material, setMaterial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);



  useEffect(() => {
    fetchMaterial(debouncedQuery);
  }, [debouncedQuery]);

  const handleClickOpen = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setFile(null);
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

        const fileType = getFileType(file?.name);
        const response = await postMaterial({
          grupo_id: id,
          titulo: title,
          descripcion: description,
          archivo: fileURL,
          tipo: fileType,
        });

        showSnackbar(response.message, "success");
      } catch (err) {
        console.error("Error al registrar:", err);
        const message = err.response?.data?.error || "Error al registrar. Revisa los campos.";
        showSnackbar(message, "error");

        if (fileRef) {
          await deleteImage(fileRef);
        }

      } finally {
        setOpen(false); 
        fetchMaterial(debouncedQuery); 
      }
    }
  };

  const fetchMaterial = async (toSearch, pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await getMaterials(id, toSearch, pageNumber); // <-- asegúrate que tu getMaterials reciba página
      setMaterial(response.materiales);
      setTotalPages(response.totalPages || 1);
      setPage(response.page || 1);
    } catch (err) {
      console.error("Error al obtener materiales:", err);
      const message = err.response?.data?.error || "Error al obtener materiales.";
      showSnackbar(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    fetchMaterial(debouncedQuery, value);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between m-4 gap-4">
        <TextField
          id="search-task"
          onChange={e => setQuery(e.target.value)}
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
      {loading ? (<div className='flex justify-center'><CircularProgress /></div>) : (

        <>
          {material.length === 0 ? (<div className='flex justify-center'>No hay materiales disponibles.</div>) : (

            <>
              {material.map((item, index) => (
                <div key={index} className="m-3">
                  <CardMaterial data={item} isTeacher={isTeacher} onDelete={() => fetchMaterial(debouncedQuery)}/>
                </div>
              ))}

            </>
          )}

        </>
      )}
      <div className="flex justify-center m-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="primary"
        />
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
              {/* <Typography
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
              >cargar archivo</Typography> */}
              <CloudUploadIcon className="w-6 h-6" sx={{ color: 'white' }} />
              <VisuallyHiddenInput type="file" accept="*" onChange={handleFileChange} />
            </Button>
            {file && (
              <Box className="mt-2 text-sm" 
              sx={[
                (theme) => ({
                  color: "black",
                }),
                (theme) =>
                  theme.applyStyles('dark', {
                    color: 'white' ,
                  }),
              ]}>
                <strong>Archivo seleccionado:</strong> {file.name}
              </Box>
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