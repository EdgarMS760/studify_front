import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardMedia, Modal, TextField,
  Button, Avatar, ButtonBase,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const FormGroups = () => {
  const navigate = useNavigate();

  const [grupos, setGrupos] = useState([
    { id: 1, nombre: 'Español', imagen: '/grupo1.png' },
    { id: 2, nombre: 'Mates', imagen: '/grupo2.png' },
    { id: 3, nombre: 'Inglés', imagen: '/grupo3.png' },
  ]);

  const [gruposArchivados, setGruposArchivados] = useState([
    { id: 101, nombre: 'Historia', imagen: '/grupo4.png' },
    { id: 102, nombre: 'Ciencias', imagen: '/grupo5.png' }
  ]);

  const [modalOpciones, setModalOpciones] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  const handleGrupoClick = (grupo) => {
    setGrupoSeleccionado(grupo);
    setModalOpciones(true);
  };

  const handleEntrarGrupo = () => {
    navigate(`/group/${grupoSeleccionado.id}`);
    setModalOpciones(false);
  };

  const handleAbrirEditar = () => {
    setImagenPreview(grupoSeleccionado.imagen);
    setModalEditar(true);
    setModalOpciones(false);
  };

  const handleGuardarEdicion = () => {
    setGrupos(prev => prev.map(g => g.id === grupoSeleccionado.id ? grupoSeleccionado : g));
    setModalEditar(false);
  };

  const handleArchivarGrupo = () => {
    setGrupos(prev => prev.filter(g => g.id !== grupoSeleccionado.id));
    setGruposArchivados(prev => [...prev, grupoSeleccionado]);
    setModalOpciones(false);
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
        setGrupoSeleccionado({ ...grupoSeleccionado, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box className={clsx('p-4 min-h-full'
    )}
      sx={[
        (theme) => ({
          backgroundColor: theme.vars.palette.secondary.main,
        }),
        (theme) =>
          theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.secondary.main,
          }),
      ]}>
      <Typography variant="h6" sx={{ fontFamily: 'Montserrat', mb: 2 }}>Tus Grupos</Typography>
      <Grid container spacing={2}>
        {grupos.map((grupo) => (
          <Grid item key={grupo.id}>
            <ButtonBase onClick={() => handleGrupoClick(grupo)}>
              <Card sx={{ width: 120, borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={grupo.imagen}
                  alt={`Grupo ${grupo.nombre}`}
                  sx={{ height: 100, objectFit: 'cover' }}
                />
                <CardContent sx={{ padding: 1, textAlign: 'center' }}>
                  <Typography variant="body2" fontWeight="bold" fontFamily="Montserrat">
                    GRUPO “{grupo.nombre}”
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>

      {/* Modal Opciones */}
      <Dialog open={modalOpciones} onClose={() => setModalOpciones(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
          <Typography variant="h6">Opciones del Grupo</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', padding: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#f97316', mb: 1 }}
            onClick={handleEntrarGrupo}
          >
            Entrar al Grupo
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 1 }}
            onClick={handleAbrirEditar}
          >
            Editar Grupo
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleArchivarGrupo}
          >
            Archivar Grupo
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpciones(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Editar */}
      <Dialog open={modalEditar} onClose={() => setModalEditar(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
          <Typography variant="subtitle2">Editar Grupo</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', padding: 2 }}>
          {imagenPreview && (
            <Box mb={2}>
              <Avatar src={imagenPreview} sx={{ width: 120, height: 120, mx: 'auto' }} />
            </Box>
          )}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleImagenChange}
          />
          <label htmlFor="upload-image">
            <Button variant="contained" component="span" fullWidth sx={{ backgroundColor: '#f97316', mb: 2 }}>
              Seleccionar imagen
            </Button>
          </label>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Cambiar Nombre"
            value={grupoSeleccionado?.nombre || ''}
            onChange={(e) => setGrupoSeleccionado({ ...grupoSeleccionado, nombre: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleGuardarEdicion}>
            Guardar
          </Button>
          <Button variant="outlined" color="error" onClick={() => setModalEditar(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Grupos Archivados */}
      <Box mt={4}>
        <Typography variant="h6" fontFamily="Montserrat">Grupos Archivados</Typography>
        <Grid container spacing={2} mt={1}>
          {gruposArchivados.map((grupo) => (
            <Grid item key={grupo.id}>
              <Card sx={{ width: 120, borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  image={grupo.imagen}
                  alt={`Grupo ${grupo.nombre}`}
                  sx={{ height: 100, objectFit: 'cover' }}
                />
                <CardContent sx={{ padding: 1, textAlign: 'center' }}>
                  <Typography variant="body2" fontWeight="bold" fontFamily="Montserrat">
                    GRUPO “{grupo.nombre}”
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FormGroups;