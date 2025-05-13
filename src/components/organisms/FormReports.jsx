import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Select, MenuItem, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import CardTask from '../molecules/CardTask';

const reportes = [
  { id: 1, nombre: 'Asistencia', color: 'bg-green-500', icono: '✅' },
  { id: 2, nombre: 'Tareas y Evaluaciones', color: 'bg-orange-500', icono: '📝' },
  { id: 3, nombre: 'Desempeño', color: 'bg-blue-600', icono: '📈' },
];

const tareas = [
  { id: 1, date: "2025-04-06", name: "Tarea activa 1", points: "10", time: "09:00", expired: false, groupName: "Grupo 1" },
  { id: 2, date: "2025-04-07", name: "Tarea activa 2", points: "10", time: "10:00", expired: false, groupName: "Grupo 2" },
  { id: 3, date: "2025-04-08", name: "Tarea activa 3", points: "10", time: "11:00", expired: false, groupName: "Grupo 3" },
];

const FormReports = () => {
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(null);

  const irATarea = (id) => {
    navigate(`/group/1/tasks/${id}`);
  };

  const abrirDialogReporte = (nombre) => {
    setModalAbierto(nombre);
  };

  const cerrarDialogReporte = () => {
    setModalAbierto(null);
  };

  const dialogProps = {
    Asistencia: {
      titulo: "Asistencia",
      fields: ['Grupo', 'Alumno', 'Fecha Inicio', 'Fecha Fin'],
      headers: ['Fecha', 'Nombre del Alumno', 'Asistencia (Hoy)', 'Porcentaje Asistencia', 'Faltas Justificadas', 'Faltas Injustificadas'],
      columnas: 6,
    },
    'Tareas y Evaluaciones': {
      titulo: "Tareas y Evaluaciones",
      fields: ['Grupo', 'Alumno', 'Fecha de Entrega'],
      headers: ['Fecha de Entrega', 'Nombre del Alumno', 'Estado', 'Porcentaje de tareas entregadas a tiempo', 'Promedio de calificación'],
      columnas: 5,
    },
    Desempeño: {
      titulo: "Desempeño General",
      fields: ['Grupo', 'Fecha Inicio', 'Fecha Fin'],
      headers: ['Fecha', 'Comparación con otros grupos\nDesviación estándar', 'Promedio general del grupo', 'Promedio en Asistencia', 'Promedio en Tareas', 'Evaluaciones Generales'],
      columnas: 6,
    }
  };

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') cerrarDialogReporte();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const theme = useTheme();

  return (
    <Box className={clsx("min-h-screen p-6 relative")}
      sx={[
        (theme) => ({
          backgroundColor: theme.vars.palette.secondary.main,
        }),
        (theme) =>
          theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.secondary.main,
          }),
      ]}
    >
      <h1 className="text-base sm:text-lg font-bold font-mono mb-4 text-center">
        Reportes
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          {reportes.map(({ id, nombre, color, icono }) => (
            <Box
              key={id}
              onClick={() => abrirDialogReporte(nombre)}
              className={clsx("shadow-lg rounded-2xl p-6 flex items-center gap-4 transition-colors duration-200 hover:bg-[#F25019] hover:text-white cursor-pointer")}
              sx={[
                () => ({ backgroundColor: "white" }),
                (theme) =>
                  theme.applyStyles('dark', {
                    backgroundColor: 'black',
                  }),
              ]}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${color}`}>
                {icono}
              </div>
              <span className="font-semibold text-lg">{nombre}</span>
            </Box>
          ))}
        </div>

        <Box className={clsx("lg:col-span-2 shadow-lg rounded-2xl p-6")}
          sx={[
            () => ({ backgroundColor: "white" }),
            (theme) =>
              theme.applyStyles('dark', {
                backgroundColor: 'black',
              }),
          ]}
        >
          <h2 className="text-xl font-semibold mb-4">Últimas Tareas</h2>
          <div className="space-y-4 rounded-xl py-2">
            {tareas.map((item) => (
              <CardTask taskData={item} onClickCard={irATarea} />
            ))}
          </div>
        </Box>
      </div>

      {/* Dialogs */}
      {modalAbierto && (
        <Dialog
          open={!!modalAbierto}
          onClose={cerrarDialogReporte}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            {dialogProps[modalAbierto].titulo}
            <IconButton
              edge="end"
              color="inherit"
              onClick={cerrarDialogReporte}
              aria-label="close"
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {dialogProps[modalAbierto].fields.map((label) => (
                <div key={label}>
                  <label className="block font-semibold mb-1">{label}</label>
                  <Select className="w-full bg-gray-300 px-4 py-2 rounded">
                    <MenuItem>Seleccionar...</MenuItem>
                  </Select>
                </div>
              ))}
            </div>
            <TablaReporte
              headers={dialogProps[modalAbierto].headers}
              columnas={dialogProps[modalAbierto].columnas}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={cerrarDialogReporte} color="primary">Cerrar</Button>
            <Button onClick={() => console.log('Generar reporte')} variant="contained" color="primary">Generar Reporte</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

const TablaReporte = ({ headers, columnas }) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-black text-sm text-center">
      <thead className="bg-gray-300 font-semibold">
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="border border-black px-2 py-1 whitespace-pre-line">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-black px-2 py-1" colSpan={columnas}>
            Sin datos por ahora
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default FormReports;
