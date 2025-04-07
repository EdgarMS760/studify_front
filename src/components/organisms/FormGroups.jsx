import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardMedia, IconButton,
  ButtonBase, Modal, TextField, Button, Avatar, Menu, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Icono de tres puntos
import { useNavigate } from 'react-router-dom';

const grupos = [
  { id: 1, nombre: 'Español', imagen: '/grupo1.png' },
  { id: 2, nombre: 'Mates', imagen: '/grupo2.png' },
  { id: 3, nombre: 'Inglés', imagen: '/grupo3.png' },
];

const gruposArchivados = [
  { id: 101, nombre: 'Historia', imagen: '/grupo4.png' },
  { id: 102, nombre: 'Ciencias', imagen: '/grupo5.png' }
];

const FormGroups = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [nuevoGrupo, setNuevoGrupo] = useState({ nombre: '', imagen: '' });
  const [imagenPreview, setImagenPreview] = useState(null);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [grupoMenuId, setGrupoMenuId] = useState(null); // Para identificar el grupo seleccionado en el menú
  const [archivadosOpen, setArchivadosOpen] = useState(false);
  const [editarArchivarOpen, setEditarArchivarOpen] = useState(false); // Modal de editar y archivar
  
  const menuOpen = Boolean(menuAnchorEl);

  const handleGrupoClick = (nombre, id) => {
    setGrupoSeleccionado(id);
    setTimeout(() => navigate(`/grupo/${nombre.toLowerCase()}`), 200);
  };

  const handleOpenModal = () => setOpen(true);

  const handleCloseModal = () => {
    setOpen(false);
    setNuevoGrupo({ nombre: '', imagen: '' });
    setImagenPreview(null);
  };

  const handleAgregar = () => {
    if (!nuevoGrupo.nombre.trim()) {
      alert("Por favor, ingresa un nombre para el grupo.");
      return;
    }

    // Aquí podrías guardar el grupo en la base de datos o estado
    handleCloseModal();
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
        setNuevoGrupo({ ...nuevoGrupo, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMenuOpen = (event, grupoId) => {
    setMenuAnchorEl(event.currentTarget);
    setGrupoMenuId(grupoId); // Guardamos el id del grupo para identificarlo en las opciones
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setGrupoMenuId(null);
  };

  const handleEditarArchivarOpen = () => {
    setEditarArchivarOpen(true);
    handleMenuClose();
  };

  const handleEditarArchivarClose = () => {
    setEditarArchivarOpen(false);
  };

  const handleEditar = () => {
    const grupo = grupos.find(grupo => grupo.id === grupoMenuId);
    alert(`Editar el grupo: ${grupo.nombre}`);
    handleEditarArchivarClose();
  };

  const handleArchivar = () => {
    const grupo = grupos.find(grupo => grupo.id === grupoMenuId);
    // Mover el grupo de la lista activa a la lista de grupos archivados
    alert(`Archivar el grupo: ${grupo.nombre}`);
    handleEditarArchivarClose();
  };

  const handleGruposArchivados = () => {
    setArchivadosOpen(true);
    handleMenuClose();
  };

  const handleCloseArchivados = () => {
    setArchivadosOpen(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#e0e0e0', minHeight: '100vh', position: 'relative' }}>
      <Typography variant="h6" sx={{ fontFamily: 'Montserrat', mb: 2 }}>Tus Grupos</Typography>
      <Grid container spacing={2}>
        {grupos.map((grupo) => (
          <Grid item key={grupo.id}>
            <ButtonBase onClick={() => handleGrupoClick(grupo.nombre, grupo.id)}>
              <Card sx={{
                width: 120,
                borderRadius: 2,
                boxShadow: 3,
                opacity: grupoSeleccionado === grupo.id ? 0.6 : 1,
                transition: 'opacity 0.3s ease'
              }}>
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

                {/* Menú desplegable dentro de cada card */}
                <IconButton
                  sx={{ position: 'absolute', top: 50, right: 8 }}
                  onClick={(e) => handleMenuOpen(e, grupo.id)} // Abre el menú de opciones
                >
                  <MoreVertIcon />
                </IconButton>
              </Card>
            </ButtonBase>
          </Grid>
        ))}
        <Grid item>
          <ButtonBase onClick={handleOpenModal}>
            <Card sx={{
              width: 120, height: 150,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed gray', borderRadius: 2
            }}>
              <AddIcon sx={{ fontSize: 40, color: 'gray' }} />
            </Card>
          </ButtonBase>
        </Grid>
      </Grid>

      {/* Modal para nuevo grupo */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box sx={{
            width: 400,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', mb: 2 }}>Agregar Nuevo Grupo</Typography>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat', mb: 2 }}>Imagen de la clase</Typography>
            {imagenPreview && (
              <Box mt={2}>
                <Avatar src={imagenPreview} sx={{ width: 80, height: 80, margin: '0 auto' }} />
              </Box>
            )}
            <Box textAlign="center" mt={2}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-image"
                type="file"
                onChange={handleImagenChange}
              />
              <label htmlFor="upload-image">
                <Button variant="contained" component="span" sx={{ backgroundColor: '#f97316', fontFamily: 'Montserrat' }}>
                  Subir Imagen
                </Button>
              </label>
            </Box>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Montserrat', mt: 3 }}>Nombre de la clase</Typography>
            <TextField
              fullWidth
              label="Nombre del Grupo"
              variant="outlined"
              margin="normal"
              value={nuevoGrupo.nombre}
              onChange={(e) => setNuevoGrupo({ ...nuevoGrupo, nombre: e.target.value })}
              sx={{ fontFamily: 'Montserrat' }}
            />
            <Box textAlign="center">
              <Button variant="contained" color="primary" onClick={handleAgregar} sx={{ mt: 3, fontFamily: 'Montserrat', backgroundColor: '#f97316' }}>
                Agregar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Modal para editar y archivar grupo */}
      <Modal open={editarArchivarOpen} onClose={handleEditarArchivarClose}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box sx={{
            width: 400,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', mb: 2 }}>Editar o Archivar Grupo</Typography>
            <Box textAlign="center">
              <Button variant="contained" color="primary" onClick={handleEditar} sx={{ mt: 2, fontFamily: 'Montserrat', backgroundColor: '#f97316' }}>
                Editar
              </Button>
              <Button variant="contained" color="error" onClick={handleArchivar} sx={{ mt: 2, fontFamily: 'Montserrat', backgroundColor: '#f97316' }}>
                Archivar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Modal de Grupos Archivados */}
      <Modal open={archivadosOpen} onClose={handleCloseArchivados}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box sx={{
            width: 500,
            maxHeight: '80vh',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" sx={{ fontFamily: 'Montserrat', mb: 3, textAlign: 'center' }}>
              Grupos Archivados
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {gruposArchivados.map((grupo) => (
                <Grid item key={grupo.id}>
                  <Card sx={{
                    width: 120,
                    borderRadius: 2,
                    boxShadow: 3,
                  }}>
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

            <Box textAlign="center" mt={3}>
              <Button variant="contained" onClick={handleCloseArchivados} sx={{ backgroundColor: '#f97316', fontFamily: 'Montserrat' }}>
                Cerrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* FAB con menú desplegable */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ backgroundColor: '#f5f5f5', border: '2px solid orange', borderRadius: 2 }}
        >
          <Inventory2OutlinedIcon sx={{ color: 'orange' }} />
        </IconButton>

        <Menu
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MenuItem onClick={handleGruposArchivados}>Grupos Archivados</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default FormGroups;
